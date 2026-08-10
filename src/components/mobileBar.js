export function mobileBar() {
    return `
<div class="mobile-bar">

    <a href="tel:+919987322608" class="mobile-call">

        <i class="fa-solid fa-phone"></i>

        <span>Call Now</span>

    </a>

    <a
    href="https://wa.me/919987322608?text=${encodeURIComponent(
        "Hi CloudFix India! I need IT support and would like to know more about your doorstep services."
    )}"
    target="_blank"
    rel="noopener noreferrer"
    class="mobile-wa">

    <i class="fa-brands fa-whatsapp"></i>

    <span>WhatsApp</span>

</a>

</div>
`;
}