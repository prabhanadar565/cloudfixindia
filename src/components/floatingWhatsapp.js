export function floatingWhatsapp() {

    const message =
    "Hi CloudFix India! I found your website and would like to know more about your IT services.";

    const whatsappUrl =
        `https://wa.me/919987322608?text=${encodeURIComponent(message)}`;

    return `

        <a
            href="${whatsappUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="floating-whatsapp"
            aria-label="Chat with CloudFix India on WhatsApp">

            <i class="fa-brands fa-whatsapp"></i>

        </a>

    `;

}