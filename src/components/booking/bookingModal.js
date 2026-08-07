import { startBookingWizard } from "./wizard/bookingWizard";

export function openBookingModal() {

    const existingModal = document.getElementById("bookingModal");

    if (existingModal) {

        existingModal.remove();

    }

    const modal = document.createElement("div");

    modal.id = "bookingModal";

    modal.className = "booking-modal";

    modal.innerHTML = `
        <div class="booking-modal-content">

            <button id="closeBookingModal" class="booking-close">
                &times;
            </button>

            <div class="booking-header">

                <h2 id="wizardTitle">Choose Service</h2>

                <div class="progress-bar">

                    <div
                        id="wizardProgress"
                        class="progress-fill">
                    </div>

                </div>

            </div>

            <div id="bookingWizardBody"></div>

        </div>
    `;

    document.body.appendChild(modal);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    startBookingWizard();

    document
        .getElementById("closeBookingModal")
        .addEventListener("click", () => {

            modal.remove();

        });

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            document.body.style.overflow = "";

            modal.remove();

        }

    });

}