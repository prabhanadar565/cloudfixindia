import { showSuccessModal } from "./successModal";
import { addReview } from "../firebase/reviews";

function initCharacterCounter(){

    const textarea=document.getElementById("reviewText");

    const counter=document.getElementById("reviewCount");

    if(!textarea || !counter) return;

    textarea.addEventListener("input",()=>{

        const length=textarea.value.length;

        counter.textContent=length;

        const wrapper=counter.parentElement;

        wrapper.classList.remove("warning","danger");

        if(length>=400){

            wrapper.classList.add("warning");

        }

        if(length>=500){

            wrapper.classList.remove("warning");

            wrapper.classList.add("danger");

        }

    });

}

export function initReviewForm() {
    initCharacterCounter();

    const form = document.getElementById("reviewForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn = form.querySelector("button[type='submit']");

        submitBtn.disabled = true;

        submitBtn.classList.add("loading");

        submitBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Submitting...</span>
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

await new Promise(resolve => setTimeout(resolve,1000));

submitBtn.disabled = false;

submitBtn.classList.remove("success");

submitBtn.innerHTML="Submit Review";

    });

}