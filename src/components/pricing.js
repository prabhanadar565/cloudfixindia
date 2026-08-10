export function pricing() {
  return `
<section class="pricing" id="pricing">

    <div class="container">

        <div class="section-title">

            <span class="section-badge">
                AFFORDABLE PRICING
            </span>

            <h2>
                Simple Pricing.
                <span>No Hidden Charges.</span>
            </h2>

            <p>
                Transparent pricing with doorstep service across Mumbai.
                Pay only for what you need.
            </p>

        </div>

        <div class="pricing-grid">

            ${priceCard(
              "Basic",
              "₹499",
              [
                "Windows Installation",
                "Driver Installation",
                "Microsoft Office Setup",
                "Basic Health Check"
              ],
              "",
              true
            )}

            ${priceCard(
              "Standard",
              "₹999",
              [
                "Laptop Repair",
                "MacBook Support",
                "SSD & RAM Upgrade",
                "System Optimization",
                "Free Diagnosis"
              ],
              "Most Popular",
              true
            )}

            ${priceCard(
              "Custom",
              "Call Us",
              [
                "Gaming PC Assembly",
                "Office Workstations",
                "Business Solutions",
                "Networking Setup",
                "Custom Accessories"
              ],
              "",
              false
            )}

        </div>

    </div>

</section>
`;
}

function priceCard(title, price, features, badge, whatsapp) {

    return `
<div class="price-card data-aos="zoom-in" ${badge ? "featured" : ""}">

    ${
      badge
        ? `<span class="price-badge">${badge}</span>`
        : ""
    }

    <h3>${title}</h3>

    <div class="price">${price}</div>

    <ul>

        ${features
          .map(
            item => `
<li>
<i class="fa-solid fa-check"></i>
${item}
</li>`
          )
          .join("")}

    </ul>

    ${
      whatsapp
        ? `
<a
    href="https://wa.me/919987322608?text=${encodeURIComponent(
        `Hi CloudFix India! I’m interested in your ${title} plan priced at ${price}. Could you please provide more details?`
    )}"
    target="_blank"
    rel="noopener noreferrer"
    class="price-btn">

    Book on WhatsApp

</a>
`
        : `
<a
href="tel:+919987322608"
class="price-btn secondary">

Call Now

</a>
`
    }

</div>
`;
}