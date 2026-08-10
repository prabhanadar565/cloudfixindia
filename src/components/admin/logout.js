import { logout } from "../../firebase/auth";


// ==========================================
// INITIALIZE LOGOUT
// ==========================================

export function initLogout() {

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (!logoutBtn) {

        console.warn(
            "Logout button not found."
        );

        return;

    }


    // Prevent duplicate event listeners
    if (logoutBtn.dataset.logoutInitialized === "true") {
        return;
    }

    logoutBtn.dataset.logoutInitialized = "true";


    logoutBtn.addEventListener(
        "click",
        async () => {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (!confirmLogout) {
                return;
            }


            try {

                await logout();

                window.location.href =
                    "/login.html";

            } catch (error) {

                console.error(
                    "Logout failed:",
                    error
                );

                alert(
                    "Unable to logout. Please try again."
                );

            }

        }
    );

}