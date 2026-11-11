
        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                } else {
                    mobileMenu.style.opacity = '0';
                    mobileMenu.style.transform = 'translateY(-16px)';
                }
            });

            // Fade-in animation on scroll
            const fadeEls = document.querySelectorAll('.fade-in, .team-card');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });

            fadeEls.forEach(el => {
                el.style.animationPlayState = 'paused';
                observer.observe(el);
            });
        });
    