export function initNavbar() {

    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("mobileOverlay");
    const toggle = document.getElementById("menuToggle");
    const close = document.getElementById("closeMenu");

    if (!menu || !overlay || !toggle || !close) return;

    function openMenu() {
        menu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        menu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    toggle.addEventListener("click", openMenu);
    close.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".mobile-links a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });
}