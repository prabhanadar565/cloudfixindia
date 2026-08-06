export function initReviewModal() {

    const openBtn = document.getElementById("openReview");

    const modal = document.getElementById("reviewModal");

    const closeBtn = document.getElementById("closeReview");

    if (!modal) return;

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            modal.classList.add("active");
            initStars();
            document.body.style.overflow="hidden";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

}

function initStars() {

    const stars = document.querySelectorAll(".star");
    const input = document.getElementById("reviewRating");
    const ratingText = document.getElementById("ratingValue");

    if (!stars.length) return;

    let selectedRating = 5;

    function paintStars(value) {

        stars.forEach(star => {

            const starValue = Number(star.dataset.value);

            if (starValue <= value) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }

        });

    }

    paintStars(selectedRating);

    stars.forEach(star => {

        const value = Number(star.dataset.value);

        // Hover Preview
        star.addEventListener("mouseenter", () => {

            paintStars(value);

            ratingText.textContent = `${value} / 5`;

        });

        // Click
        star.addEventListener("click", () => {

            selectedRating = value;

            input.value = value;

            ratingText.textContent = `${value} / 5`;

            paintStars(value);

        });

    });

    // Restore selected value after leaving
    document.querySelector(".star-rating")
        .addEventListener("mouseleave", () => {

            paintStars(selectedRating);

            ratingText.textContent = `${selectedRating} / 5`;

        });

}