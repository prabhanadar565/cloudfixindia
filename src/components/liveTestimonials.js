import { getApprovedReviews } from "../firebase/reviews";

function card(review) {
  return `
    <div class="swiper-slide">
      <div class="testimonial-card" data-aos="fade-up">

        <div class="stars">
          ${"★".repeat(review.rating)}
        </div>

        <p class="review">
          "${review.review}"
        </p>

        <div class="customer">
          <div class="avatar">
            ${review.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4>${review.name}</h4>
            <span>${review.service}</span>
          </div>
        </div>

      </div>
    </div>
  `;
}

export async function loadLiveTestimonials() {

  const container = document.getElementById("reviewsContainer");

  if (!container) return;

  try {

    const reviews = await getApprovedReviews();

    if (reviews.length === 0) {

      container.innerHTML = `
      <div class="swiper-slide">
          <div class="testimonial-card">
              <h3>No reviews yet</h3>
              <p>Be the first customer to review CloudFix India.</p>
          </div>
      </div>
      `;

      return;
    }

    container.innerHTML = reviews.map(card).join("");

  } catch (err) {

    console.error(err);

    container.innerHTML = `
      <div class="swiper-slide">
          <div class="testimonial-card">
              <h3>Unable to load reviews.</h3>
          </div>
      </div>
    `;

  }

}