import { renderServiceStep } from "./stepService";
import { renderCustomerStep } from "./stepCustomer";
import { renderScheduleStep } from "./stepSchedule";
import { renderReviewStep } from "./stepReview";
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

    if (currentStep < 5) {

        currentStep++;

        renderWizard();

    }

}

export function goToStep(step) {

    if (step < 1 || step > 5) return;

    currentStep = step;

    renderWizard();

}

export function previousStep() {

    if (currentStep > 1) {

        currentStep--;

        renderWizard();

    }

}

export function goToSuccess() {

    currentStep = 5;

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

            container.innerHTML = renderReviewStep();

            break;

        case 5:

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

    "Review Booking",

    "Booking Confirmed"

];

    if (title) {

        title.textContent = titles[currentStep];

    }

    if (progress) {

        progress.style.width = `${currentStep * 20}%`;

    }

}