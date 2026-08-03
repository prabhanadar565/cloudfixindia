export function contact() {
  return `
<section class="contact" id="contact">

    <div class="container">

        <div class="section-title">

            <span class="section-badge">
                CONTACT US
            </span>

            <h2>
                Let's Fix Your
                <span>Computer Today</span>
            </h2>

            <p>
                Need Windows installation, laptop repair or MacBook support?
                Contact CloudFix India today. We provide fast doorstep IT
                services across Mumbai.
            </p>

        </div>

        <div class="contact-grid">

            <!-- LEFT -->

            <div class="contact-info" data-aos="fade-right">

                <div class="info-box">

                    <i class="fa-solid fa-phone"></i>

                    <div>

                        <h3>Call Us</h3>

                        <a href="tel:+918097716336">
                            +91 80977 16336
                        </a>

                    </div>

                </div>

                <div class="info-box">

                    <i class="fa-solid fa-envelope"></i>

                    <div>

                        <h3>Email</h3>

                        <a href="mailto:cloudfixindia@zohomail.in">
                            cloudfixindia@zohomail.in
                        </a>

                    </div>

                </div>

                <div class="info-box">

                    <i class="fa-solid fa-location-dot"></i>

                    <div>

                        <h3>Location</h3>

                        <p>Mumbai, Maharashtra</p>

                    </div>

                </div>

                <div class="info-box">

                    <i class="fa-solid fa-clock"></i>

                    <div>

                        <h3>Working Hours</h3>

                        <p>Monday - Sunday<br>9:00 AM - 9:00 PM</p>

                    </div>

                </div>

            </div>

            <!-- RIGHT -->

            <div class="contact-form" data-aos="fade-left">

                <h3>Request a Callback</h3>

                <form id="contactForm">

                    <input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        required>

                    <input
                        type="tel"
                        id="phone"
                        placeholder="Phone Number"
                        required>

                    <select id="service">

                        <option>Windows Installation</option>

                        <option>Laptop Repair</option>

                        <option>MacBook Support</option>

                        <option>SSD & RAM Upgrade</option>

                        <option>Custom PC Assembly</option>

                    </select>

                    <textarea
                        id="message"
                        rows="5"
                        placeholder="Tell us your problem..."></textarea>

                    <button
                        type="button"
                        id="whatsappSubmit">

                        <i class="fa-brands fa-whatsapp"></i>

                        Send on WhatsApp

                    </button>

                </form>

            </div>

        </div>

        <!-- MAP -->

        <div class="contact-map">

            <iframe
                src="https://www.google.com/maps?q=Mumbai&output=embed"
                loading="lazy"
                allowfullscreen>
            </iframe>

        </div>

    </div>

</section>
`;
}