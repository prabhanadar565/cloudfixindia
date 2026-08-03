export function faq() {
  return `
<section class="faq" id="faq">

    <div class="container">

        <div class="section-title">

            <span class="section-badge">
                FAQ
            </span>

            <h2>
                Frequently Asked
                <span>Questions</span>
            </h2>

            <p>
                Everything you need to know before booking your IT service.
            </p>

        </div>

        <div class="faq-container">

            ${faqItem(
                "Do you provide doorstep service?",
                "Yes. We provide same-day doorstep computer and laptop repair services across Mumbai."
            )}

            ${faqItem(
                "How much does Windows installation cost?",
                "Windows installation starts from ₹499. The final price depends on your device and requirements."
            )}

            ${faqItem(
                "Do you repair MacBooks?",
                "Yes. We provide macOS installation, troubleshooting, SSD upgrades and performance optimization for MacBooks."
            )}

            ${faqItem(
                "Do you provide warranty?",
                "Yes. All eligible hardware repairs and installations include a service warranty."
            )}

            ${faqItem(
                "Which areas do you serve?",
                "We provide doorstep IT support across Mumbai, Navi Mumbai and Thane."
            )}

            ${faqItem(
                "How can I book a service?",
                "Simply click the WhatsApp button anywhere on the website or call us directly."
            )}

        </div>

    </div>

</section>
`;
}

function faqItem(question, answer) {
    return `
<div class="faq-item">

    <button class="faq-question">

        <span>${question}</span>

        <i class="fa-solid fa-plus"></i>

    </button>

    <div class="faq-answer">

        <p>${answer}</p>

    </div>

</div>
`;
}