
        (function () {
            var GA_ID = 'G-9M13D6TELP';
            if (!GA_ID) return;
            var s = document.createElement('script');
            s.async = true;
            s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
            document.head.appendChild(s);
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { dataLayer.push(arguments); };
            gtag('js', new Date());
            gtag('config', GA_ID);
            document.addEventListener('click', function (e) {
                var a = e.target.closest('a');
                if (!a) return;
                var h = a.getAttribute('href') || '';
                if (h.indexOf('wa.me') > -1) gtag('event', 'whatsapp_click');
                else if (h.indexOf('tel:') === 0) gtag('event', 'phone_click');
            });
        })();
    