export function services() {
  return `
<section class="services" id="services">

    <div class="container">

        <div class="section-title">

            <span class="section-badge">
                OUR SERVICES
            </span>

            <h2>
                Everything Your Computer Needs,
                <span>All in One Place.</span>
            </h2>

            <p>
                From Windows installation to custom PC assembly,
                CloudFix India provides professional IT solutions
                at your doorstep across Mumbai.
            </p>

        </div>

        <div class="service-grid">

            ${serviceCard(
                '<i class="fa-brands fa-windows"></i>',
                "Windows Installation",
                [
                    "Fresh Windows Installation",
                    "Driver Installation",
                    "Microsoft Office Setup",
                    "Data Backup Assistance"
                ],
                "₹499",
                "MOST BOOKED"
            )}

            ${serviceCard(
                '<i class="fa-solid fa-screwdriver-wrench"></i>',
                "Laptop Repair",
                [
                    "Hardware Diagnosis",
                    "Keyboard Replacement",
                    "Battery Replacement",
                    "Display Repair"
                ],
                "₹499",
                "POPULAR"
            )}

            ${serviceCard(
                '<i class="fa-brands fa-apple"></i>',
                "MacBook Support",
                [
                    "macOS Installation",
                    "Performance Optimization",
                    "Software Troubleshooting",
                    "System Cleanup"
                ],
                "₹999"
            )}

            ${serviceCard(
                '<i class="fa-solid fa-memory"></i>',
                "SSD & RAM Upgrade",
                [
                    "SSD Upgrade",
                    "RAM Upgrade",
                    "Speed Optimization",
                    "Health Check"
                ],
                "₹299",
                "FAST SERVICE"
            )}

            ${serviceCard(
                '<i class="fa-solid fa-desktop"></i>',
                "Custom PC Assembly",
                [
                    "Gaming PC Assembly",
                    "Office PC Setup",
                    "Workstation Build",
                    "Cable Management"
                ],
                "₹999"
            )}

            ${serviceCard(
                '<i class="fa-solid fa-headset"></i>',
                "Remote Support",
                [
                    "Software Installation",
                    "Printer Support",
                    "Email Configuration",
                    "Quick Troubleshooting"
                ],
                "₹299"
            )}

            ${serviceCard(
                '<i class="fa-solid fa-laptop"></i>',
                "New Laptop Procurement",
                [
                    "Windows Laptops",
                    "Apple MacBooks",
                    "Gaming Laptops",
                    "Business Laptops"
                ],
                "Free Consultation",
                "NEW"
            )}

            ${serviceCard(
                '<i class="fa-solid fa-keyboard"></i>',
                "Accessories",
                [
                    "SSD & RAM",
                    "Keyboards & Mouse",
                    "Routers & Networking",
                    "Original Accessories"
                ],
                "Best Price",
                "HOT"
            )}

        </div>

    </div>

</section>
`;
}

function serviceCard(icon, title, features, price, badge = "") {

    return `

<div class="service-card" data-aos="fade-up">

    ${badge ? `<div class="service-badge">${badge}</div>` : ""}

    <div class="service-icon">
        ${icon}
    </div>

    <h3>${title}</h3>

    <ul class="service-list">

        ${features.map(feature => `<li>${feature}</li>`).join("")}

    </ul>

    <div class="price-label">
        Starting From
    </div>

    <div class="price ${isNaN(price.replace(/[₹,]/g, "")) ? "text-price" : ""}">
        ${price}
    </div>

    <a
        href="https://wa.me/919987322608"
        target="_blank"
        class="book-btn">

        <i class="fa-brands fa-whatsapp"></i>
        Book on WhatsApp

    </a>

</div>

`;

}