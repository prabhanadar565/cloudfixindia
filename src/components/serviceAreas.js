export function serviceAreas() {

    const locations = [
        "Andheri",
        "Bandra",
        "Borivali",
        "Chembur",
        "Dadar",
        "Ghatkopar",
        "Kurla",
        "Mulund",
        "Powai",
        "Sion",
        "Thane",
        "Navi Mumbai"
    ];

    return `
<section class="service-areas" id="areas">

    <div class="container">

        <div class="section-title">

            <span class="section-badge">
                SERVICE AREAS
            </span>

            <h2>
                Doorstep IT Support
                <span>Across Mumbai</span>
            </h2>

            <p>
                We provide fast, reliable and professional doorstep computer
                and laptop services across Mumbai, Navi Mumbai and Thane.
            </p>

        </div>

        <div class="areas-grid">

            ${locations.map(location => `
                <div class="area-card">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${location}</span>
                </div>
            `).join("")}

        </div>

    </div>

</section>
`;
}