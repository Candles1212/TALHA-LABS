
    (function () {
        var WA = 'https://wa.me/923006700196';
        var WAL = '<a href="' + WA + '" target="_blank" rel="noopener">WhatsApp par rabta karein</a>';
        var KB = [
            { k: ['price', 'prices', 'rate', 'rates', 'cost', 'charges', 'fee', 'qeemat', 'kitne paise', 'ریٹ', 'قیمت'], a: 'Test rates test ke mutabiq hote hain. Aap Test Rates page dekh sakte hain ya test ka naam WhatsApp par bhej dein: ' + WAL + '.' },
            { k: ['fasting', 'empty stomach', 'khali pet', 'bhooka', 'fast karna'], a: 'Har test ke liye fasting zaroori nahi hoti. Blood sugar ya lipid profile jaise kuch tests mein fasting ki hidayat ho sakti hai. Apne specific test ke liye lab ya doctor se confirm kar lein.' },
            { k: ['home sample', 'home collection', 'home sampling', 'ghar se', 'ghar par', 'sample collect', 'sample lene'], a: 'Ji, home sample collection ke liye rabta kar sakte hain. Aap ka area, available time aur charges team confirm karegi: ' + WAL + '.' },
            { k: ['report', 'result', 'reports', 'results', 'kitni der', 'report time', 'delivery'], a: 'Reports WhatsApp ya email par digital form mein share ki ja sakti hain. Report ka waqt test ke mutabiq hota hai; exact timing ke liye lab se confirm karein: ' + WAL + '.' },
            { k: ['timing', 'opening', 'open', 'close', 'hours', 'kab khulta', 'kitne baje', 'waqt', 'time'], a: 'Talha Labs haftay ke saaton din subah 7:00 AM se raat 9:00 PM tak open hai.' },
            { k: ['address', 'location', 'where', 'kahan', 'map', 'directions', 'pata', 'پتہ', 'کہاں'], a: 'Talha Labs: Hospital Road, Near Telephone Exchange, Sadiqabad, Punjab. <a href="https://maps.app.goo.gl/Wy42WbfJg7LeZgX67" target="_blank" rel="noopener">Google Maps par directions dekhein</a>.' },
            { k: ['phone', 'number', 'call', 'contact', 'whatsapp', 'rabta', 'email', 'mail', 'نمبر', 'فون'], a: 'WhatsApp / Cell: <a href="tel:+923006700196">0300-6700196</a><br>Landline: <a href="tel:+92685701210">068-5701210</a><br>Email: <a href="mailto:talhalabs78@gmail.com">talhalabs78@gmail.com</a>.' },
            { k: ['appointment', 'booking', 'book', 'appointment lena'], a: 'Appointment ya home sampling ke liye WhatsApp par message karein: ' + WAL + ' ya 0300-6700196 par call karein.' },
            { k: ['doctor', 'pathologist', 'team', 'staff', 'founder', 'owner', 'since', 'kab se'], a: 'Talha Labs 2003 se Sadiqabad mein khidmat de raha hai. Team aur lab ke bare mein mazeed maloomat <a href="about.html">About Us</a> page par dekhein.' },
            { k: ['cbc', 'lft', 'kft', 'liver', 'kidney', 'thyroid', 'hba1c', 'vitamin', 'hormone', 'sugar', 'lipid', 'dengue', 'hepatitis', 'hiv', 'serology', 'hematology', 'biochemistry'], a: 'In mein se kai tests Talha Labs ki services mein shamil hain. Departments aur available tests <a href="services.html">Services page</a> par dekhein. Rate aur timing ke liye ' + WAL + '.' },
            { k: ['service', 'services', 'tests', 'test list', 'what tests', 'kya test', 'kon se test', 'list', 'ٹیسٹ'], a: 'Talha Labs mein Hematology, Biochemistry, Serology, thyroid aur hormone tests, Vitamin D, HbA1c, blood sugar, lipid profile aur home sampling jaisi services hain. <a href="services.html">Complete services list dekhein</a>.' },
            { k: ['career', 'job', 'vacancy', 'work with'], a: 'Careers aur job enquiries ke liye <a href="health-tips.html#careers">Careers section</a> dekhein ya lab se rabta karein: ' + WAL + '.' },
            { k: ['thank', 'thanks', 'shukria', 'shukriya', 'jazak'], a: 'You’re welcome! Talha Labs ke bare mein koi aur maloomat chahiye ho to pooch sakte hain.' },
            { k: ['salam', 'assalam', 'hello', 'hi', 'hey', 'aoa'], a: 'Wa Alaikum Assalam! Main Talha Labs ki services, test rates, timings, location, reports aur home sampling ke bare mein help kar sakta hoon. Aap kya maloomat chahte hain?' }
        ];
        var FALLBACK = 'Main Talha Labs ki services, test rates, timings, location, reports aur home sampling ke bare mein maloomat de sakta hoon. Aap in mein se kis cheez ke bare mein poochna chahte hain? Mazeed help ke liye ' + WAL + '.';
        var CHIPS = [['Test rates', 'rate'], ['Services', 'services'], ['Reports', 'report'], ['Fasting info', 'fasting'], ['Contact', 'phone'], ['Doctors', 'doctor']];

        var btn = document.getElementById('tlai-btn'), box = document.getElementById('tlai-box'),
            msgs = document.getElementById('tlai-msgs'), chips = document.getElementById('tlai-chips'),
            welcome = document.getElementById('tlai-welcome'), started = false;

        function add(content, me) {
            var d = document.createElement('div');
            d.className = 'tlai-m ' + (me ? 'tlai-me' : 'tlai-bot');
            if (me) { d.textContent = content; } else { d.innerHTML = content; }
            msgs.appendChild(d);
            msgs.scrollTop = msgs.scrollHeight;
            return d;
        }
        function answer(text) {
            var t = ' ' + String(text || '').toLowerCase()
                .replace(/[.,!?;:()"'\\/\\\\-]/g, ' ')
                .replace(/\s+/g, ' ') + ' ';
            // Prefer the most specific match; this prevents broad words from hijacking a question.
            var best = null, bestScore = 0;
            for (var i = 0; i < KB.length; i++) {
                var score = 0;
                for (var j = 0; j < KB[i].k.length; j++) {
                    var key = KB[i].k[j].toLowerCase();
                    if (t.indexOf(' ' + key + ' ') > -1 || t.indexOf(key) > -1) {
                        score += Math.max(1, key.length);
                    }
                }
                if (score > bestScore) { bestScore = score; best = KB[i].a; }
            }
            return best || FALLBACK;
        }
        function ask(text, label) {
            text = (text || '').replace(/^\s+|\s+$/g, '');
            if (!text) return;
            add(label || text, true);
            if (welcome) welcome.hidden = true;
            if (window.gtag) { gtag('event', 'tl_ai_question', { topic: text }); }
            setTimeout(function () { add(answer(text), false); }, 350);
        }
        function toggle(open) {
            box.classList.toggle('open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (open && !started) {
                started = true;
                add('Assalam o Alaikum! Main <b>TL AI</b> hoon, Talha Labs ka AI assistant. Aap neeche apna sawal likh sakte hain ya options chun sakte hain. Main timing, location, services aur rabta ki maloomat de sakta hoon. Main bimari, dawai ya report ke natayej ke baare mein medical salah nahi de sakta.', false);
                CHIPS.forEach(function (c) {
                    var b = document.createElement('button');
                    b.type = 'button'; b.textContent = c[0];
                    b.addEventListener('click', function () { ask(c[1], c[0]); });
                    chips.appendChild(b);
                });
                if (window.gtag) { gtag('event', 'tl_ai_open'); }
            }
        }
        var inp = document.getElementById('tlai-in'), sendBtn = document.getElementById('tlai-send');
        var convo = [], busy = false, asked = 0, MAX_Q = 15;
        function askAI() {
            var text = (inp.value || '').replace(/^\s+|\s+$/g, '');
            if (!text || busy) { return; }
            inp.value = '';
            if (asked >= MAX_Q) {
                add('Aap ne kaafi sawal poochh liye hain. Mazeed madad ke liye hamari team se rabta karein: ' + WAL + '.', false);
                return;
            }
            asked++;
            add(text, true);
            if (welcome) welcome.hidden = true;
            busy = true; inp.disabled = true; sendBtn.disabled = true;
            var wait = add('...', false);
            if (window.gtag) { gtag('event', 'tl_ai_typed_question'); }
            var ctrl = ('AbortController' in window) ? new AbortController() : null;
            var timer = setTimeout(function () { if (ctrl) { ctrl.abort(); } }, 9500);
            fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: convo.concat([{ role: 'user', content: text }]).slice(-6) }),
                signal: ctrl ? ctrl.signal : undefined
            })
            .then(function (r) { if (!r.ok) { throw new Error('ai'); } return r.json(); })
            .then(function (j) {
                if (!j || !j.reply) { throw new Error('ai'); }
                wait.className = 'tlai-m tlai-bot tlai-ai';
                wait.textContent = j.reply;
                addCopyButton(wait, j.reply);
                convo.push({ role: 'user', content: text }, { role: 'assistant', content: j.reply });
                convo = convo.slice(-6);
            })
            .catch(function () {
                var fallback = answer(text);
                wait.innerHTML = fallback; // built-in answers when the AI is not available
                addCopyButton(wait, wait.textContent || fallback.replace(/<[^>]*>/g, ' '));
            })
            .then(function () {
                clearTimeout(timer);
                busy = false; inp.disabled = false; sendBtn.disabled = false;
                msgs.scrollTop = msgs.scrollHeight;
                inp.focus();
            });
        }
        function addCopyButton(node, value) {
            var copy = document.createElement('button');
            copy.type = 'button'; copy.className = 'tlai-copy'; copy.textContent = 'Copy answer';
            copy.addEventListener('click', function () {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(value).then(function () { copy.textContent = 'Copied'; }).catch(function () { copy.textContent = 'Copy unavailable'; });
                } else { copy.textContent = 'Copy unavailable'; }
            });
            node.appendChild(copy);
        }
        sendBtn.addEventListener('click', askAI);
        var form = document.getElementById('tlai-form');
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); askAI(); });
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); askAI(); } });
        Array.prototype.forEach.call(document.querySelectorAll('[data-tlai-starter]'), function (starter) {
            starter.addEventListener('click', function () { inp.value = starter.getAttribute('data-tlai-starter'); askAI(); });
        });
        var clearBtn = document.getElementById('tlai-clear');
        if (clearBtn) clearBtn.addEventListener('click', function () {
            convo = []; asked = 0; msgs.innerHTML = ''; chips.innerHTML = ''; started = false;
            if (welcome) welcome.hidden = false;
            toggle(false); toggle(true);
        });
        btn.addEventListener('click', function () { toggle(!box.classList.contains('open')); });
        document.getElementById('tlai-close').addEventListener('click', function () { toggle(false); });
    })();
    