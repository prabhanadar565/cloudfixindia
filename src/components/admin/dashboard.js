import { checkAuth } from "../../firebase/auth";
import { renderLayout } from "./layout";
import { loadDashboardStats } from "./stats";
import { loadReviews } from "./reviewsTable";
import { initLogout } from "./logout";

checkAuth((user) => {

    if (!user) {

        window.location.href = "/login.html";
        return;

    }

    initDashboard();

});

async function initDashboard() {

    renderLayout();

    await loadDashboardStats();

    await loadReviews();

    initLogout();

}