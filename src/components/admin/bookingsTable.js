import {
    getAllBookings,
    acceptBooking,
    completeBooking,
    cancelBooking,
    deleteBooking
} from "../../firebase/bookingService";


let allBookings = [];

let currentFilter = "all";

let currentSearch = "";


/* ==========================================
   LOAD BOOKINGS
========================================== */

export async function loadBookings() {

    const container =
        document.getElementById("bookingsTable");

    if (!container) return;


    container.innerHTML = `
        <div class="booking-loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            Loading bookings...

        </div>
    `;


    try {

        allBookings = await getAllBookings();

        renderBookingControls();

        renderBookings();

    } catch (error) {

        console.error(
            "Failed to load bookings:",
            error
        );


        container.innerHTML = `
            <div class="booking-empty">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <p>
                    Unable to load bookings.
                </p>

            </div>
        `;

    }

}


/* ==========================================
   CONTROLS
========================================== */

function renderBookingControls() {

    const container =
        document.getElementById("bookingsTable");

    if (!container) return;


    container.innerHTML = `

        <div class="booking-controls">

            <div class="booking-search">

                <i class="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    id="bookingSearch"
                    placeholder="Search customer, phone, service or booking ID..."
                    value="${currentSearch}"
                >

            </div>


            <div class="booking-filters">

                <button
                    class="booking-filter active"
                    data-filter="all">

                    All

                </button>


                <button
                    class="booking-filter"
                    data-filter="pending">

                    Pending

                </button>


                <button
                    class="booking-filter"
                    data-filter="accepted">

                    Accepted

                </button>


                <button
                    class="booking-filter"
                    data-filter="completed">

                    Completed

                </button>


                <button
                    class="booking-filter"
                    data-filter="cancelled">

                    Cancelled

                </button>

            </div>

        </div>


        <div id="bookingResults"></div>

    `;


    attachControlEvents();

}


/* ==========================================
   RENDER BOOKINGS
========================================== */

function renderBookings() {

    const container =
        document.getElementById("bookingResults");

    if (!container) return;


    const filteredBookings =
        allBookings.filter(booking => {

            const customer =
                booking.customer || {};

            const search =
                currentSearch.toLowerCase();


            const matchesSearch =

                !search ||

                String(booking.id || "")
                    .toLowerCase()
                    .includes(search) ||

                String(booking.service || "")
                    .toLowerCase()
                    .includes(search) ||

                String(customer.name || "")
                    .toLowerCase()
                    .includes(search) ||

                String(customer.phone || "")
                    .toLowerCase()
                    .includes(search) ||

                String(customer.email || "")
                    .toLowerCase()
                    .includes(search);


            const matchesFilter =

                currentFilter === "all" ||

                booking.status === currentFilter;


            return matchesSearch && matchesFilter;

        });


    if (filteredBookings.length === 0) {

        container.innerHTML = `

            <div class="booking-empty">

                <i class="fa-regular fa-calendar-xmark"></i>

                <h3>
                    No bookings found
                </h3>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        updateBookingCount(0);

        return;

    }


    container.innerHTML =
        filteredBookings.map(renderBookingCard).join("");


    updateBookingCount(
        filteredBookings.length
    );


    attachBookingEvents();

}


/* ==========================================
   BOOKING CARD
========================================== */

function renderBookingCard(booking) {

    const customer =
        booking.customer || {};

    const visit =
        booking.visit || {};

    const status =
        booking.status || "pending";


    return `

        <div class="booking-row">

            <div class="booking-info">

                <div class="booking-main">

                    <div class="booking-icon">

                        <i class="fa-solid fa-calendar-check"></i>

                    </div>


                    <div>

                        <h3>
                            ${escapeHtml(
                                booking.service ||
                                "Service"
                            )}
                        </h3>


                        <span class="booking-id">

                            #${escapeHtml(
                                booking.id
                            )}

                        </span>

                    </div>

                </div>


                <div class="booking-details">

                    <div>

                        <i class="fa-solid fa-user"></i>

                        <strong>
                            ${escapeHtml(
                                customer.name ||
                                "N/A"
                            )}
                        </strong>

                    </div>


                    <div>

                        <i class="fa-solid fa-phone"></i>

                        ${escapeHtml(
                            customer.phone ||
                            "N/A"
                        )}

                    </div>


                    <div>

                        <i class="fa-regular fa-calendar"></i>

                        ${formatDate(
                            visit.date
                        )}

                    </div>


                    <div>

                        <i class="fa-regular fa-clock"></i>

                        ${escapeHtml(
                            visit.time ||
                            "N/A"
                        )}

                    </div>

                </div>


                <div class="booking-problem">

                    <strong>
                        Problem:
                    </strong>

                    ${escapeHtml(
                        booking.problem ||
                        "No description provided"
                    )}

                </div>

            </div>


            <div class="booking-side">

                <span
                    class="booking-status status-${status}">

                    ${formatStatus(status)}

                </span>


                <button
                    class="booking-view"
                    data-id="${booking.id}">

                    <i class="fa-solid fa-eye"></i>

                    View Details

                </button>


                <div class="booking-actions">

                    ${getActionButtons(
                        booking
                    )}

                </div>

            </div>

        </div>

    `;

}


/* ==========================================
   ACTION BUTTONS
========================================== */

function getActionButtons(booking) {

    const status =
        booking.status;


    if (status === "pending") {

        return `

            <button
                class="booking-action accept"
                data-action="accept"
                data-id="${booking.id}">

                <i class="fa-solid fa-check"></i>

                Accept

            </button>


            <button
                class="booking-action cancel"
                data-action="cancel"
                data-id="${booking.id}">

                <i class="fa-solid fa-xmark"></i>

                Cancel

            </button>


            <button
                class="booking-action delete"
                data-action="delete"
                data-id="${booking.id}">

                <i class="fa-solid fa-trash"></i>

                Delete

            </button>

        `;

    }


    if (status === "accepted") {

        return `

            <button
                class="booking-action complete"
                data-action="complete"
                data-id="${booking.id}">

                <i class="fa-solid fa-circle-check"></i>

                Complete

            </button>


            <button
                class="booking-action cancel"
                data-action="cancel"
                data-id="${booking.id}">

                <i class="fa-solid fa-xmark"></i>

                Cancel

            </button>


            <button
                class="booking-action delete"
                data-action="delete"
                data-id="${booking.id}">

                <i class="fa-solid fa-trash"></i>

                Delete

            </button>

        `;

    }


    return `

        <button
            class="booking-action delete"
            data-action="delete"
            data-id="${booking.id}">

            <i class="fa-solid fa-trash"></i>

            Delete

        </button>

    `;

}


/* ==========================================
   CONTROL EVENTS
========================================== */

function attachControlEvents() {

    const search =
        document.getElementById(
            "bookingSearch"
        );


    if (search) {

        search.addEventListener(
            "input",
            () => {

                currentSearch =
                    search.value;

                renderBookings();

            }
        );

    }


    document
        .querySelectorAll(
            ".booking-filter"
        )
        .forEach(button => {

            button.onclick = () => {

                currentFilter =
                    button.dataset.filter;


                document
                    .querySelectorAll(
                        ".booking-filter"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                renderBookings();

            };

        });

}


/* ==========================================
   BOOKING ACTION EVENTS
========================================== */

function attachBookingEvents() {

    document
        .querySelectorAll(
            ".booking-action"
        )
        .forEach(button => {

            button.onclick = async () => {

                const id =
                    button.dataset.id;

                const action =
                    button.dataset.action;


                try {

                    button.disabled = true;


                    if (
                        action === "accept"
                    ) {

                        await acceptBooking(
                            id
                        );

                    }


                    if (
                        action === "complete"
                    ) {

                        await completeBooking(
                            id
                        );

                    }


                    if (
                        action === "cancel"
                    ) {

                        if (
                            !confirm(
                                "Cancel this booking?"
                            )
                        ) {

                            button.disabled =
                                false;

                            return;

                        }


                        await cancelBooking(
                            id
                        );

                    }


                    if (
                        action === "delete"
                    ) {

                        if (
                            !confirm(
                                "Delete this booking permanently?"
                            )
                        ) {

                            button.disabled =
                                false;

                            return;

                        }


                        await deleteBooking(
                            id
                        );

                    }


                    await loadBookings();


                } catch (error) {

                    console.error(
                        "Booking action failed:",
                        error
                    );


                    alert(
                        "Unable to update the booking. Please try again."
                    );


                    button.disabled =
                        false;

                }

            };

        });


    document
        .querySelectorAll(
            ".booking-view"
        )
        .forEach(button => {

            button.onclick = () => {

                const booking =
                    allBookings.find(
                        item =>
                            item.id ===
                            button.dataset.id
                    );


                if (booking) {

                    showBookingDetails(
                        booking
                    );

                }

            };

        });

}


/* ==========================================
   DETAILS MODAL
========================================== */

function showBookingDetails(
    booking
) {

    const customer =
        booking.customer || {};

    const visit =
        booking.visit || {};

    const status =
        booking.status || "pending";


    closeBookingModal();


    const modal =
        document.createElement(
            "div"
        );


    modal.className =
        "booking-details-modal";


    modal.innerHTML = `

        <div class="booking-details-overlay"></div>


        <div class="booking-details-dialog">

            <div class="booking-details-header">

                <div>

                    <span>
                        Booking Details
                    </span>

                    <h2>
                        ${escapeHtml(
                            booking.service ||
                            "Service"
                        )}
                    </h2>

                </div>


                <button
                    class="booking-modal-close"
                    aria-label="Close">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>


            <div class="booking-details-body">


                <div class="details-status">

                    <span
                        class="booking-status status-${status}">

                        ${formatStatus(status)}

                    </span>

                    <span>
                        #${escapeHtml(
                            booking.id
                        )}
                    </span>

                </div>


                <div class="details-section">

                    <h3>

                        <i class="fa-solid fa-user"></i>

                        Customer

                    </h3>


                    <div class="details-grid">

                        <div>

                            <span>Name</span>

                            <strong>
                                ${escapeHtml(
                                    customer.name ||
                                    "N/A"
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>Phone</span>

                            <strong>
                                ${escapeHtml(
                                    customer.phone ||
                                    "N/A"
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>Email</span>

                            <strong>
                                ${escapeHtml(
                                    customer.email ||
                                    "N/A"
                                )}
                            </strong>

                        </div>

                    </div>

                </div>


                <div class="details-section">

                    <h3>

                        <i class="fa-regular fa-calendar"></i>

                        Visit

                    </h3>


                    <div class="details-grid">

                        <div>

                            <span>Date</span>

                            <strong>
                                ${formatDate(
                                    visit.date
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>Time</span>

                            <strong>
                                ${escapeHtml(
                                    visit.time ||
                                    "N/A"
                                )}
                            </strong>

                        </div>

                    </div>

                </div>


                <div class="details-section">

                    <h3>

                        <i class="fa-solid fa-location-dot"></i>

                        Address

                    </h3>


                    <p class="details-text">

                        ${escapeHtml(
                            booking.address ||
                            "N/A"
                        )}

                    </p>

                </div>


                <div class="details-section">

                    <h3>

                        <i class="fa-solid fa-message"></i>

                        Problem

                    </h3>


                    <p class="details-text">

                        ${escapeHtml(
                            booking.problem ||
                            "No description provided"
                        )}

                    </p>

                </div>


            </div>


            <div class="booking-details-footer">

                ${getModalActions(booking)}

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const close =
        modal.querySelector(
            ".booking-modal-close"
        );


    const overlay =
        modal.querySelector(
            ".booking-details-overlay"
        );


    close.onclick =
        () => closeBookingModal();


    overlay.onclick =
        () => closeBookingModal();

}


/* ==========================================
   MODAL ACTIONS
========================================== */

function getModalActions(booking) {

    if (booking.status === "pending") {

        return `

            <button
                class="booking-action accept modal-action"
                data-action="accept"
                data-id="${booking.id}">

                <i class="fa-solid fa-check"></i>

                Accept Booking

            </button>


            <button
                class="booking-action cancel modal-action"
                data-action="cancel"
                data-id="${booking.id}">

                Cancel

            </button>

        `;

    }


    if (booking.status === "accepted") {

        return `

            <button
                class="booking-action complete modal-action"
                data-action="complete"
                data-id="${booking.id}">

                <i class="fa-solid fa-circle-check"></i>

                Mark Completed

            </button>


            <button
                class="booking-action cancel modal-action"
                data-action="cancel"
                data-id="${booking.id}">

                Cancel

            </button>

        `;

    }


    return `

        <button
            class="booking-action delete modal-action"
            data-action="delete"
            data-id="${booking.id}">

            <i class="fa-solid fa-trash"></i>

            Delete

        </button>

    `;

}


/* ==========================================
   CLOSE MODAL
========================================== */

function closeBookingModal() {

    const modal =
        document.querySelector(
            ".booking-details-modal"
        );


    if (modal) {

        modal.remove();

    }

}


/* ==========================================
   COUNT
========================================== */

function updateBookingCount(
    count
) {

    const element =
        document.getElementById(
            "bookingCount"
        );


    if (element) {

        element.textContent =
            `${count} Booking${
                count === 1
                    ? ""
                    : "s"
            }`;

    }

}


/* ==========================================
   DATE
========================================== */

function formatDate(
    dateString
) {

    if (!dateString) {

        return "N/A";

    }


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ==========================================
   STATUS
========================================== */

function formatStatus(
    status
) {

    const labels = {

        pending: "Pending",

        accepted: "Accepted",

        completed: "Completed",

        cancelled: "Cancelled"

    };


    return (
        labels[status] ||
        status
    );

}


/* ==========================================
   HTML SAFETY
========================================== */

function escapeHtml(
    value
) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}