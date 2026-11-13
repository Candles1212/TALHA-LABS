# Supabase Authentication setup for Talha Labs

This portal uses Supabase Auth. Talha Labs does not receive, store or hash customer passwords itself. Supabase Auth manages password hashing, verification, reset and authentication sessions.

## 1. Create the Supabase project

An authorized Talha Labs owner/administrator should create a Supabase project in the laboratory's own account and retain control of billing and recovery email. Do not use a personal student's account as the long-term owner of patient/customer data.

## 2. Configure Auth

In Supabase Dashboard:
1. Open Authentication → URL Configuration.
2. Set Site URL to https://talhalabs.vercel.app.
3. Add Redirect URLs: https://talhalabs.vercel.app/account.html and http://localhost:3000/account.html (local testing only).
4. In Authentication → Providers → Email, enable email sign-up and email confirmation.
5. Set the minimum password length to at least 12 characters. Enable leaked-password protection if available on the selected plan.
6. Configure SMTP / sender details before launch so verification and reset messages are reliably delivered. Test both flows.
7. Keep public sign-up enabled only if the laboratory wants anyone to create an account. Otherwise disable public sign-up and use an administrator-controlled invitation process.

## 3. Add the public browser settings

In Project Settings → API (or the project's Connect panel), copy the Project URL and Publishable key / anon public key. Put them in assets/js/supabase-config.js as SUPABASE_URL and SUPABASE_ANON_KEY.

The browser key is designed to be public. Never put the service_role key, database password, SMTP password or any other secret in this file, HTML, GitHub or browser JavaScript. If a secret is ever exposed, rotate it immediately.

## 4. Deploy and test

Commit the configuration after the project URL and public key are added. Then test: sign up with an email you control; confirm the email link returns to /account.html; log in and log out; request a password reset and complete the reset link; try an incorrect password and an unverified email; test on mobile and desktop.

## Password and data handling

- Passwords are managed by Supabase Auth and are never written to Talha Labs HTML, JavaScript, GitHub or a custom password table.
- Do not create a passwords table. Do not store plaintext passwords or reversible encrypted passwords.
- This initial portal stores no patient records, test results, reports, identity documents or payment details.
- Do not add medical-report uploads until the laboratory has approved the privacy policy, legal basis, identity-verification process, staff roles, retention/deletion policy, audit logging, encrypted storage, access controls and incident-response procedure. A qualified administrator should review applicable Pakistan privacy and healthcare obligations before any patient data is processed.
- Supabase Auth handles account authentication, but the laboratory remains responsible for lawful and secure handling of any data it later chooses to collect.

## Current limitation

The code is ready, but authentication will remain disconnected until an authorized project owner creates/configures the Supabase project and adds its public project URL and publishable/anon key to supabase-config.js. No service-role secret is needed for this browser-only sign-in flow.