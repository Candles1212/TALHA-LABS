
    (function () {
        var WA = 'https://wa.me/923006700196';
        var WAL = '<a href="' + WA + '" target="_blank" rel="noopener">WhatsApp par rabta karein</a>';
        var KB = [
            { k: ['dawai', 'dawa ', 'medicine', 'treatment', 'ilaj', 'bimari', 'symptom', 'normal range', 'report theek', 'diagnos', ' dard ', ' pain ', 'bukhar', ' fever '],
              a: 'Main bimari, dawai ya report ke natayej ke baare mein medical salah nahi de sakta. Is ke liye apne doctor se mashwara karein.' },
            { k: ['rate', 'price', 'charges', ' fee ', ' cost ', 'kitne paise', 'qeemat', 'kitna ', 'ریٹ', 'قیمت'],
              a: 'Test ke rate test ke mutabiq hote hain. Rate janne ke liye test ka naam WhatsApp par bhej dein: ' + WAL + '.' },
            { k: ['khali pet', 'fasting', 'empty stomach', 'bhooka'],
              a: 'Kuch tests (jaise blood sugar ya lipid profile) ke liye khali pet aana ho sakta hai. Aap ke test ke liye sahi hidayat janne ke liye ' + WAL + ' ya apne doctor se poochein.' },
            { k: ['home', 'ghar', 'sampling', 'sample collection'],
              a: 'Ji, <b>home sampling</b> available hai: ghar par safe aur hygienic sample collection. Ilaqa aur waqt ke liye ' + WAL + '.' },
            { k: ['report', 'result', 'kitni der', 'delivery', 'رپورٹ'],
              a: 'Reports digital taur par <b>WhatsApp ya email</b> par bhi mil sakti hain. Kisi khaas test ki report kitni der mein milti hai, ye test par depend karta hai, uske liye ' + WAL + '.' },
            { k: ['time', 'timing', 'open', 'close', 'kab ', 'khula', 'khulta', 'hours', 'waqt', 'baje', 'وقت', 'ٹائم'],
              a: 'Talha Labs roz <b>subah 7:00 se raat 9:00 baje</b> tak khula hai (haftay ke saaton din).' },
            { k: ['address', 'location', 'where', 'kahan', 'jagah', 'map', ' pata ', 'direction', 'پتہ', 'ایڈریس'],
              a: 'Hamara address: <b>Hospital Road, Near Telephone Exchange, Sadiqabad</b>.<br><a href="https://maps.app.goo.gl/Wy42WbfJg7LeZgX67" target="_blank" rel="noopener">Google Maps par dekhein</a>' },
            { k: ['phone', 'number', 'call', 'contact', 'whatsapp', 'rabta', 'email', 'mail', 'فون', 'نمبر'],
              a: 'Cell/WhatsApp: <a href="tel:+923006700196">0300-6700196</a><br>Landline: <a href="tel:+92685701210">068-5701210</a><br>Email: <a href="mailto:talhalabs78@gmail.com">talhalabs78@gmail.com</a><br>' + WAL },
            { k: ['appointment', 'booking', 'book ', 'time lena'],
              a: 'Booking aur home sampling ke liye ' + WAL + ' ya <a href="tel:+923006700196">0300-6700196</a> par call karein.' },
            { k: ['doctor', 'pathologist', 'team', 'kab se', 'since', 'founder', 'owner', 'anwar'],
              a: 'Talha Labs <b>2003</b> se khidmat de raha hai. Hamari team mein Dr. Khalid Mehmood (Consultant Pathologist) aur Prof. Dr. M Rafique Cheema (CEO / Consultant Hematologist) shamil hain. <a href="about.html">Team dekhein</a>' },
            { k: ['cbc', 'lft', 'kft', 'liver', 'kidney', 'thyroid', 'hba1c', 'vitamin', 'hormone', 'sugar', 'lipid', 'dengue', 'hepatitis', 'hiv', 'screening', 'pfa'],
              a: 'Ji, ye test hamari services mein shamil hai. Rate aur report ke waqt ke liye ' + WAL + '. <a href="services.html">Poori list dekhein</a>' },
            { k: ['service', 'kon kon', 'kya kya', 'tests', 'list', 'ٹیسٹ'],
              a: 'Hamari services: CBC, Liver aur Kidney function tests, Thyroid profile, Blood sugar aur Lipid profile, HbA1c, Vitamin D, Hormones test, Medical screening (PFA), Home sampling aur Digital reports. <a href="services.html">Poori list dekhein</a>' },
            { k: ['thank', 'shukria', 'shukriya', 'jazak'],
              a: 'Khushi hui madad kar ke. Koi aur sawal ho to poochein.' },
            { k: ['salam', 'hello', ' hi ', ' hey ', 'aoa'],
              a: 'Wa Alaikum Assalam! Aap timing, location, services ya rabta ke baare mein poochh sakte hain.' }
        ];
        var FALLBACK = 'Maaf kijiye, mujhe is sawal ka jawab nahi pata. Neeche diye gaye options dekhein, ya hamari team se baat karein: ' + WAL + '.';
        var CHIPS = [['Timing', 'timing'], ['Location', 'location'], ['Phone / WhatsApp', 'phone'], ['Email', 'email'], ['Services', 'services'], ['Home sampling', 'home sampling'], ['Reports', 'report'], ['Rates', 'rate'], ['Booking', 'booking'], ['Khali pet (fasting)', 'fasting'], ['Doctors / Team', 'doctor'], ['CBC', 'cbc'], ['Thyroid', 'thyroid'], ['Vitamin D', 'vitamin'], ['HbA1c', 'hba1c'], ['Liver / Kidney', 'liver'], ['Blood sugar', 'sugar'], ['Hormones', 'hormone'], ['Dengue / Hepatitis', 'dengue'], ['Medical screening', 'screening'], ['Bimari ki salah', 'dawai']];

        var btn = document.getElementById('tlai-btn'), box = document.getElementById('tlai-box'),
            msgs = document.getElementById('tlai-msgs'), chips = document.getElementById('tlai-chips'),
            started = false;

        function add(content, me) {
            var d = document.createElement('div');
            d.className = 'tlai-m ' + (me ? 'tlai-me' : 'tlai-bot');
            if (me) { d.textContent = content; } else { d.innerHTML = content; }
            msgs.appendChild(d);
            msgs.scrollTop = msgs.scrollHeight;
            return d;
        }
        function answer(text) {
            var t = ' ' + text.toLowerCase().replace(/[.,!?;:()"'\/\\-]/g, ' ') + ' ';
            for (var i = 0; i < KB.length; i++) {
                for (var j = 0; j < KB[i].k.length; j++) {
                    if (t.indexOf(KB[i].k[j]) > -1) return KB[i].a;
                }
            }
            return FALLBACK;
        }
        function ask(text, label) {
            text = (text || '').replace(/^\s+|\s+$/g, '');
            if (!text) return;
            add(label || text, true);
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
                convo.push({ role: 'user', content: text }, { role: 'assistant', content: j.reply });
                convo = convo.slice(-6);
            })
            .catch(function () {
                wait.innerHTML = answer(text); // built-in answers when the AI is not available
            })
            .then(function () {
                clearTimeout(timer);
                busy = false; inp.disabled = false; sendBtn.disabled = false;
                msgs.scrollTop = msgs.scrollHeight;
                inp.focus();
            });
        }
        sendBtn.addEventListener('click', askAI);
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); askAI(); } });
        btn.addEventListener('click', function () { toggle(!box.classList.contains('open')); });
        document.getElementById('tlai-close').addEventListener('click', function () { toggle(false); });
    })();
    