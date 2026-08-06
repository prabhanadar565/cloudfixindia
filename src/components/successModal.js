export function showSuccessModal() {

    const modal = document.createElement("div");

    modal.className = "success-modal";

    modal.innerHTML = `

        <div class="success-card">

            <div class="success-icon">
                <i class="fa-solid fa-circle-check"></i>
            </div>

            <h2>Review Submitted!</h2>

            <p>
                Thank you for choosing
                <strong>CloudFix India</strong>.
            </p>

            <p>
                Your review has been received and
                will appear after approval.
            </p>

            <button id="successClose">
                Continue Browsing
            </button>

        </div>

    `;

    document.body.appendChild(modal);

    document
        .getElementById("successClose")
        .onclick = () => {

            modal.remove();

        };

    setTimeout(() => {

        if (modal.parentNode) {

            modal.remove();

        }

    },3000);

}