export function initTheme() {

    const body = document.body;

    const desktopToggle = document.getElementById("themeToggle");
    const mobileToggle = document.getElementById("mobileThemeToggle");

    function updateIcons() {

        const icon = body.classList.contains("dark")
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

        if (desktopToggle) {
            desktopToggle.innerHTML = `<i class="${icon}"></i>`;
        }

        if (mobileToggle) {
            mobileToggle.innerHTML = `<i class="${icon}"></i>`;
        }
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
    }

    updateIcons();

    function toggleTheme() {

        body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            body.classList.contains("dark") ? "dark" : "light"
        );

        updateIcons();
    }

    desktopToggle?.addEventListener("click", toggleTheme);
    mobileToggle?.addEventListener("click", toggleTheme);

}