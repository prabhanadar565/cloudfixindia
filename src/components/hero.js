export function hero() {
  return `
<section class="hero" id="home">

    <div class="container hero-grid">

        <!-- LEFT SIDE -->

        <div class="hero-left" data-aos="fade-right">

            <span class="hero-badge">
                🚀 Same Day Doorstep IT Service Across Mumbai
            </span>

            <h1>
                We Fix.<br>
                <span>You Relax.</span>
            </h1>

            <p>
                Professional IT support for homes and businesses.
                Windows installation, laptop repair, MacBook support,
                PC assembly and genuine accessories delivered right to your doorstep.
            </p>

            <div class="hero-features">

                <div>✔ Windows Installation</div>

                <div>✔ Laptop & Desktop Repair</div>

                <div>✔ MacBook Support</div>

                <div>✔ SSD & RAM Upgrade</div>

                <div>✔ Custom PC Assembly</div>

                <div>✔ Genuine Accessories</div>

            </div>

            <div class="hero-buttons">

    <button
        id="bookServiceBtn"
        class="btn-primary">

        <i class="fa-solid fa-calendar-check"></i>
        Book Service

    </button>

        <a
            href="https://wa.me/919987322608?text=${encodeURIComponent(
                "Hi CloudFix India! I found your website and would like to book an IT service. Could you please assist me?"
            )}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary">

            <i class="fa-brands fa-whatsapp"></i>
            Book on WhatsApp

        </a>

</div>
            <div class="hero-highlights">

                <span>🛡 Genuine Products</span>

                <span>🚚 Doorstep Service</span>

                <span>💳 Cash on Delivery</span>

                <span>⭐ Service Warranty</span>

            </div>

        </div>

        <!-- RIGHT SIDE -->

        <div class="hero-right" data-aos="fade-left">

            <img
            id="heroImage"
            src="/images/hero-light.png"
            alt="CloudFix India Hero Image"
            class="hero-image">

        </div>

    </div>

</section>
`;
}