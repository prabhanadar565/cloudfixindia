import { checkAuth } from "../../firebase/auth";
import { renderLayout } from "./layout";
import { loadDashboardStats } from "./stats";
import { loadReviews } from "./reviewsTable";
import { loadBookings } from "./bookingsTable";
import { initLogout } from "./logout";

import {
    getCustomers,
    getCustomerBookings,
    getCustomerBookingsForStats
} from "./customerService";

import {
    getBookingAvailability,
    setBookingAvailability
} from "../../firebase/settingsService";


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
// INITIALIZE DASHBOARD
// ==========================================

async function initDashboard() {

    renderLayout();

    initLogout();

    initNavigation();

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
// NAVIGATION
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


    dashboardNav?.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            setActiveNav(dashboardNav);

            showDashboard();

        }
    );


    reviewsNav?.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            setActiveNav(reviewsNav);

            showReviews();

        }
    );


    bookingsNav?.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            setActiveNav(bookingsNav);

            await showBookings();

        }
    );


    customersNav?.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            setActiveNav(customersNav);

            await showCustomers();

        }
    );


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
// ACTIVE NAVIGATION
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
// DASHBOARD
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


    loadDashboardStats();
    loadReviews();

}


// ==========================================
// BOOKINGS
// ==========================================

async function showBookings(statusFilter = null) {

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

            </div>


            <div id="bookingsTable">

                <div class="booking-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Loading bookings...

                </div>

            </div>

        </div>

    `;


    await loadBookings(statusFilter);

}


// ==========================================
// REVIEWS
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
// CUSTOMERS
// ==========================================

async function showCustomers() {

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
                    Customers
                </h1>

                <p>
                    Manage customers from your service bookings.
                </p>

            </div>

        </div>


        <!-- CUSTOMER STATISTICS -->

        <div class="customer-stats-grid">

            <div
                class="customer-stat-card clickable-stat"
                id="totalCustomersCard"
            >

                <div class="customer-stat-icon">
                    <i class="fa-solid fa-users"></i>
                </div>

                <div>

                    <span>
                        Total Customers
                    </span>

                    <strong id="totalCustomersStat">
                        —
                    </strong>

                </div>

            </div>


            <div
                class="customer-stat-card clickable-stat"
                id="totalBookingsCard"
            >

                <div class="customer-stat-icon">
                    <i class="fa-solid fa-calendar-check"></i>
                </div>

                <div>

                    <span>
                        Total Bookings
                    </span>

                    <strong id="totalBookingsStat">
                        —
                    </strong>

                </div>

            </div>


            <div
                class="customer-stat-card clickable-stat"
                id="repeatCustomersCard"
            >

                <div class="customer-stat-icon">
                    <i class="fa-solid fa-repeat"></i>
                </div>

                <div>

                    <span>
                        Repeat Customers
                    </span>

                    <strong id="repeatCustomersStat">
                        —
                    </strong>

                </div>

            </div>


            <div
                class="customer-stat-card clickable-stat"
                id="pendingBookingsCard"
            >

                <div class="customer-stat-icon pending">
                    <i class="fa-solid fa-clock"></i>
                </div>

                <div>

                    <span>
                        Pending Bookings
                    </span>

                    <strong id="pendingBookingsStat">
                        —
                    </strong>

                </div>

            </div>


            <div
                class="customer-stat-card clickable-stat"
                id="completedBookingsCard"
            >

                <div class="customer-stat-icon completed">
                    <i class="fa-solid fa-circle-check"></i>
                </div>

                <div>

                    <span>
                        Completed Bookings
                    </span>

                    <strong id="completedBookingsStat">
                        —
                    </strong>

                </div>

            </div>

        </div>


        <!-- CUSTOMER TABLE -->

        <div class="table customer-table-container">

            <div class="table-header">

                <div>

                    <h2>
                        Customer List
                    </h2>

                    <p>
                        Customers are automatically grouped
                        from your bookings.
                    </p>

                </div>


                <span id="customerCount">
                    Loading...
                </span>

            </div>


            <!-- SEARCH -->

            <div class="customer-search-container">

                <div class="customer-search-box">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        id="customerSearch"
                        placeholder="Search by name, phone, email or service..."
                        autocomplete="off"
                    />

                    <button
                        id="clearCustomerSearch"
                        type="button"
                        title="Clear search"
                        style="display: none;"
                    >

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>

            </div>


            <div id="customersTable">

                <div class="booking-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Loading customers...

                </div>

            </div>

        </div>

    `;


    try {

        // ------------------------------------------
        // LOAD CUSTOMERS
        // ------------------------------------------

        const customers =
            await getCustomers();


        const table =
            document.getElementById(
                "customersTable"
            );


        const count =
            document.getElementById(
                "customerCount"
            );


        const searchInput =
            document.getElementById(
                "customerSearch"
            );


        const clearButton =
            document.getElementById(
                "clearCustomerSearch"
            );


        if (!table) {

            console.error(
                "customersTable element not found"
            );

            return;

        }


        // ------------------------------------------
        // CALCULATE CUSTOMER STATISTICS
        // ------------------------------------------

        const totalCustomers =
            customers.length;


        const totalBookings =
            customers.reduce(
                (total, customer) => {

                    return total +
                        Number(
                            customer.bookings || 0
                        );

                },
                0
            );


        const repeatCustomers =
            customers.filter(
                (customer) =>
                    Number(
                        customer.bookings || 0
                    ) > 1
            ).length;


        // ------------------------------------------
        // LOAD ALL BOOKINGS FOR STATUS COUNTS
        // ------------------------------------------

        let pendingBookings = 0;
        let completedBookings = 0;


        try {

            const allBookings =
                await getCustomerBookingsForStats();


            allBookings.forEach(
                (booking) => {

                    const status =
                        String(
                            booking.status || ""
                        ).toLowerCase();


                    if (
                        status === "pending"
                    ) {

                        pendingBookings++;

                    }


                    if (
                        status === "completed"
                    ) {

                        completedBookings++;

                    }

                }
            );

        } catch (statsError) {

            console.error(
                "Unable to calculate booking status statistics:",
                statsError
            );

        }


        // ------------------------------------------
        // UPDATE STAT CARDS
        // ------------------------------------------

        document.getElementById(
            "totalCustomersStat"
        ).textContent =
            totalCustomers;


        document.getElementById(
            "totalBookingsStat"
        ).textContent =
            totalBookings;


        document.getElementById(
            "repeatCustomersStat"
        ).textContent =
            repeatCustomers;


        document.getElementById(
            "pendingBookingsStat"
        ).textContent =
            pendingBookings;


        document.getElementById(
            "completedBookingsStat"
        ).textContent =
            completedBookings;


        // ------------------------------------------
        // CUSTOMER COUNT
        // ------------------------------------------

        if (count) {

            count.textContent =
                `${totalCustomers} ${
                    totalCustomers === 1
                        ? "Customer"
                        : "Customers"
                }`;

        }


        // ------------------------------------------
        // RENDER CUSTOMER TABLE
        // ------------------------------------------

        function renderCustomerTable(
            filteredCustomers
        ) {

            if (count) {

                count.textContent =
                    `${filteredCustomers.length} ${
                        filteredCustomers.length === 1
                            ? "Customer"
                            : "Customers"
                    }`;

            }


            if (
                filteredCustomers.length === 0
            ) {

                const searchValue =
                    searchInput?.value.trim();


                if (searchValue) {

                    table.innerHTML = `

                        <div class="booking-empty">

                            <i class="fa-solid fa-magnifying-glass"></i>

                            <h3>
                                No Customers Found
                            </h3>

                            <p>
                                No customer matches
                                "${escapeHtml(searchValue)}".
                            </p>

                        </div>

                    `;

                } else {

                    table.innerHTML = `

                        <div class="booking-empty">

                            <i class="fa-solid fa-users"></i>

                            <h3>
                                No Customers Yet
                            </h3>

                            <p>
                                Customers will appear here
                                after they make a booking.
                            </p>

                        </div>

                    `;

                }

                return;

            }


            table.innerHTML = `

                <div class="customer-table-wrapper">

                    <table class="customer-table">

                        <thead>

                            <tr>

                                <th>
                                    Customer
                                </th>

                                <th>
                                    Phone
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Bookings
                                </th>

                                <th>
                                    Services
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${filteredCustomers.map(
                                (customer) => {

                                    const originalIndex =
                                        customers.indexOf(
                                            customer
                                        );


                                    return `

                                        <tr>

                                            <td>

                                                <div class="customer-name">

                                                    <div class="customer-avatar">

                                                        ${
                                                            escapeHtml(
                                                                customer.name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() || "C"
                                                            )
                                                        }

                                                    </div>


                                                    <strong>

                                                        ${escapeHtml(
                                                            customer.name
                                                        )}

                                                    </strong>

                                                </div>

                                            </td>


                                            <td>

                                                <a
                                                    href="tel:${escapeHtml(
                                                        customer.phone
                                                    )}"
                                                    class="customer-phone"
                                                >

                                                    ${escapeHtml(
                                                        customer.phone
                                                    )}

                                                </a>

                                            </td>


                                            <td>

                                                ${
                                                    customer.email
                                                        ? `

                                                            <a
                                                                href="mailto:${escapeHtml(
                                                                    customer.email
                                                                )}"
                                                                class="customer-email"
                                                            >

                                                                ${escapeHtml(
                                                                    customer.email
                                                                )}

                                                            </a>

                                                        `
                                                        : "—"
                                                }

                                            </td>


                                            <td>

                                                <span class="booking-count">

                                                    ${customer.bookings}

                                                </span>

                                            </td>


                                            <td>

                                                <div class="service-list">

                                                    ${
                                                        customer.services
                                                            .map(
                                                                (service) => `

                                                                    <span class="service-tag">

                                                                        ${escapeHtml(
                                                                            service
                                                                        )}

                                                                    </span>

                                                                `
                                                            )
                                                            .join("")
                                                    }

                                                </div>

                                            </td>


                                            <td>

                                                <button
                                                    class="customer-view-btn"
                                                    data-customer-index="${originalIndex}"
                                                >

                                                    <i class="fa-solid fa-eye"></i>

                                                    View

                                                </button>

                                            </td>

                                        </tr>

                                    `;

                                }
                            ).join("")}

                        </tbody>

                    </table>

                </div>

            `;


            document
                .querySelectorAll(
                    ".customer-view-btn"
                )
                .forEach((button) => {

                    button.addEventListener(
                        "click",
                        () => {

                            const index =
                                Number(
                                    button.dataset.customerIndex
                                );


                            showCustomerDetails(
                                customers[index]
                            );

                        }
                    );

                });

        }


        // ------------------------------------------
        // INITIAL TABLE
        // ------------------------------------------

        renderCustomerTable(
            customers
        );


        // ------------------------------------------
        // SEARCH
        // ------------------------------------------

        searchInput?.addEventListener(
            "input",
            () => {

                const searchValue =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                if (clearButton) {

                    clearButton.style.display =
                        searchValue
                            ? "flex"
                            : "none";

                }


                if (!searchValue) {

                    renderCustomerTable(
                        customers
                    );

                    return;

                }


                const filteredCustomers =
                    customers.filter(
                        (customer) => {

                            const name =
                                String(
                                    customer.name || ""
                                ).toLowerCase();


                            const phone =
                                String(
                                    customer.phone || ""
                                ).toLowerCase();


                            const email =
                                String(
                                    customer.email || ""
                                ).toLowerCase();


                            const services =
                                (
                                    customer.services || []
                                )
                                    .join(" ")
                                    .toLowerCase();


                            return (
                                name.includes(searchValue) ||
                                phone.includes(searchValue) ||
                                email.includes(searchValue) ||
                                services.includes(searchValue)
                            );

                        }
                    );


                renderCustomerTable(
                    filteredCustomers
                );

            }
        );


        // ------------------------------------------
        // CLEAR SEARCH
        // ------------------------------------------

        clearButton?.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                    searchInput.focus();

                }


                clearButton.style.display =
                    "none";


                renderCustomerTable(
                    customers
                );

            }
        );

        // ==========================================
// CUSTOMER STAT CARD ACTIONS
// ==========================================


// ------------------------------------------
// TOTAL CUSTOMERS
// ------------------------------------------

document
    .getElementById("totalCustomersCard")
    ?.addEventListener(
        "click",
        () => {

            const searchInput =
                document.getElementById(
                    "customerSearch"
                );

            searchInput?.focus();

        }
    );


// ------------------------------------------
// TOTAL BOOKINGS
// ------------------------------------------

document
    .getElementById("totalBookingsCard")
    ?.addEventListener(
        "click",
        async () => {

            const bookingsNav =
                document.getElementById(
                    "bookingsNav"
                );


            setActiveNav(
                bookingsNav
            );


            await showBookings();

        }
    );


// ------------------------------------------
// PENDING BOOKINGS
// ------------------------------------------

document
    .getElementById("pendingBookingsCard")
    ?.addEventListener(
        "click",
        async () => {

            const bookingsNav =
                document.getElementById(
                    "bookingsNav"
                );


            setActiveNav(
                bookingsNav
            );


            await showBookings(
                "pending"
            );

        }
    );


// ------------------------------------------
// COMPLETED BOOKINGS
// ------------------------------------------

document
    .getElementById("completedBookingsCard")
    ?.addEventListener(
        "click",
        async () => {

            const bookingsNav =
                document.getElementById(
                    "bookingsNav"
                );


            setActiveNav(
                bookingsNav
            );


            await showBookings(
                "completed"
            );

        }
    );


    } catch (error) {

        console.error(
            "Failed to load customers:",
            error
        );


        const table =
            document.getElementById(
                "customersTable"
            );


        if (table) {

            table.innerHTML = `

                <div class="booking-empty">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h3>
                        Unable to load customers
                    </h3>

                    <p>
                        Please refresh the page
                        and try again.
                    </p>

                </div>

            `;

        }

    }

}

// ==========================================
// CUSTOMER DETAILS
// ==========================================

async function showCustomerDetails(customer) {

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

                <button
                    id="backToCustomers"
                    class="back-btn"
                >

                    <i class="fa-solid fa-arrow-left"></i>

                    Back to Customers

                </button>


                <h1>
                    Customer Details
                </h1>

            </div>

        </div>


        <div class="customer-details-grid">


            <div class="table customer-profile-card">

                <div class="customer-profile-header">

                    <div class="customer-avatar large">

                        ${
                            escapeHtml(
                                customer.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "C"
                            )
                        }

                    </div>


                    <div>

                        <h2>
                            ${escapeHtml(
                                customer.name
                            )}
                        </h2>

                        <p>
                            Customer
                        </p>

                    </div>

                </div>


                <div class="customer-contact">

                    <div>

                        <i class="fa-solid fa-phone"></i>

                        <a
                            href="tel:${escapeHtml(
                                customer.phone
                            )}"
                        >

                            ${escapeHtml(
                                customer.phone
                            )}

                        </a>

                    </div>


                    ${
                        customer.email
                            ? `

                                <div>

                                    <i class="fa-solid fa-envelope"></i>

                                    <a
                                        href="mailto:${escapeHtml(
                                            customer.email
                                        )}"
                                    >

                                        ${escapeHtml(
                                            customer.email
                                        )}

                                    </a>

                                </div>

                            `
                            : ""
                    }

                </div>

            </div>


            <div class="table">

                <div class="table-header">

                    <h2>
                        Customer Summary
                    </h2>

                </div>


                <div class="customer-summary">

                    <div>

                        <span>
                            Total Bookings
                        </span>

                        <strong>
                            ${customer.bookings}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Services
                        </span>

                        <strong>
                            ${customer.services.length}
                        </strong>

                    </div>

                </div>

            </div>

        </div>


        <div class="table">

            <div class="table-header">

                <div>

                    <h2>
                        Booking History
                    </h2>

                    <p>
                        All bookings made by this customer.
                    </p>

                </div>

            </div>


            <div id="customerBookingHistory">

                <div class="booking-empty">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    <h3>
                        Loading Booking History...
                    </h3>

                </div>

            </div>

        </div>

    `;


    // ------------------------------------------
    // BACK BUTTON
    // ------------------------------------------

    const backButton =
        document.getElementById(
            "backToCustomers"
        );


    backButton?.addEventListener(
        "click",
        () => {

            showCustomers();

        }
    );


    // ------------------------------------------
    // LOAD CUSTOMER BOOKINGS
    // ------------------------------------------

    try {

        const bookings =
            await getCustomerBookings(
                customer.phone
            );


        const history =
            document.getElementById(
                "customerBookingHistory"
            );


        if (!history) {

            console.error(
                "customerBookingHistory element not found"
            );

            return;

        }


        // --------------------------------------
        // NO BOOKINGS
        // --------------------------------------

        if (bookings.length === 0) {

            history.innerHTML = `

                <div class="booking-empty">

                    <i class="fa-solid fa-calendar-xmark"></i>

                    <h3>
                        No Booking History
                    </h3>

                    <p>
                        No bookings were found for this customer.
                    </p>

                </div>

            `;

            return;

        }


        // --------------------------------------
        // BOOKING CARDS
        // --------------------------------------

        history.innerHTML = `

            <div class="customer-booking-list">

                ${bookings.map(
                    (booking) => {

                        const status =
                            String(
                                booking.status || "pending"
                            ).toLowerCase();


                        const statusText =
                            status.charAt(0).toUpperCase() +
                            status.slice(1);


                        const date =
                            booking.visit?.date ||
                            booking.date ||
                            "—";


                        const time =
                            booking.visit?.time ||
                            booking.time ||
                            "—";


                        return `

                            <div class="customer-booking-card">

                                <div class="customer-booking-header">

                                    <div>

                                        <h3>

                                            ${escapeHtml(
                                                booking.service
                                            )}

                                        </h3>

                                        <span class="booking-id">

                                            Booking ID:
                                            ${escapeHtml(
                                                booking.id
                                            )}

                                        </span>

                                    </div>


                                    <span
                                        class="booking-status ${escapeHtml(
                                            status
                                        )}"
                                    >

                                        ${escapeHtml(
                                            statusText
                                        )}

                                    </span>

                                </div>


                                <div class="customer-booking-details">


                                    <div>

                                        <i class="fa-solid fa-calendar"></i>

                                        <strong>
                                            Date
                                        </strong>

                                        <span>
                                            ${escapeHtml(
                                                date
                                            )}
                                        </span>

                                    </div>


                                    <div>

                                        <i class="fa-solid fa-clock"></i>

                                        <strong>
                                            Time
                                        </strong>

                                        <span>
                                            ${escapeHtml(
                                                time
                                            )}
                                        </span>

                                    </div>


                                    <div>

                                        <i class="fa-solid fa-location-dot"></i>

                                        <strong>
                                            Address
                                        </strong>

                                        <span>
                                            ${escapeHtml(
                                                booking.address
                                            )}
                                        </span>

                                    </div>


                                    <div>

                                        <i class="fa-solid fa-screwdriver-wrench"></i>

                                        <strong>
                                            Problem
                                        </strong>

                                        <span>
                                            ${escapeHtml(
                                                booking.problem
                                            )}
                                        </span>

                                    </div>


                                </div>

                            </div>

                        `;

                    }
                ).join("")}

            </div>

        `;


    } catch (error) {

        console.error(
            "Failed to load customer booking history:",
            error
        );


        const history =
            document.getElementById(
                "customerBookingHistory"
            );


        if (history) {

            history.innerHTML = `

                <div class="booking-empty">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h3>
                        Unable to Load Booking History
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
// SETTINGS
// ==========================================

async function showSettings() {

    const content =
        document.getElementById(
            "adminContent"
        );


    if (!content) {

        console.error(
            "adminContent element not found"
        );

        return;

    }


    // ------------------------------------------
    // LOADING STATE
    // ------------------------------------------

    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    Settings
                </h1>

                <p>
                    Manage your CloudFix India
                    administration and system settings.
                </p>

            </div>

        </div>


        <div class="booking-loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            Loading settings...

        </div>

    `;


    try {

        const acceptingBookings =
            await getBookingAvailability();


        // --------------------------------------
        // SETTINGS PAGE
        // --------------------------------------

        content.innerHTML = `

            <div class="page-heading">

                <div>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage your CloudFix India
                        administration and system settings.
                    </p>

                </div>

            </div>


            <!-- ==================================
                 BUSINESS INFORMATION
                 ================================== -->

            <div class="settings-grid">


                <div class="table settings-card">

                    <div class="table-header">

                        <div>

                            <h2>

                                <i class="fa-solid fa-building"></i>

                                Business Information

                            </h2>

                            <p>
                                CloudFix India service information.
                            </p>

                        </div>

                    </div>


                    <div class="settings-list">


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Business Name
                                </strong>

                                <span>
                                    CloudFix India
                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Business Email
                                </strong>

                                <span>
                                    cloudfixindia@zohomail.in
                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Service Type
                                </strong>

                                <span>
                                    IT Support & Computer Services
                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Service Availability
                                </strong>

                                <span class="status-badge status-active">

                                    <i class="fa-solid fa-circle-check"></i>

                                    Active

                                </span>

                            </div>

                        </div>


                    </div>

                </div>



                <!-- ==================================
                     BOOKING SETTINGS
                     ================================== -->

                <div class="table settings-card">

                    <div class="table-header">

                        <div>

                            <h2>

                                <i class="fa-solid fa-calendar-check"></i>

                                Booking Settings

                            </h2>

                            <p>
                                Control whether customers
                                can submit new bookings.
                            </p>

                        </div>

                    </div>


                    <div class="settings-list">


                        <div class="settings-item booking-setting-row">

                            <div>

                                <strong>
                                    Accept New Customer Bookings
                                </strong>

                                <span id="bookingAvailabilityText">

                                    ${
                                        acceptingBookings
                                            ? "Customers can currently submit new bookings."
                                            : "New customer bookings are currently disabled."
                                    }

                                </span>

                            </div>


                            <label class="settings-switch">

                                <input
                                    type="checkbox"
                                    id="bookingAvailabilityToggle"
                                    ${
                                        acceptingBookings
                                            ? "checked"
                                            : ""
                                    }
                                >

                                <span class="settings-slider"></span>

                            </label>

                        </div>


                        <div
                            id="bookingAvailabilityStatus"
                            class="
                                booking-setting-status
                                ${
                                    acceptingBookings
                                        ? "enabled"
                                        : "disabled"
                                }
                            "
                        >

                            <i
                                class="
                                    fa-solid
                                    ${
                                        acceptingBookings
                                            ? "fa-circle-check"
                                            : "fa-circle-pause"
                                    }
                                "
                            ></i>


                            <span>

                                ${
                                    acceptingBookings
                                        ? "Booking system is accepting new requests."
                                        : "Booking system is temporarily closed."
                                }

                            </span>

                        </div>


                    </div>

                </div>



                <!-- ==================================
                     ADMIN ACCOUNT
                     ================================== -->

                <div class="table settings-card">

                    <div class="table-header">

                        <div>

                            <h2>

                                <i class="fa-solid fa-user-shield"></i>

                                Admin Account

                            </h2>

                            <p>
                                Current administrator access.
                            </p>

                        </div>

                    </div>


                    <div class="settings-list">


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Admin Email
                                </strong>

                                <span>
                                    cloudfixindia@zohomail.in
                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Authentication
                                </strong>

                                <span class="status-badge status-active">

                                    <i class="fa-solid fa-shield-halved"></i>

                                    Firebase Authentication

                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Account Access
                                </strong>

                                <span class="status-badge status-active">

                                    <i class="fa-solid fa-lock"></i>

                                    Administrator

                                </span>

                            </div>

                        </div>


                    </div>

                </div>



                <!-- ==================================
                     SECURITY
                     ================================== -->

                <div class="table settings-card">

                    <div class="table-header">

                        <div>

                            <h2>

                                <i class="fa-solid fa-shield-halved"></i>

                                Security

                            </h2>

                            <p>
                                CloudFix data protection status.
                            </p>

                        </div>

                    </div>


                    <div class="settings-list">


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Firestore Access
                                </strong>

                                <span class="status-badge status-active">

                                    <i class="fa-solid fa-lock"></i>

                                    Protected

                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Booking Data
                                </strong>

                                <span>
                                    Admin access only
                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Review Management
                                </strong>

                                <span>
                                    Admin access only
                                </span>

                            </div>

                        </div>


                        <div class="settings-item">

                            <div>

                                <strong>
                                    Public Review Visibility
                                </strong>

                                <span>
                                    Approved reviews only
                                </span>

                            </div>

                        </div>


                    </div>

                </div>


            </div>



            <!-- ==================================
                 SYSTEM INFORMATION
                 ================================== -->

            <div class="table settings-system-card">

                <div class="table-header">

                    <div>

                        <h2>

                            <i class="fa-solid fa-server"></i>

                            System Information

                        </h2>

                        <p>
                            CloudFix India admin system.
                        </p>

                    </div>

                </div>


                <div class="system-status-grid">


                    <div class="system-status-item">

                        <i class="fa-solid fa-database"></i>

                        <div>

                            <strong>
                                Firebase Firestore
                            </strong>

                            <span class="status-text">
                                Connected
                            </span>

                        </div>

                    </div>


                    <div class="system-status-item">

                        <i class="fa-solid fa-user-lock"></i>

                        <div>

                            <strong>
                                Authentication
                            </strong>

                            <span class="status-text">
                                Active
                            </span>

                        </div>

                    </div>


                    <div class="system-status-item">

                        <i class="fa-solid fa-calendar"></i>

                        <div>

                            <strong>
                                Booking System
                            </strong>

                            <span
                                id="systemBookingStatus"
                                class="status-text"
                            >
                                ${
                                    acceptingBookings
                                        ? "Accepting Bookings"
                                        : "Booking Closed"
                                }
                            </span>

                        </div>

                    </div>


                    <div class="system-status-item">

                        <i class="fa-solid fa-star"></i>

                        <div>

                            <strong>
                                Review System
                            </strong>

                            <span class="status-text">
                                Operational
                            </span>

                        </div>

                    </div>


                </div>

            </div>

        `;


        // --------------------------------------
        // BOOKING TOGGLE
        // --------------------------------------

        const toggle =
            document.getElementById(
                "bookingAvailabilityToggle"
            );


        const description =
            document.getElementById(
                "bookingAvailabilityText"
            );


        const statusBox =
            document.getElementById(
                "bookingAvailabilityStatus"
            );


        const systemStatus =
            document.getElementById(
                "systemBookingStatus"
            );


        if (!toggle) {
            return;
        }


        toggle.addEventListener(
            "change",
            async () => {

                const newValue =
                    toggle.checked;


                // Prevent multiple clicks
                toggle.disabled = true;


                try {

                    await setBookingAvailability(
                        newValue
                    );


                    if (description) {

                        description.textContent =
                            newValue
                                ? "Customers can currently submit new bookings."
                                : "New customer bookings are currently disabled.";

                    }


                    if (statusBox) {

                        statusBox.classList.toggle(
                            "enabled",
                            newValue
                        );

                        statusBox.classList.toggle(
                            "disabled",
                            !newValue
                        );


                        statusBox.innerHTML = `

                            <i
                                class="
                                    fa-solid
                                    ${
                                        newValue
                                            ? "fa-circle-check"
                                            : "fa-circle-pause"
                                    }
                                "
                            ></i>

                            <span>

                                ${
                                    newValue
                                        ? "Booking system is accepting new requests."
                                        : "Booking system is temporarily closed."
                                }

                            </span>

                        `;

                    }


                    if (systemStatus) {

                        systemStatus.textContent =
                            newValue
                                ? "Accepting Bookings"
                                : "Booking Closed";

                    }


                } catch (error) {

                    console.error(
                        "Failed to update booking availability:",
                        error
                    );


                    // Restore previous state
                    toggle.checked =
                        !newValue;


                    alert(
                        "Unable to update booking availability. Please try again."
                    );

                } finally {

                    toggle.disabled = false;

                }

            }
        );


    } catch (error) {

        console.error(
            "Failed to load settings:",
            error
        );


        content.innerHTML = `

            <div class="booking-empty">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h3>
                    Unable to Load Settings
                </h3>

                <p>
                    Please refresh the page and try again.
                </p>

            </div>

        `;

    }

}

// ==========================================
// HTML ESCAPE
// ==========================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}