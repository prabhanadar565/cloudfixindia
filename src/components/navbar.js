export function navbar() {
  return `
<header class="header">

    <div class="container">

        <nav class="navbar">

            <!-- Logo -->

            <a href="#home" class="logo">
                Cloud<span>Fix</span> India
            </a>

            <!-- Desktop Menu -->

            <ul class="nav-links">

                <li><a href="#home">Home</a></li>

                <li><a href="#services">Services</a></li>

                <li><a href="#pricing">Pricing</a></li>

                <li><a href="#about">Why Us</a></li>

                <li><a href="#testimonials">Reviews</a></li>

                <li><a href="#contact">Contact</a></li>

            </ul>

            <!-- Right Side -->

            <div class="nav-right">

<div class="navbar-actions">

    <button
        class="theme-toggle"
        id="themeToggle"
        aria-label="Toggle Theme">

        <i class="fa-solid fa-moon"></i>

    </button>

<a
    href="https://wa.me/919987322608?text=Hi%20CloudFix%20India!%20I%20found%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20IT%20services."
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp">

    <i class="fa-brands fa-whatsapp"></i>

    WhatsApp

</a>

</div>

                <button
                    class="menu-toggle"
                    id="menuToggle"
                    aria-label="Open Menu">

                    <i class="fa-solid fa-bars"></i>

                </button>

            </div>

        </nav>

    </div>

</header>

<!-- Overlay -->

<div class="mobile-overlay" id="mobileOverlay"></div>

<!-- Mobile Drawer -->

<aside class="mobile-menu" id="mobileMenu">

<div class="mobile-header">

    <div class="mobile-logo">
        Cloud<span>Fix</span> India
    </div>

    <div class="mobile-header-actions">

        <button
            class="theme-toggle"
            id="mobileThemeToggle"
            aria-label="Toggle Theme">

            <i class="fa-solid fa-moon"></i>

        </button>

        <button
            class="close-menu"
            id="closeMenu">

            <i class="fa-solid fa-xmark"></i>

        </button>

    </div>

</div>

    <ul class="mobile-links">

        <li>
    <a href="#home">
        <i class="fa-solid fa-house"></i>
        Home
    </a>
</li>

<li>
    <a href="#services">
        <i class="fa-solid fa-laptop"></i>
        Services
    </a>
</li>

<li>
    <a href="#pricing">
        <i class="fa-solid fa-tags"></i>
        Pricing
    </a>
</li>

<li>
    <a href="#about">
        <i class="fa-solid fa-shield-halved"></i>
        Why Choose Us
    </a>
</li>

<li>
    <a href="#testimonials">
        <i class="fa-regular fa-message"></i>
        Reviews
    </a>
</li>

<li>
    <a href="#contact">
        <i class="fa-solid fa-phone"></i>
        Contact
    </a>
</li>

    </ul>


<a
    href="https://wa.me/919987322608?text=Hi%20CloudFix%20India!%20I%20found%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20IT%20services."
    target="_blank"
    rel="noopener noreferrer"
    class="mobile-whatsapp">

    <i class="fa-brands fa-whatsapp"></i>

    Book on WhatsApp

</a>

</aside>
`;
}