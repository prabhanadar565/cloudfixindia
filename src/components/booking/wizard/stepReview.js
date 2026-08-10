import { createBooking } from "../../../firebase/bookings";

import {
    bookingData,
    previousStep,
    nextStep
} from "./bookingWizard";


export function renderReviewStep() {

    return `

<div class="wizard-step review-step">

    <h2>Review Your Booking</h2>

    <p>
        Please check your details before confirming your booking.
    </p>


    <!-- SERVICE -->

    <div class="review-card">

        <div class="review-icon">
            <i class="fa-solid fa-screwdriver-wrench"></i>
        </div>

        <div class="review-content">

            <span class="review-label">
                Service
            </span>

            <strong>
                ${bookingData.service}
            </strong>

        </div>

        <button
            type="button"
            class="review-edit"
            data-review-step="1">

            Edit

        </button>

    </div>


    <!-- CUSTOMER -->

    <div class="review-card">

        <div class="review-icon">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="review-content">

            <span class="review-label">
                Customer
            </span>

            <strong>
                ${bookingData.name}
            </strong>

            <span>
                <i class="fa-solid fa-phone"></i>
                ${bookingData.phone}
            </span>

            ${
                bookingData.email
                    ? `
                    <span>
                        <i class="fa-solid fa-envelope"></i>
                        ${bookingData.email}
                    </span>
                    `
                    : ""
            }

        </div>

        <button
            type="button"
            class="review-edit"
            data-review-step="2">

            Edit

        </button>

    </div>


    <!-- ADDRESS -->

    <div class="review-card">

        <div class="review-icon">
            <i class="fa-solid fa-location-dot"></i>
        </div>

        <div class="review-content">

            <span class="review-label">
                Service Address
            </span>

            <strong>
                ${bookingData.address}
            </strong>

        </div>

        <button
            type="button"
            class="review-edit"
            data-review-step="2">

            Edit

        </button>

    </div>


    <!-- VISIT -->

    <div class="review-card">

        <div class="review-icon">
            <i class="fa-regular fa-calendar"></i>
        </div>

        <div class="review-content">

            <span class="review-label">
                Preferred Visit
            </span>

            <strong>
                ${formatReviewDate(bookingData.date)}
            </strong>

            <span>
                <i class="fa-regular fa-clock"></i>
                ${bookingData.time}
            </span>

        </div>

        <button
            type="button"
            class="review-edit"
            data-review-step="3">

            Edit

        </button>

    </div>


    <!-- PROBLEM -->

    <div class="review-problem">

        <div class="review-problem-header">

            <i class="fa-solid fa-message"></i>

            <span>
                Problem Description
            </span>

        </div>

        <p>
            ${bookingData.problem}
        </p>

    </div>


    <!-- CONFIRMATION NOTICE -->

    <div class="review-notice">

        <i class="fa-solid fa-circle-info"></i>

        <span>
            Please make sure all the information above is correct.
            We'll use these details to coordinate your doorstep service.
        </span>

    </div>


    <!-- BUTTONS -->

    <div class="wizard-buttons">

        <button
            type="button"
            id="reviewBackBtn"
            class="wizard-btn secondary">

            ← Schedule

        </button>


        <button
            type="button"
            id="confirmReviewBtn"
            class="wizard-btn">

            Confirm Booking ✓

        </button>

    </div>

</div>

`;

}


function formatReviewDate(dateString) {

    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

}


/* ===========================
   Back
=========================== */

document.addEventListener("click", async (e) => {

    if (e.target.id !== "confirmReviewBtn") return;


    const button = e.target;


    if (button.disabled) return;


    button.disabled = true;

    button.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Confirming...
    `;


    try {

        const bookingId = await createBooking(bookingData);


        bookingData.bookingId = bookingId;


        nextStep();


    } catch (error) {

        console.error(
            "Booking creation failed:",
            error
        );


        alert(
            "We couldn't submit your booking. Please try again."
        );


        button.disabled = false;

        button.innerHTML = `
            Confirm Booking ✓
        `;

    }

});


/* ===========================
   Confirm
=========================== */

document.addEventListener("click", (e) => {

    if (e.target.id !== "confirmReviewBtn") return;

    nextStep();

});


/* ===========================
   Edit
=========================== */

document.addEventListener("click", (e) => {

    const button = e.target.closest(".review-edit");

    if (!button) return;

    const step = Number(button.dataset.reviewStep);

    if (!step) return;

    const currentStep =
        Number(document.getElementById("bookingWizardBody")
            ?.dataset.currentStep || 4);

});