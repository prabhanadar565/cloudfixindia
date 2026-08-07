import {
    bookingData,
    previousStep,
    goToSuccess
} from "./bookingWizard";

export function renderScheduleStep() {

    const today = new Date().toISOString().split("T")[0];

    return `

<div class="wizard-step">

    <h2>Schedule Your Visit</h2>

    <p>Select your preferred date and time.</p>

    <div class="form-group">

        <label>Preferred Date *</label>

        <input
            type="date"
            id="bookingDate"
            min="${today}"
            value="${bookingData.date}">

    </div>

    <div class="form-group">

        <label>Preferred Time *</label>

        <select id="bookingTime">

            <option value="">Select Time</option>

            <option ${bookingData.time === "09:00 AM" ? "selected" : ""}>09:00 AM</option>
            <option ${bookingData.time === "10:00 AM" ? "selected" : ""}>10:00 AM</option>
            <option ${bookingData.time === "11:00 AM" ? "selected" : ""}>11:00 AM</option>
            <option ${bookingData.time === "12:00 PM" ? "selected" : ""}>12:00 PM</option>
            <option ${bookingData.time === "02:00 PM" ? "selected" : ""}>02:00 PM</option>
            <option ${bookingData.time === "03:00 PM" ? "selected" : ""}>03:00 PM</option>
            <option ${bookingData.time === "04:00 PM" ? "selected" : ""}>04:00 PM</option>
            <option ${bookingData.time === "05:00 PM" ? "selected" : ""}>05:00 PM</option>

        </select>

    </div>

    <div class="form-group">

        <label>Describe the Problem *</label>

        <textarea
            id="bookingProblem"
            rows="5"
            placeholder="Example: Laptop is not turning on...">${bookingData.problem}</textarea>

    </div>

    <div class="wizard-buttons">

        <button
            id="scheduleBackBtn"
            class="wizard-btn secondary">

            ← Back

        </button>

        <button
            id="confirmBookingBtn"
            class="wizard-btn">

            📅 Confirm Booking

        </button>

    </div>

</div>

`;

}

document.addEventListener("click", (e) => {

    if (e.target.id === "scheduleBackBtn") {

        previousStep();

    }

});

document.addEventListener("click", (e) => {

    if (e.target.id !== "confirmBookingBtn") return;

    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    const problem = document.getElementById("bookingProblem").value.trim();

    if (!date) {

        alert("Please select a preferred date.");

        return;

    }

    if (!time) {

        alert("Please select a preferred time.");

        return;

    }

    if (!problem) {

        alert("Please describe the problem.");

        return;

    }

    bookingData.date = date;
    bookingData.time = time;
    bookingData.problem = problem;

    // Firebase integration will be added in the next sprint
    goToSuccess();

});