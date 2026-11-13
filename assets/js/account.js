import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';
const $ = (id) => document.getElementById(id);
const statusBox = $('auth-status');
const formsBox = $('auth-forms');
const allForms = ['login-form','signup-form','reset-form','new-password-form','signed-in-panel'];
let supabase = null;
function status(message, kind = 'info') { statusBox.textContent = message; statusBox.dataset.kind = kind; }
function showForm(id) { allForms.forEach((key) => { const el = $(key); if (el) el.hidden = key !== id; }); }
function setTab(tab) {
  document.querySelectorAll('[data-auth-tab]').forEach((button) => {
    const active = button.dataset.authTab === tab;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  showForm(tab === 'signup' ? 'signup-form' : 'login-form');
}
function friendlyError(error) {
  const message = String(error && error.message || 'Please try again.');
  if (/invalid login credentials/i.test(message)) return 'Email or password is incorrect.';
  if (/email not confirmed/i.test(message)) return 'Please verify your email using the link we sent you.';
  if (/user already registered/i.test(message)) return 'An account with this email may already exist. Try logging in.';
  if (/password should be at least/i.test(message)) return 'Choose a longer password (at least 12 characters).';
  return message.slice(0, 220);
}
function setBusy(form, busy) {
  const button = form.querySelector('button[type="submit"]');
  if (button) { button.disabled = busy; button.dataset.originalText ||= button.textContent; button.textContent = busy ? 'Please wait…' : button.dataset.originalText; }
}
function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('PASTE_YOUR_') || SUPABASE_ANON_KEY.includes('PASTE_YOUR_')) {
  status('Secure sign-in is not connected yet. The portal is ready, but the Supabase project URL and public anon/publishable key must be configured before accounts can be created.', 'warning');
} else {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: 'implicit' } });
    formsBox.hidden = false;
    status('Secure authentication service connected.', 'success');
    const { data: { session } } = await supabase.auth.getSession();
    if (session) { $('signed-in-email').textContent = session.user.email || 'Signed-in customer'; showForm('signed-in-panel'); status('You are securely signed in.', 'success'); }
    else showForm('login-form');
    supabase.auth.onAuthStateChange((event, sessionNow) => {
      if (event === 'PASSWORD_RECOVERY') { showForm('new-password-form'); status('Choose a new password for your account.'); }
      else if (sessionNow) { $('signed-in-email').textContent = sessionNow.user.email || 'Signed-in customer'; showForm('signed-in-panel'); status('You are securely signed in.', 'success'); }
      else if (event === 'SIGNED_OUT') { showForm('login-form'); status('You have been logged out.', 'success'); }
    });
    document.querySelectorAll('[data-auth-tab]').forEach((button) => button.addEventListener('click', () => setTab(button.dataset.authTab)));
    document.querySelector('[data-show-reset]').addEventListener('click', () => showForm('reset-form'));
    document.querySelector('[data-show-login]').addEventListener('click', () => { setTab('login'); status('Enter your email and password to log in.'); });
    $('signup-form').addEventListener('submit', async (event) => {
      event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
      const email = String(data.get('email') || '').trim().toLowerCase(); const password = String(data.get('password') || ''); const confirm = String(data.get('confirm') || '');
      if (!validEmail(email)) return status('Enter a valid email address.', 'error');
      if (password.length < 12) return status('Use a password with at least 12 characters.', 'error');
      if (password !== confirm) return status('The passwords do not match.', 'error');
      setBusy(form, true); status('Creating your account…');
      try {
        const { data: result, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + '/account.html' } });
        if (error) throw error;
        if (result.session) status('Account created and signed in successfully.', 'success');
        else { status('Account request received. Supabase will send your Talha Labs verification email. The sender may appear as Supabase; check your inbox and spam folder, then verify your address before logging in.', 'success'); form.reset(); setTab('login'); }
      } catch (error) { status(friendlyError(error), 'error'); } finally { setBusy(form, false); }
    });
    $('login-form').addEventListener('submit', async (event) => {
      event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
      const email = String(data.get('email') || '').trim().toLowerCase(); const password = String(data.get('password') || '');
      if (!validEmail(email) || !password) return status('Enter your email and password.', 'error');
      setBusy(form, true); status('Checking your login…');
      try { const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error; }
      catch (error) { status(friendlyError(error), 'error'); } finally { setBusy(form, false); }
    });
    $('reset-form').addEventListener('submit', async (event) => {
      event.preventDefault(); const form = event.currentTarget; const email = String(new FormData(form).get('email') || '').trim().toLowerCase();
      if (!validEmail(email)) return status('Enter a valid email address.', 'error');
      setBusy(form, true); status('Sending password reset email…');
      try { const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/account.html' }); if (error) throw error; status('If an account exists for that email, Supabase has sent a Talha Labs password-reset email. The sender may appear as Supabase; check your inbox and spam folder.', 'success'); }
      catch (error) { status(friendlyError(error), 'error'); } finally { setBusy(form, false); }
    });
    $('new-password-form').addEventListener('submit', async (event) => {
      event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
      const password = String(data.get('password') || ''); const confirm = String(data.get('confirm') || '');
      if (password.length < 12) return status('Use a password with at least 12 characters.', 'error');
      if (password !== confirm) return status('The passwords do not match.', 'error');
      setBusy(form, true); status('Updating your password…');
      try { const { error } = await supabase.auth.updateUser({ password }); if (error) throw error; form.reset(); showForm('signed-in-panel'); status('Your password has been updated.', 'success'); }
      catch (error) { status(friendlyError(error), 'error'); } finally { setBusy(form, false); }
    });
    $('logout-button').addEventListener('click', async () => { const { error } = await supabase.auth.signOut(); if (error) status(friendlyError(error), 'error'); });
    const profileEmail = $('customer-profile-email');
    const syncProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email || 'Not available';
      $('signed-in-email').textContent = email;
      if (profileEmail) profileEmail.textContent = email;
    };
    await syncProfile();
    function sendWhatsApp(lines) {
      const message = lines.filter(Boolean).join('\n');
      const url = 'https://wa.me/923006700196?text=' + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    $('customer-appointment-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      sendWhatsApp(['TALHA LABS — CUSTOMER APPOINTMENT REQUEST','Name: ' + data.get('name'),'Contact: ' + data.get('phone'),'Service: ' + data.get('type'),'Preferred date: ' + data.get('date'),'Preferred time: ' + (data.get('time') || 'Flexible'),'Account email: ' + (profileEmail.textContent || ''),'Please confirm availability.']);
      status('WhatsApp opened with your request. Send the message there to contact the laboratory.', 'success');
    });
    $('customer-test-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      sendWhatsApp(['TALHA LABS — TEST AVAILABILITY / RATE ENQUIRY','Name: ' + data.get('name'),'Contact: ' + data.get('phone'),'Test(s): ' + data.get('tests'),'Account email: ' + (profileEmail.textContent || ''),'Please confirm availability and current rates.']);
      status('WhatsApp opened with your test enquiry. Send the message there to contact the laboratory.', 'success');
    });
    $('customer-status-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      sendWhatsApp(['TALHA LABS — REQUEST FOLLOW-UP','Name: ' + data.get('name'),'Reference: ' + (data.get('reference') || 'Not provided'),'Contact: ' + data.get('phone'),'Account email: ' + (profileEmail.textContent || ''),'Please help me check the status of my request.']);
      status('WhatsApp opened with your follow-up. The laboratory team will need to confirm the status.', 'success');
    });
    $('customer-report-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      sendWhatsApp([
        'TALHA LABS — REPORT REQUEST',
        'Name on receipt: ' + data.get('name'),
        'Contact number: ' + data.get('phone'),
        'Receipt / lab reference: ' + (data.get('reference') || 'Not provided'),
        'Portal account email: ' + (profileEmail.textContent || ''),
        'I will attach my Talha LABS receipt screenshot in this WhatsApp chat. Please verify it and advise me about my report.'
      ]);
      status('WhatsApp opened with your report request. Attach the receipt screenshot in WhatsApp and press Send. The laboratory must verify it before releasing a report.', 'success');
    });
    $('customer-password-reset').addEventListener('click', async () => {
      const email = profileEmail.textContent;
      if (!validEmail(email)) return status('Your account email could not be read. Please sign in again.', 'error');
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/account.html' });
        if (error) throw error;
        status('If your account is eligible, Supabase has sent a secure password reset link to your registered email.', 'success');
      } catch (error) { status(friendlyError(error), 'error'); }
    });
  } catch (error) { status('The authentication client could not start. Check the Supabase project settings and try again.', 'error'); console.error('Talha Labs auth initialization failed:', error); }
}
