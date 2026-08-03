export function initStats() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.ceil(target / 80);

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    counter.textContent = target;

                    clearInterval(timer);

                } else {

                    counter.textContent = current;

                }

            }, 20);

            obs.unobserve(counter);

        });

    }, {
        threshold: 0.4
    });

    counters.forEach(counter => observer.observe(counter));

}