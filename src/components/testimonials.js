export function testimonials() {
return `

<section class="testimonials" id="testimonials">

<div class="container">

<div class="section-title">

<span class="section-badge">
CUSTOMER REVIEWS
</span>

<h2>
What Our
<span>Customers Say</span>
</h2>

<p>
Thousands of happy customers trust CloudFix India for fast,
professional and affordable IT services across Mumbai.
</p>

</div>

<div class="swiper testimonialSwiper">

<div class="swiper-wrapper">

${card(
"Rahul Sharma",
"Andheri, Mumbai",
"My laptop suddenly stopped working before an important office presentation. CloudFix India reached my home within two hours and fixed everything professionally. Highly recommended!"
)}

${card(
"Priya Mehta",
"Powai, Mumbai",
"Windows installation and Microsoft Office setup were completed quickly. The technician was polite and explained everything clearly."
)}

${card(
"Amit Patel",
"Navi Mumbai",
"I upgraded my laptop with SSD and RAM. The performance improvement is amazing. Genuine products and reasonable pricing."
)}

${card(
"Neha Joshi",
"Thane",
"My MacBook was overheating badly. CloudFix India cleaned it, replaced the thermal paste and now it's working perfectly."
)}

</div>

<div class="swiper-pagination"></div>

<div class="swiper-button-next"></div>

<div class="swiper-button-prev"></div>

</div>

</div>

</section>

`;
}

function card(name, city, review){

return `

<div class="swiper-slide">

<div class="testimonial-card" data-aos="fade-up">

<div class="stars">

★★★★★

</div>

<p class="review">

"${review}"

</p>

<div class="customer">

<div class="avatar">

${name.charAt(0)}

</div>

<div>

<h4>${name}</h4>

<span>${city}</span>

</div>

</div>

</div>

</div>

`;

}