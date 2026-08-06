import { showSuccessModal } from "./successModal";
import { addReview } from "../firebase/reviews";

export function initReviewForm() {

    const form = document.getElementById("reviewForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        console.log("Submit button clicked");

        e.preventDefault();

        const submitBtn = form.querySelector("button[type='submit']");

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Submitting...
        `;

        try {

            await addReview({

                name: document.getElementById("reviewName").value.trim(),

                city: document.getElementById("reviewCity").value.trim(),

                service: document.getElementById("reviewService").value,

                rating: Number(document.getElementById("reviewRating").value),

                review: document.getElementById("reviewText").value.trim()

            });

                form.reset();

                document.getElementById("reviewRating").value = 5;

                document
                .querySelectorAll(".star")
                .forEach(star=>{

                    star.classList.add("active");

                });

                document.getElementById("ratingValue").textContent="5 / 5";

            showSuccessModal();

            const modal = document.getElementById("reviewModal");

            if (modal) {
                modal.classList.remove("active");
            }

            document.body.style.overflow = "";

        } catch (err) {

            console.error(err);

            alert("Something went wrong. Please try again.");

        }

        submitBtn.disabled = false;

        submitBtn.innerHTML = "Submit Review";

    });

}