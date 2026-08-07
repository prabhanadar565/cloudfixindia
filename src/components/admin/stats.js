import { getDashboardStats } from "../../firebase/dashboardService";

export async function loadDashboardStats() {

    const stats = await getDashboardStats();

    const pendingCard = document.getElementById("pendingCard");
    const approvedCard = document.getElementById("approvedCard");
    const rejectedCard = document.getElementById("rejectedCard");

    if (pendingCard) {
        pendingCard.textContent = stats.pending;
    }

    if (approvedCard) {
        approvedCard.textContent = stats.approved;
    }

    if (rejectedCard) {
        rejectedCard.textContent = stats.rejected;
    }

}

// Allow reviewsTable.js to refresh dashboard cards
window.refreshDashboardStats = loadDashboardStats;