'use strict';
const $ = (id) => document.getElementById(id);
const statusBox = $('portal-status');

function status(message, kind = 'info') {
  statusBox.textContent = message;
  statusBox.dataset.kind = kind;
}

function sendWhatsApp(lines) {
  const message = lines.filter(Boolean).join('\n');
  const url = 'https://wa.me/923006700196?text=' + encodeURIComponent(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

$('customer-appointment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  sendWhatsApp([
    'TALHA LABS — CUSTOMER APPOINTMENT REQUEST',
    'Name: ' + data.get('name'),
    'Contact: ' + data.get('phone'),
    'Service: ' + data.get('type'),
    'Preferred date: ' + data.get('date'),
    'Preferred time: ' + (data.get('time') || 'Flexible'),
    'Please confirm availability.'
  ]);
  status('WhatsApp opened with your appointment request. Press Send in WhatsApp to contact the laboratory. This is not a confirmed booking.', 'success');
});

$('customer-test-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  sendWhatsApp([
    'TALHA LABS — TEST AVAILABILITY / RATE ENQUIRY',
    'Name: ' + data.get('name'),
    'Contact: ' + data.get('phone'),
    'Test(s): ' + data.get('tests'),
    'Please confirm availability and current rates.'
  ]);
  status('WhatsApp opened with your test enquiry. Press Send there; the laboratory will confirm current rates and availability.', 'success');
});

$('customer-status-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  sendWhatsApp([
    'TALHA LABS — REQUEST FOLLOW-UP',
    'Name: ' + data.get('name'),
    'Reference: ' + (data.get('reference') || 'Not provided'),
    'Contact: ' + data.get('phone'),
    'Please help me check the status of my request.'
  ]);
  status('WhatsApp opened with your follow-up request. Press Send there; the laboratory team must confirm the status.', 'success');
});

$('customer-report-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  sendWhatsApp([
    'TALHA LABS — REPORT REQUEST',
    'Name on receipt: ' + data.get('name'),
    'Contact number: ' + data.get('phone'),
    'Receipt / lab reference: ' + (data.get('reference') || 'Not provided'),
    'I will attach my Talha LABS receipt screenshot in this WhatsApp chat. Please verify it and advise me about my report.'
  ]);
  status('WhatsApp opened with your report request. Attach only your Talha LABS receipt screenshot in WhatsApp and press Send. Staff must verify it before releasing a report.', 'success');
});
