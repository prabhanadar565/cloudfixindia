export function initTheme() {

    const body = document.body;

    const desktopToggle = document.getElementById("themeToggle");
    const mobileToggle = document.getElementById("mobileThemeToggle");
    const heroImage = document.getElementById("heroImage");

    function updateTheme() {

        const isDark = body.classList.contains("dark");

        const icon = isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

        if (desktopToggle) {
            desktopToggle.innerHTML = `<i class="${icon}"></i>`;
        }

        if (mobileToggle) {
            mobileToggle.innerHTML = `<i class="${icon}"></i>`;
        }

        // Change Hero Image
        if (heroImage) {

            heroImage.src = isDark
                ? "/images/hero-dark.png"
                : "/images/hero-light.png";

        }

    }

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
    }

    updateTheme();

    function toggleTheme() {

        body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            body.classList.contains("dark") ? "dark" : "light"
        );

        updateTheme();

    }

    desktopToggle?.addEventListener("click", toggleTheme);
    mobileToggle?.addEventListener("click", toggleTheme);

}