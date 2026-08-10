import { checkAuth } from "../../firebase/auth";
import { renderLayout } from "./layout";
import { loadDashboardStats } from "./stats";
import { loadReviews } from "./reviewsTable";
import { loadBookings } from "./bookingsTable";
import { initLogout } from "./logout";


// ==========================================
// AUTHENTICATION
// ==========================================

checkAuth((user) => {

    if (!user) {
        window.location.href = "/login.html";
        return;
    }

    initDashboard();

});


// ==========================================
// INITIALIZE ADMIN DASHBOARD
// ==========================================

async function initDashboard() {

    // Render sidebar + dashboard layout
    renderLayout();

    // Initialize logout immediately
    // so logout still works if Firestore has an error
    initLogout();

    // Initialize sidebar navigation
    initNavigation();

    // Load dashboard data
    try {

        await loadDashboardStats();
        await loadReviews();

    } catch (error) {

        console.error(
            "Dashboard data loading failed:",
            error
        );

    }

}


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

function initNavigation() {

    const dashboardNav =
        document.getElementById("dashboardNav");

    const reviewsNav =
        document.getElementById("reviewsNav");

    const bookingsNav =
        document.getElementById("bookingsNav");

    const customersNav =
        document.getElementById("customersNav");

    const settingsNav =
        document.getElementById("settingsNav");


    // ------------------------------------------
    // DASHBOARD
    // ------------------------------------------

    dashboardNav?.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            setActiveNav(dashboardNav);

            showDashboard();

        }
    );


    // ------------------------------------------
    // REVIEWS
    // ------------------------------------------

    reviewsNav?.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            setActiveNav(reviewsNav);

            showReviews();

        }
    );


    // ------------------------------------------
    // BOOKINGS
    // ------------------------------------------

    bookingsNav?.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            setActiveNav(bookingsNav);

            await showBookings();

        }
    );


    // ------------------------------------------
    // CUSTOMERS
    // ------------------------------------------

    customersNav?.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            setActiveNav(customersNav);

            showCustomers();

        }
    );


    // ------------------------------------------
    // SETTINGS
    // ------------------------------------------

    settingsNav?.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            setActiveNav(settingsNav);

            showSettings();

        }
    );

}


// ==========================================
// ACTIVE SIDEBAR ITEM
// ==========================================

function setActiveNav(activeElement) {

    document
        .querySelectorAll(".sidebar nav a")
        .forEach((item) => {

            item.classList.remove("active");

        });


    if (activeElement) {
        activeElement.classList.add("active");
    }

}


// ==========================================
// DASHBOARD PAGE
// ==========================================

function showDashboard() {

    const content =
        document.getElementById("adminContent");

    if (!content) {
        console.error(
            "adminContent element not found"
        );
        return;
    }


    content.innerHTML = `

        <h1>Dashboard</h1>

        <div class="cards">

            <!-- Pending Reviews -->

            <div class="card pending">

                <div class="card-icon">
                    ⭐
                </div>

                <div class="card-info">

                    <h3>
                        Pending Reviews
                    </h3>

                    <h2 id="pendingCard">
                        0
                    </h2>

                    <p>
                        Waiting for approval
                    </p>

                </div>

            </div>


            <!-- Approved Reviews -->

            <div class="card approved">

                <div class="card-icon">
                    ✅
                </div>

                <div class="card-info">

                    <h3>
                        Approved Reviews
                    </h3>

                    <h2 id="approvedCard">
                        0
                    </h2>

                    <p>
                        Visible on website
                    </p>

                </div>

            </div>


            <!-- Rejected Reviews -->

            <div class="card rejected">

                <div class="card-icon">
                    ❌
                </div>

                <div class="card-info">

                    <h3>
                        Rejected Reviews
                    </h3>

                    <h2 id="rejectedCard">
                        0
                    </h2>

                    <p>
                        Hidden from website
                    </p>

                </div>

            </div>

        </div>


        <!-- Pending Reviews -->

        <div class="table">

            <div class="table-header">

                <h2>
                    Pending Reviews
                </h2>

                <span id="pendingCount">
                    0 Reviews
                </span>

            </div>

            <div id="reviewsTable"></div>

        </div>

    `;


    // Load dashboard information
    loadDashboardStats();

    loadReviews();

}


// ==========================================
// BOOKINGS PAGE
// ==========================================

async function showBookings() {

    const content =
        document.getElementById("adminContent");

    if (!content) {

        console.error(
            "adminContent element not found"
        );

        return;

    }


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    Bookings
                </h1>

                <p>
                    Manage customer service bookings.
                </p>

            </div>

        </div>


        <div class="table">

            <div class="table-header">

                <div>

                    <h2>
                        Customer Bookings
                    </h2>

                    <p>
                        Manage service bookings from
                        CloudFix India customers.
                    </p>

                </div>

                <span id="bookingCount">
                    Loading...
                </span>

            </div>


            <div id="bookingsTable">

                <div class="booking-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Loading bookings...

                </div>

            </div>

        </div>

    `;


    try {

        await loadBookings();

    } catch (error) {

        console.error(
            "Failed to load bookings:",
            error
        );

        const table =
            document.getElementById(
                "bookingsTable"
            );

        if (table) {

            table.innerHTML = `

                <div class="booking-empty">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h3>
                        Unable to load bookings
                    </h3>

                    <p>
                        Please refresh the page and try again.
                    </p>

                </div>

            `;

        }

    }

}


// ==========================================
// REVIEWS PAGE
// ==========================================

function showReviews() {

    const content =
        document.getElementById("adminContent");

    if (!content) {

        console.error(
            "adminContent element not found"
        );

        return;

    }


    content.innerHTML = `

        <h1>
            Reviews
        </h1>


        <div class="table">

            <div class="table-header">

                <h2>
                    Customer Reviews
                </h2>

            </div>


            <div id="reviewsTable">

                <div class="booking-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Loading reviews...

                </div>

            </div>

        </div>

    `;


    loadReviews();

}


// ==========================================
// CUSTOMERS PAGE
// ==========================================

function showCustomers() {

    const content =
        document.getElementById("adminContent");

    if (!content) {

        console.error(
            "adminContent element not found"
        );

        return;

    }


    content.innerHTML = `

        <h1>
            Customers
        </h1>


        <div class="table">

            <div class="table-header">

                <h2>
                    Customers
                </h2>

            </div>


            <div class="booking-empty">

                <i class="fa-solid fa-users"></i>

                <h3>
                    Customers Management
                </h3>

                <p>
                    This section will be available soon.
                </p>

            </div>

        </div>

    `;

}


// ==========================================
// SETTINGS PAGE
// ==========================================

function showSettings() {

    const content =
        document.getElementById("adminContent");

    if (!content) {

        console.error(
            "adminContent element not found"
        );

        return;

    }


    content.innerHTML = `

        <h1>
            Settings
        </h1>


        <div class="table">

            <div class="table-header">

                <h2>
                    Admin Settings
                </h2>

            </div>


            <div class="booking-empty">

                <i class="fa-solid fa-gear"></i>

                <h3>
                    Settings
                </h3>

                <p>
                    This section will be available soon.
                </p>

            </div>

        </div>

    `;

}