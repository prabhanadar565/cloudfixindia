import {
    getPendingReviews,
    approveReview,
    rejectReview,
    deleteReview
} from "../../firebase/reviewService";

export async function loadReviews() {

    const reviews = await getPendingReviews();

    renderReviews(reviews);

    document.getElementById("pendingCount").textContent =
        `${reviews.length} Reviews`;

}

document.querySelectorAll(".approve").forEach(btn => {

    btn.onclick = async () => {

        await approveReview(btn.dataset.id);

        loadReviews();

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