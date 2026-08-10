import { checkAuth } from "../../firebase/auth";
import { renderLayout } from "./layout";
import { loadDashboardStats } from "./stats";
import { loadReviews } from "./reviewsTable";
import { loadBookings } from "./bookingsTable";
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

    initAdminNavigation();

}


function initAdminNavigation() {

    const bookingLink =
        document.getElementById("bookingsNav");

    const dashboardLink =
        document.getElementById("dashboardNav");


    if (bookingLink) {

        bookingLink.addEventListener(
            "click",
            async (e) => {

                e.preventDefault();

                setActiveNav(bookingLink);

                renderBookingsPage();

                await loadBookings();

            }
        );

    }


    if (dashboardLink) {

        dashboardLink.addEventListener(
            "click",
            async (e) => {

                e.preventDefault();

                setActiveNav(dashboardLink);

                renderDashboardPage();

                await loadDashboardStats();

                await loadReviews();

            }
        );

    }

}


function setActiveNav(activeLink) {

    document
        .querySelectorAll(".sidebar nav a")
        .forEach(link => {

            link.classList.remove("active");

        });


    activeLink.classList.add("active");

}


function renderBookingsPage() {

    const content =
        document.querySelector(".content");

    if (!content) return;


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>Bookings</h1>

                <p>
                    Manage customer service bookings.
                </p>

            </div>

        </div>


        <div class="table">

            <div class="table-header">

                <h2>Customer Bookings</h2>

                <span id="bookingCount">
                    Loading...
                </span>

            </div>


            <div id="bookingsTable"></div>

        </div>

    `;

}


function renderDashboardPage() {

    const content =
        document.querySelector(".content");

    if (!content) return;


    content.innerHTML = `

        <h1>Dashboard</h1>

        <div class="cards">

            <div class="card pending">

                <div class="card-icon">⭐</div>

                <div class="card-info">

                    <h3>Pending Reviews</h3>

                    <h2 id="pendingCard">0</h2>

                    <p>Waiting for approval</p>

                </div>

            </div>


            <div class="card approved">

                <div class="card-icon">✅</div>

                <div class="card-info">

                    <h3>Approved Reviews</h3>

                    <h2 id="approvedCard">0</h2>

                    <p>Visible on website</p>

                </div>

            </div>


            <div class="card rejected">

                <div class="card-icon">❌</div>

                <div class="card-info">

                    <h3>Rejected Reviews</h3>

                    <h2 id="rejectedCard">0</h2>

                    <p>Hidden from website</p>

                </div>

            </div>

        </div>


        <div class="table">

            <div class="table-header">

                <h2>Pending Reviews</h2>

                <span id="pendingCount">
                    0 Reviews
                </span>

            </div>

            <div id="reviewsTable"></div>

        </div>

    `;

}