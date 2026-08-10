import {
    bookingData,
    previousStep,
    nextStep
} from "./bookingWizard";


function getUpcomingDates() {

    const dates = [];

    const today = new Date();

    for (let i = 0; i < 7; i++) {

        const date = new Date(today);

        date.setDate(today.getDate() + i);

        dates.push(date);

    }

    return dates;
}


function formatDateValue(date) {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function getDayName(date) {

    return date.toLocaleDateString("en-IN", {
        weekday: "short"
    });

}


function getMonthName(date) {

    return date.toLocaleDateString("en-IN", {
        month: "short"
    });

}


function getDayNumber(date) {

    return date.getDate();

}


export function renderScheduleStep() {

    const dates = getUpcomingDates();

    const times = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM"
    ];

    return `

<div class="wizard-step schedule-step">

    <h2>Schedule Your Visit</h2>

    <p>
        Choose a preferred date and time for our doorstep service.
    </p>


    <!-- DATE -->

    <div class="schedule-section">

        <div class="schedule-section-title">

            <i class="fa-regular fa-calendar"></i>

            <div>

                <h3>Preferred Date</h3>

                <span>Select a convenient day</span>

            </div>

        </div>


        <div class="date-grid">

            ${dates.map((date, index) => {

                const value = formatDateValue(date);

                const selected =
                    bookingData.date === value
                        ? "selected"
                        : "";

                const todayLabel =
                    index === 0
                        ? "Today"
                        : index === 1
                        ? "Tomorrow"
                        : getDayName(date);

                return `

                <button
                    type="button"
                    class="date-card ${selected}"
                    data-date="${value}">

                    <span class="date-day">
                        ${todayLabel}
                    </span>

                    <strong>
                        ${getDayNumber(date)}
                    </strong>

                    <small>
                        ${getMonthName(date)}
                    </small>

                </button>

                `;

            }).join("")}

        </div>

    </div>


    <!-- TIME -->

    <div class="schedule-section">

        <div class="schedule-section-title">

            <i class="fa-regular fa-clock"></i>

            <div>

                <h3>Preferred Time</h3>

                <span>Select a convenient time</span>

            </div>

        </div>


        <div class="time-grid">

            ${times.map(time => {

                const selected =
                    bookingData.time === time
                        ? "selected"
                        : "";

                return `

                <button
                    type="button"
                    class="time-card ${selected}"
                    data-time="${time}">

                    <i class="fa-regular fa-clock"></i>

                    ${time}

                </button>

                `;

            }).join("")}

        </div>

    </div>


    <!-- PROBLEM -->

    <div class="schedule-section">

        <div class="schedule-section-title">

            <i class="fa-solid fa-message"></i>

            <div>

                <h3>Describe the Issue</h3>

                <span>Tell us briefly what is wrong</span>

            </div>

        </div>


        <textarea
            id="bookingProblem"
            class="schedule-problem"
            rows="5"
            placeholder="Example: Laptop is not turning on, screen is blank, or Windows is showing an error...">${bookingData.problem}</textarea>

    </div>


    <!-- BUTTONS -->

    <div class="wizard-buttons">

        <button
            type="button"
            id="scheduleBackBtn"
            class="wizard-btn secondary">

            ← Back

        </button>


        <button
            type="button"
            id="scheduleNextBtn"
            class="wizard-btn">

            Review Booking →

        </button>

    </div>

</div>

`;

}


/* ===========================
   Date Selection
=========================== */

document.addEventListener("click", (e) => {

    const dateCard = e.target.closest(".date-card");

    if (!dateCard) return;


    document.querySelectorAll(".date-card").forEach(card => {

        card.classList.remove("selected");

    });


    dateCard.classList.add("selected");

    bookingData.date = dateCard.dataset.date;

});


/* ===========================
   Time Selection
=========================== */

document.addEventListener("click", (e) => {

    const timeCard = e.target.closest(".time-card");

    if (!timeCard) return;


    document.querySelectorAll(".time-card").forEach(card => {

        card.classList.remove("selected");

    });


    timeCard.classList.add("selected");

    bookingData.time = timeCard.dataset.time;

});


/* ===========================
   Continue
=========================== */

document.addEventListener("click", (e) => {

    if (e.target.id !== "scheduleNextBtn") return;


    const problem =
        document.getElementById("bookingProblem")
            ?.value.trim();


    if (!bookingData.date) {

        alert("Please select a preferred date.");

        return;

    }


    if (!bookingData.time) {

        alert("Please select a preferred time.");

        return;

    }


    if (!problem) {

        alert("Please describe the problem.");

        return;

    }


    bookingData.problem = problem;


    nextStep();

});


/* ===========================
   Back
=========================== */

document.addEventListener("click", (e) => {

    if (e.target.id === "scheduleBackBtn") {

        previousStep();

    }

});