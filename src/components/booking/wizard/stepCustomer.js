import {
    bookingData,
    nextStep,
    previousStep
} from "./bookingWizard";

export function renderCustomerStep() {

    return `

<div class="wizard-step">

    <h2>Your Details</h2>

    <p>Please enter your contact information.</p>

    <div class="selected-service-card">

    <div class="selected-service-icon">
        <i class="fa-solid fa-circle-check"></i>
    </div>

    <div>

        <small>Selected Service</small>

        <h3>${bookingData.service}</h3>

    </div>

</div>

    <div class="form-group">

        <label>
            <i class="fa-solid fa-user"></i>
            Full Name
        </label>

        <input
            type="text"
            id="customerName"
            placeholder="Enter your full name"
            value="${bookingData.name}">

    </div>

    <div class="form-group">

        <label>
            <i class="fa-solid fa-phone"></i>
            Mobile Number
        </label>

        <input
            type="tel"
            id="customerPhone"
            placeholder="9876543210"
            value="${bookingData.phone}">

    </div>

    <div class="form-group">

        <label>
            <i class="fa-solid fa-envelope"></i>
            Email (Optional)
        </label>

        <input
            type="email"
            id="customerEmail"
            placeholder="example@email.com"
            value="${bookingData.email}">

    </div>

    <div class="form-group">

        <label>
            <i class="fa-solid fa-location-dot"></i>
            Complete Address
        </label>

        <textarea
            id="customerAddress"
            rows="4"
            placeholder="Enter your address">${bookingData.address}</textarea>

    </div>

    <div class="wizard-buttons">

        <button
            id="customerBackBtn"
            class="wizard-btn secondary">

            ← Change Service

        </button>

        <button
            id="customerNextBtn"
            class="wizard-btn">

            Continue →

        </button>

    </div>

</div>

`;

}

document.addEventListener("click", (e) => {

    if (e.target.id !== "customerNextBtn") return;

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name) {

        alert("Please enter your name.");

        return;

    }

    if (!phone) {

        alert("Please enter your mobile number.");

        return;

    }

    if (!/^[6-9]\d{9}$/.test(phone)) {

        alert("Please enter a valid 10-digit Indian mobile number.");

        return;

    }

    if (!address) {

        alert("Please enter your address.");

        return;

    }

    bookingData.name = name;
    bookingData.phone = phone;
    bookingData.email = email;
    bookingData.address = address;

    nextStep();

});

document.addEventListener("click", (e) => {

    if (e.target.id === "customerBackBtn") {

        previousStep();

    }

});