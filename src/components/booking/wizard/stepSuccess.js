export function renderSuccessStep() {

    return `

    <div class="wizard-step success-step">

        <div style="text-align:center; padding:40px;">

            <div style="font-size:60px;">
                🎉
            </div>

            <h2>Booking Submitted Successfully!</h2>

            <p>
                Thank you for choosing CloudFix India.
            </p>

            <p>
                Our technician will contact you shortly.
            </p>

            <button
                id="closeBookingBtn"
                class="wizard-btn">

                Close

            </button>

        </div>

    </div>

    `;

}

document.addEventListener("click", (e) => {

    if (e.target.id === "closeBookingBtn") {

        const modal = document.getElementById("bookingModal");

        if (modal) {

            modal.remove();

        }

    }

});