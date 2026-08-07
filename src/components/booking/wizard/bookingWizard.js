import { renderServiceStep } from "./stepService";
import { renderCustomerStep } from "./stepCustomer";
import { renderScheduleStep } from "./stepSchedule";
import { renderSuccessStep } from "./stepSuccess";

export const bookingData = {

    service: "",

    name: "",

    phone: "",

    email: "",

    address: "",

    date: "",

    time: "",

    problem: ""

};

let currentStep = 1;

export function startBookingWizard() {

    currentStep = 1;

    renderWizard();

}

export function nextStep() {

    if (currentStep < 4) {

        currentStep++;

        renderWizard();

    }

}

export function previousStep() {

    if (currentStep > 1) {

        currentStep--;

        renderWizard();

    }

}

export function goToSuccess() {

    currentStep = 4;

    renderWizard();

}

export function renderWizard() {

    const container = document.getElementById("bookingWizardBody");

    if (!container) return;

    switch (currentStep) {

        case 1:

            container.innerHTML = renderServiceStep();

            break;

        case 2:

            container.innerHTML = renderCustomerStep();

            break;

        case 3:

            container.innerHTML = renderScheduleStep();

            break;

        case 4:

            container.innerHTML = renderSuccessStep();

            break;

    }

    updateProgress();

}

function updateProgress() {

    const title = document.getElementById("wizardTitle");

    const progress = document.getElementById("wizardProgress");

    const titles = [

        "",

        "Choose Service",

        "Customer Details",

        "Schedule Visit",

        "Booking Confirmed"

    ];

    if (title) {

        title.textContent = titles[currentStep];

    }

    if (progress) {

        progress.style.width = `${currentStep * 25}%`;

    }

}