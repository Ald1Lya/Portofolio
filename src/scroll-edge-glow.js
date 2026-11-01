(() => {
    const body = document.body;
    let updateScheduled = false;

    function updateScrollEdgeGlow() {
        updateScheduled = false;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const scrollProgress = maxScroll === 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / maxScroll));
        const baseOpacity = 0.16;
        const opacityRange = 1 - baseOpacity;

        body.style.setProperty('--top-edge-glow', `${1 - scrollProgress * opacityRange}`);
        body.style.setProperty('--bottom-edge-glow', `${baseOpacity + scrollProgress * opacityRange}`);
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
