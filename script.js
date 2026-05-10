document.addEventListener('DOMContentLoaded', () => {
    // Current Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-panel').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // Sticky Mobile CTA Visibility
    const stickyCta = document.getElementById('stickyCta');
    const heroActions = document.querySelector('.hero-actions');

    const handleScroll = () => {
        if (!stickyCta || !heroActions) return;
        
        const rect = heroActions.getBoundingClientRect();
        if (rect.bottom < 0) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);
});