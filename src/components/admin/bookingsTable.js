import {
    getAllBookings,
    acceptBooking,
    completeBooking,
    cancelBooking,
    deleteBooking,
    updateBookingPayment
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

        allBookings =
            await getAllBookings();

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
   BOOKING CONTROLS
========================================== */

function renderBookingControls() {

    const container =
        document.getElementById(
            "bookingsTable"
        );

    if (!container) return;


    container.innerHTML = `

        <div class="booking-controls">

            <div class="booking-search">

                <i class="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    id="bookingSearch"
                    placeholder="Search customer, phone, service or booking ID..."
                    value="${escapeHtml(currentSearch)}"
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
        document.getElementById(
            "bookingResults"
        );

    if (!container) return;


    const filteredBookings =
        allBookings.filter(
            booking => {

                const customer =
                    booking.customer || {};

                const search =
                    currentSearch
                        .toLowerCase()
                        .trim();


                const matchesSearch =
                    !search ||

                    String(
                        booking.id || ""
                    )
                        .toLowerCase()
                        .includes(search) ||

                    String(
                        booking.service || ""
                    )
                        .toLowerCase()
                        .includes(search) ||

                    String(
                        customer.name || ""
                    )
                        .toLowerCase()
                        .includes(search) ||

                    String(
                        customer.phone || ""
                    )
                        .toLowerCase()
                        .includes(search) ||

                    String(
                        customer.email || ""
                    )
                        .toLowerCase()
                        .includes(search);


                const matchesFilter =
                    currentFilter === "all" ||
                    booking.status === currentFilter;


                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );


    if (
        filteredBookings.length === 0
    ) {

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
        filteredBookings
            .map(
                renderBookingCard
            )
            .join("");


    updateBookingCount(
        filteredBookings.length
    );


    attachBookingEvents();
}


/* ==========================================
   BOOKING CARD
========================================== */

function renderBookingCard(
    booking
) {

    const customer =
        booking.customer || {};

    const visit =
        booking.visit || {};

    const status =
        booking.status || "pending";


    // ==========================================
    // PAYMENT SUMMARY
    // ==========================================

    const paymentAmount =
        Number(
            booking.paymentAmount
        ) || 0;


    const paidAmount =
        Number(
            booking.paidAmount
        ) || 0;


    const remainingAmount =
        Math.max(
            0,
            paymentAmount - paidAmount
        );


    let paymentLabel =
        "Unpaid";

    let paymentClass =
        "unpaid";


    if (
        paymentAmount > 0 &&
        paidAmount > 0 &&
        paidAmount < paymentAmount
    ) {

        paymentLabel =
            "Partial";

        paymentClass =
            "partial";

    }


    if (
        paymentAmount > 0 &&
        paidAmount >= paymentAmount
    ) {

        paymentLabel =
            "Paid";

        paymentClass =
            "paid";

    }


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


                <!-- ==================================
                     PAYMENT SUMMARY
                ================================== -->

                <div
                    style="
                        margin-top:12px;
                        display:flex;
                        align-items:center;
                        flex-wrap:wrap;
                        gap:10px;
                        font-size:13px;
                    "
                >

                    <span
                        style="
                            font-weight:700;
                            color:#475569;
                        "
                    >

                        <i class="fa-solid fa-indian-rupee-sign"></i>

                        Payment:

                    </span>


                    <span
                        style="
                            font-weight:700;
                            color:#0f172a;
                        "
                    >

                        ₹${paidAmount}
                        /
                        ₹${paymentAmount}

                    </span>


                    <span
                        style="
                            display:inline-block;
                            padding:4px 10px;
                            border-radius:20px;
                            font-size:11px;
                            font-weight:700;

                            ${
                                paymentClass === "paid"
                                    ? `
                                        background:#dcfce7;
                                        color:#15803d;
                                    `
                                    : paymentClass === "partial"
                                        ? `
                                            background:#fef3c7;
                                            color:#b45309;
                                        `
                                        : `
                                            background:#fee2e2;
                                            color:#b91c1c;
                                        `
                            }
                        "
                    >

                        ${paymentLabel}

                    </span>


                    ${
                        remainingAmount > 0
                            ? `
                                <span
                                    style="
                                        color:#64748b;
                                    "
                                >

                                    ₹${remainingAmount} due

                                </span>
                            `
                            : ""
                    }

                </div>

            </div>


            <div class="booking-side">

                <span
                    class="booking-status status-${status}"
                >

                    ${formatStatus(status)}

                </span>


                <button
                    class="booking-view"
                    data-id="${booking.id}"
                >

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

function getActionButtons(
    booking
) {

    const status =
        booking.status;


    if (
        status === "pending"
    ) {

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


    if (
        status === "accepted"
    ) {

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
        .forEach(
            button => {

                button.onclick = () => {

                    currentFilter =
                        button.dataset.filter;


                    document
                        .querySelectorAll(
                            ".booking-filter"
                        )
                        .forEach(
                            btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    renderBookings();

                };

            }
        );
}


/* ==========================================
   BOOKING ACTION EVENTS
========================================== */

function attachBookingEvents() {

    document
        .querySelectorAll(
            ".booking-action"
        )
        .forEach(
            button => {

                button.onclick =
                    async () => {

                        const id =
                            button.dataset.id;

                        const action =
                            button.dataset.action;


                        try {

                            button.disabled =
                                true;


                            if (
                                action ===
                                "accept"
                            ) {

                                await acceptBooking(
                                    id
                                );

                            }


                            if (
                                action ===
                                "complete"
                            ) {

                                await completeBooking(
                                    id
                                );

                            }


                            if (
                                action ===
                                "cancel"
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
                                action ===
                                "delete"
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

                        } catch (
                            error
                        ) {

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

            }
        );


    document
        .querySelectorAll(
            ".booking-view"
        )
        .forEach(
            button => {

                button.onclick =
                    () => {

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

            }
        );
}


/* ==========================================
   BOOKING DETAILS MODAL
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


    const paymentAmount =
        Number(
            booking.paymentAmount
        ) || 0;


    const paidAmount =
        Number(
            booking.paidAmount
        ) || 0;


    const remainingAmount =
        Math.max(
            0,
            paymentAmount -
            paidAmount
        );


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


                <!-- CUSTOMER -->

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


                <!-- VISIT -->

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


                <!-- ADDRESS -->

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


                <!-- PROBLEM -->

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


                <!-- ==================================
                     PAYMENT
                ================================== -->

                <div
                    class="details-section"
                    style="
                        background:#f8fafc;
                        border:1px solid #e2e8f0;
                        border-radius:14px;
                        padding:18px;
                    "
                >

                    <h3>

                        <i class="fa-solid fa-indian-rupee-sign"></i>

                        Payment

                    </h3>


                    <div
                        style="
                            display:grid;
                            grid-template-columns:
                            repeat(auto-fit,minmax(180px,1fr));
                            gap:14px;
                            margin-top:15px;
                        "
                    >

                        <!-- SERVICE AMOUNT -->

                        <div>

                            <label
                                for="paymentAmount"
                                style="
                                    display:block;
                                    font-weight:600;
                                    margin-bottom:6px;
                                "
                            >
                                Service Amount
                            </label>


                            <input
                                id="paymentAmount"
                                type="number"
                                min="0"
                                step="1"
                                value="${paymentAmount}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #cbd5e1;
                                    border-radius:8px;
                                    font-size:15px;
                                "
                            >

                        </div>


                        <!-- PAID AMOUNT -->

                        <div>

                            <label
                                for="paidAmount"
                                style="
                                    display:block;
                                    font-weight:600;
                                    margin-bottom:6px;
                                "
                            >
                                Amount Paid
                            </label>


                            <input
                                id="paidAmount"
                                type="number"
                                min="0"
                                step="1"
                                value="${paidAmount}"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:11px;
                                    border:1px solid #cbd5e1;
                                    border-radius:8px;
                                    font-size:15px;
                                "
                            >

                        </div>

                    </div>


                    <!-- PAYMENT METHOD -->

                    <div
                        style="
                            margin-top:14px;
                        "
                    >

                        <label
                            for="paymentMethod"
                            style="
                                display:block;
                                font-weight:600;
                                margin-bottom:6px;
                            "
                        >
                            Payment Method
                        </label>


                        <select
                            id="paymentMethod"
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:11px;
                                border:1px solid #cbd5e1;
                                border-radius:8px;
                                font-size:15px;
                                background:white;
                            "
                        >

                            <option
                                value=""
                                ${
                                    !booking.paymentMethod
                                        ? "selected"
                                        : ""
                                }
                            >
                                Select Payment Method
                            </option>


                            <option
                                value="cash"
                                ${
                                    booking.paymentMethod ===
                                    "cash"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Cash
                            </option>


                            <option
                                value="upi"
                                ${
                                    booking.paymentMethod ===
                                    "upi"
                                        ? "selected"
                                        : ""
                                }
                            >
                                UPI
                            </option>


                            <option
                                value="card"
                                ${
                                    booking.paymentMethod ===
                                    "card"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Card
                            </option>


                            <option
                                value="bank"
                                ${
                                    booking.paymentMethod ===
                                    "bank"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Bank Transfer
                            </option>


                            <option
                                value="other"
                                ${
                                    booking.paymentMethod ===
                                    "other"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Other
                            </option>

                        </select>

                    </div>


                    <!-- PAYMENT SUMMARY -->

                    <div
                        style="
                            display:flex;
                            flex-wrap:wrap;
                            gap:25px;
                            align-items:center;
                            margin-top:18px;
                            padding-top:15px;
                            border-top:1px solid #e2e8f0;
                        "
                    >

                        <div>

                            <span
                                style="
                                    display:block;
                                    font-size:13px;
                                    color:#64748b;
                                    margin-bottom:5px;
                                "
                            >
                                Payment Status
                            </span>


                            <strong
                                id="paymentStatusDisplay"
                            >
                                ${getPaymentStatusLabel(
                                    paymentAmount,
                                    paidAmount
                                )}
                            </strong>

                        </div>


                        <div>

                            <span
                                style="
                                    display:block;
                                    font-size:13px;
                                    color:#64748b;
                                    margin-bottom:5px;
                                "
                            >
                                Remaining
                            </span>


                            <strong
                                id="paymentRemaining"
                            >
                                ₹${remainingAmount}
                            </strong>

                        </div>

                    </div>


                    <!-- SAVE PAYMENT -->

                    <button
                        type="button"
                        id="savePaymentBtn"
                        style="
                            margin-top:18px;
                            width:100%;
                            padding:12px 16px;
                            border:none;
                            border-radius:9px;
                            background:#2563eb;
                            color:white;
                            font-size:15px;
                            font-weight:600;
                            cursor:pointer;
                        "
                    >

                        <i class="fa-solid fa-floppy-disk"></i>

                        Save Payment

                    </button>

                </div>

            </div>


            <!-- ACTIONS -->

            <div class="booking-details-footer">

                ${getModalActions(
                    booking
                )}

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    /* ==========================================
       CLOSE BUTTON
    ========================================== */

    const close =
        modal.querySelector(
            ".booking-modal-close"
        );


    const overlay =
        modal.querySelector(
            ".booking-details-overlay"
        );


    close.onclick =
        () => {

            closeBookingModal();

        };


    overlay.onclick =
        () => {

            closeBookingModal();

        };


    /* ==========================================
       PAYMENT LIVE CALCULATION
    ========================================== */

    const amountInput =
        modal.querySelector(
            "#paymentAmount"
        );


    const paidInput =
        modal.querySelector(
            "#paidAmount"
        );


    const statusDisplay =
        modal.querySelector(
            "#paymentStatusDisplay"
        );


    const remainingDisplay =
        modal.querySelector(
            "#paymentRemaining"
        );


    function updatePaymentPreview() {

        const amount =
            Number(
                amountInput.value
            ) || 0;


        const paid =
            Number(
                paidInput.value
            ) || 0;


        const remaining =
            Math.max(
                0,
                amount - paid
            );


        statusDisplay.innerHTML =
            getPaymentStatusLabel(
                amount,
                paid
            );


        remainingDisplay.textContent =
            `₹${remaining}`;

    }


    amountInput.addEventListener(
        "input",
        updatePaymentPreview
    );


    paidInput.addEventListener(
        "input",
        updatePaymentPreview
    );


    /* ==========================================
       SAVE PAYMENT
    ========================================== */

    const savePaymentBtn =
        modal.querySelector(
            "#savePaymentBtn"
        );


    savePaymentBtn.onclick =
        async () => {

            const amount =
                Number(
                    amountInput.value
                ) || 0;


            const paid =
                Number(
                    paidInput.value
                ) || 0;


            const method =
                modal.querySelector(
                    "#paymentMethod"
                ).value;


            if (amount < 0) {

                alert(
                    "Service amount cannot be negative."
                );

                return;
            }


            if (paid < 0) {

                alert(
                    "Paid amount cannot be negative."
                );

                return;
            }


            if (
                paid > amount &&
                amount > 0
            ) {

                alert(
                    "Paid amount cannot be greater than the service amount."
                );

                return;
            }


            try {

                savePaymentBtn.disabled =
                    true;


                savePaymentBtn.innerHTML = `

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Saving...

                `;


                await updateBookingPayment(
                    booking.id,
                    amount,
                    paid,
                    method
                );


                alert(
                    "Payment updated successfully."
                );


                closeBookingModal();


                await loadBookings();

            } catch (error) {

                console.error(
                    "Payment update failed:",
                    error
                );


                alert(
                    "Unable to update payment. Please try again."
                );


                savePaymentBtn.disabled =
                    false;


                savePaymentBtn.innerHTML = `

                    <i class="fa-solid fa-floppy-disk"></i>

                    Save Payment

                `;

            }

        };


    /* ==========================================
       MODAL ACTION BUTTONS
    ========================================== */

    modal
        .querySelectorAll(
            ".modal-action"
        )
        .forEach(
            button => {

                button.onclick =
                    async () => {

                        const id =
                            button.dataset.id;

                        const action =
                            button.dataset.action;


                        try {

                            button.disabled =
                                true;


                            if (
                                action ===
                                "accept"
                            ) {

                                await acceptBooking(
                                    id
                                );

                            }


                            if (
                                action ===
                                "complete"
                            ) {

                                await completeBooking(
                                    id
                                );

                            }


                            if (
                                action ===
                                "cancel"
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
                                action ===
                                "delete"
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


                            closeBookingModal();

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

            }
        );
}


/* ==========================================
   MODAL ACTIONS
========================================== */

function getModalActions(
    booking
) {

    if (
        booking.status ===
        "pending"
    ) {

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


    if (
        booking.status ===
        "accepted"
    ) {

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
   PAYMENT STATUS
========================================== */

function getPaymentStatusLabel(
    amount,
    paid
) {

    amount =
        Number(amount) || 0;

    paid =
        Number(paid) || 0;


    if (
        amount <= 0 ||
        paid <= 0
    ) {

        return `
            <span
                style="
                    display:inline-block;
                    padding:5px 10px;
                    border-radius:20px;
                    background:#fee2e2;
                    color:#b91c1c;
                    font-size:12px;
                    font-weight:700;
                "
            >
                Unpaid
            </span>
        `;

    }


    if (
        paid < amount
    ) {

        return `
            <span
                style="
                    display:inline-block;
                    padding:5px 10px;
                    border-radius:20px;
                    background:#fef3c7;
                    color:#b45309;
                    font-size:12px;
                    font-weight:700;
                "
            >
                Partial
            </span>
        `;

    }


    return `
        <span
            style="
                display:inline-block;
                padding:5px 10px;
                border-radius:20px;
                background:#dcfce7;
                color:#15803d;
                font-size:12px;
                font-weight:700;
            "
        >
            Paid
        </span>
    `;
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

        pending:
            "Pending",

        accepted:
            "Accepted",

        completed:
            "Completed",

        cancelled:
            "Cancelled"

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

    return String(
        value ??
        ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}