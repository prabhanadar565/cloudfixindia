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

<div class="swiper-wrapper" id="reviewsContainer">

</div>

<div class="swiper-pagination"></div>

<div class="swiper-button-next"></div>

<div class="swiper-button-prev"></div>

</div>

</div>

</section>

<div class="review-action">

    <h3>Enjoyed our service?</h3>

    <p>Share your experience with other customers.</p>

    <button id="openReview" class="review-btn">
        ⭐ Write a Review
    </button>

</div>

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