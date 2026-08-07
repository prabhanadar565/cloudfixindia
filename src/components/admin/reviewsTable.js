import {
    getPendingReviews,
    approveReview,
    rejectReview,
    deleteReview
} from "../../firebase/reviewService";

export function renderReviews(reviews) {

    const container = document.getElementById("reviewsTable");

    if (!container) return;

    container.innerHTML = "";

    if (reviews.length === 0) {

        container.innerHTML = `
            <div class="review-row">
                <p>No pending reviews found.</p>
            </div>
        `;

        return;

    }

    reviews.forEach(review => {

        container.innerHTML += `
            <div class="review-row">

                <div class="review-info">

                    <h4>${review.name}</h4>

                    <p>${review.city}</p>

                    <small>${review.service}</small>

                    <p>${review.review}</p>

                </div>

                <div class="review-actions">

                    <button
                        class="approve"
                        data-id="${review.id}">
                        ✅ Approve
                    </button>

                    <button
                        class="reject"
                        data-id="${review.id}">
                        ❌ Reject
                    </button>

                    <button
                        class="delete"
                        data-id="${review.id}">
                        🗑 Delete
                    </button>

                </div>

            </div>
        `;

    });

    attachEvents();

}

async function attachEvents() {

    document.querySelectorAll(".approve").forEach(btn => {

        btn.onclick = async () => {

            await approveReview(btn.dataset.id);

            await loadReviews();

            if (window.refreshDashboardStats) {
                window.refreshDashboardStats();
            }

        };

    });

    document.querySelectorAll(".reject").forEach(btn => {

        btn.onclick = async () => {

            await rejectReview(btn.dataset.id);

            loadReviews();

        };

    });

    document.querySelectorAll(".delete").forEach(btn => {

        btn.onclick = async () => {

            if (!confirm("Delete this review?")) return;

            await deleteReview(btn.dataset.id);

            loadReviews();

        };

    });

}

export async function loadReviews() {

    const reviews = await getPendingReviews();

    renderReviews(reviews);

const pending = document.getElementById("pendingCount");
const pendingCard = document.getElementById("pendingCard");

if (pending) {
    pending.textContent = `${reviews.length} Reviews`;
}

if (pendingCard) {
    pendingCard.textContent = reviews.length;
}

}