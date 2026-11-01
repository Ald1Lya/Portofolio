(() => {
    const body = document.body;
    let updateScheduled = false;

    function updateScrollEdgeGlow() {
        updateScheduled = false;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;

        body.classList.toggle('scroll-edge-at-top', scrollPosition <= 2);
        body.classList.toggle('scroll-edge-at-bottom', maxScroll > 2 && scrollPosition >= maxScroll - 2);
    }

    function scheduleUpdate() {
        if (updateScheduled) return;
        updateScheduled = true;
        window.requestAnimationFrame(updateScrollEdgeGlow);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);

    if ('ResizeObserver' in window) {
        new ResizeObserver(scheduleUpdate).observe(document.documentElement);
    }

    updateScrollEdgeGlow();
})();
