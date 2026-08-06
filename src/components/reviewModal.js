export function reviewModal() {
  return `
<div class="review-modal" id="reviewModal">

    <div class="review-box">

        <button class="close-review" id="closeReview">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2>⭐ Write a Review</h2>

        <form id="reviewForm">

            <div class="rating-container">

    <label>Your Rating <span>*</span></label>

    <div class="star-rating">

        <i class="fa-solid fa-star star active" data-value="1"></i>

        <i class="fa-solid fa-star star active" data-value="2"></i>

        <i class="fa-solid fa-star star active" data-value="3"></i>

        <i class="fa-solid fa-star star active" data-value="4"></i>

        <i class="fa-solid fa-star star active" data-value="5"></i>

        <span id="ratingValue">5 / 5</span>

    </div>

    <input
        type="hidden"
        id="reviewRating"
        value="5"
    >

</div>

            <input
                type="text"
                id="reviewName"
                placeholder="Your Name"
                required
            >

            <input
                type="text"
                id="reviewCity"
                placeholder="City"
                required
            >

            <select id="reviewService">

                <option>Laptop Repair</option>

                <option>Desktop Repair</option>

                <option>Windows Installation</option>

                <option>MacBook Repair</option>

                <option>SSD Upgrade</option>

                <option>RAM Upgrade</option>

                <option>Custom PC Build</option>

            </select>

            <textarea
            id="reviewText"
            maxlength="500"
            placeholder="Write your experience..."></textarea>

            <div class="character-counter">

                <span id="reviewCount">0</span>/500

            </div>

            <button
                type="submit"
                class="submit-review"
            >
                Submit Review
            </button>

        </form>

    </div>

</div>
`;
}