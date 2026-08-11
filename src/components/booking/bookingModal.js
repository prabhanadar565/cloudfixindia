import {
    startBookingWizard
} from "./wizard/bookingWizard";

import {
    getBookingAvailability
}from "../../firebase/settingsService"; 


// ==========================================
// OPEN BOOKING MODAL
// ==========================================

export async function
openBookingModal() {

    // --------------------------------------
    // CHECK BOOKING AVAILABILITY
    // --------------------------------------

    const acceptingBookings =
        await getBookingAvailability();


    // --------------------------------------
    // BOOKINGS DISABLED
    // --------------------------------------

    if (!acceptingBookings) {

        showBookingUnavailable();

        return;

    }


    // --------------------------------------
    // REMOVE EXISTING MODAL
    // --------------------------------------

    const existingModal =
        document.getElementById(
            "bookingModal"
        );


    if (existingModal) {

        existingModal.remove();

    }


    // --------------------------------------
    // CREATE MODAL
    // --------------------------------------

    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "bookingModal";


    modal.className =
        "booking-modal";


    modal.innerHTML = `

        <div class="booking-modal-content">

            <button
                id="closeBookingModal"
                class="booking-close"
                type="button"
            >
                &times;
            </button>


            <div class="booking-header">

                <h2 id="wizardTitle">
                    Choose Service
                </h2>


                <div class="progress-bar">

                    <div
                        id="wizardProgress"
                        class="progress-fill"
                    ></div>

                </div>

            </div>


            <div
                id="bookingWizardBody"
            ></div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // --------------------------------------
    // START WIZARD
    // --------------------------------------

    startBookingWizard();


    // --------------------------------------
    // CLOSE BUTTON
    // --------------------------------------

    document
        .getElementById(
            "closeBookingModal"
        )
        ?.addEventListener(
            "click",
            () => {

                modal.remove();

            }
        );


    // --------------------------------------
    // CLICK OUTSIDE MODAL
    // --------------------------------------

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}


// ==========================================
// BOOKING UNAVAILABLE MESSAGE
// ==========================================

function showBookingUnavailable() {

    const existingModal =
        document.getElementById(
            "bookingModalUnavailable"
        );


    if (existingModal) {

        existingModal.remove();

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "bookingModalUnavailable";


    modal.className =
        "booking-modal";


    modal.innerHTML = `

        <div
            class="
                booking-modal-content
                booking-unavailable-modal
            "
        >

            <button
                id="closeBookingUnavailable"
                class="booking-close"
                type="button"
            >
                &times;
            </button>


            <div class="booking-unavailable-icon">

                <i class="fa-solid fa-calendar-xmark"></i>

            </div>


            <h2>
                Bookings Temporarily Unavailable
            </h2>


            <p>
                We are currently not accepting
                new service bookings.
            </p>


            <p>
                Please contact CloudFix India
                for assistance.
            </p>


            <button
                id="closeBookingUnavailableButton"
                class="wizard-btn"
                type="button"
            >
                <i class="fa-solid fa-arrow-left"></i>

                Go Back

            </button>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const closeModal =
        () => {

            modal.remove();

        };


    document
        .getElementById(
            "closeBookingUnavailable"
        )
        ?.addEventListener(
            "click",
            closeModal
        );


    document
        .getElementById(
            "closeBookingUnavailableButton"
        )
        ?.addEventListener(
            "click",
            closeModal
        );


    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}