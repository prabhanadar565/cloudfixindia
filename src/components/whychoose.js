export function whychoose() {
  return `
<section class="whychoose" id="about">

    <div class="container">

        <div class="section-title">

            <span class="section-badge">
                WHY CHOOSE US
            </span>

            <h2>
                Why Thousands Trust
                <span>CloudFix India</span>
            </h2>

            <p>
                We provide reliable, affordable and professional IT services
                with genuine products and expert technicians across Mumbai.
            </p>

        </div>

        <div class="why-grid">

            ${card(
                "fa-user-check",
                "Certified Technicians",
                "Experienced professionals trained to diagnose and repair laptops, desktops and MacBooks."
            )}

            ${card(
                "fa-truck-fast",
                "Doorstep Service",
                "Fast doorstep IT support across Mumbai. We come to your home or office."
            )}

            ${card(
                "fa-shield-halved",
                "Genuine Products",
                "Only genuine parts and branded accessories for long-lasting performance."
            )}

            ${card(
                "fa-bolt",
                "Same Day Service",
                "Most repairs and Windows installations are completed on the same day."
            )}

            ${card(
                "fa-comments",
                "Instant WhatsApp Support",
                "Book appointments and get quick support directly through WhatsApp."
            )}

            ${card(
                "fa-indian-rupee-sign",
                "Affordable Pricing",
                "Transparent pricing with no hidden charges and free consultation."
            )}

        </div>

    </div>

</section>
`;
}

function card(icon,title,text){

return`

<div class="why-card" data-aos="fade-up">

    <div class="why-icon">

        <i class="fa-solid ${icon}"></i>

    </div>

    <h3>${title}</h3>

    <p>${text}</p>

</div>

`;

}