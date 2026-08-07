import { bookingData, nextStep } from "./bookingWizard";

const services = [
    {
        id: "laptop",
        icon: "fa-solid fa-laptop",
        title: "Laptop Repair",
        description: "Hardware, software & screen issues",
        feature1: "Hardware Repair",
        feature2: "Screen Replacement"
    },
    {
        id: "windows",
        icon: "fa-brands fa-windows",
        title: "Windows Installation",
        description: "Windows 10 & 11 installation",
        feature1: "Driver Installation",
        feature2: "Software Setup"
    },
    {
        id: "desktop",
        icon: "fa-solid fa-desktop",
        title: "Desktop Repair",
        description: "Complete PC diagnostics",
        feature1: "Motherboard Repair",
        feature2: "Performance Check"
    },
    {
        id: "macbook",
        icon: "fa-brands fa-apple",
        title: "MacBook Repair",
        description: "Apple MacBook support",
        feature1: "macOS Support",
        feature2: "Logic Board Repair"
    },
    {
        id: "ssd",
        icon: "fa-solid fa-hard-drive",
        title: "SSD Upgrade",
        description: "Improve speed and performance",
        feature1: "Faster Boot",
        feature2: "Data Migration"
    },
    {
        id: "ram",
        icon: "fa-solid fa-memory",
        title: "RAM Upgrade",
        description: "Increase multitasking performance",
        feature1: "Performance Boost",
        feature2: "Memory Upgrade"
    },
    {
        id: "network",
        icon: "fa-solid fa-network-wired",
        title: "Networking",
        description: "Wi-Fi & LAN setup",
        feature1: "Router Setup",
        feature2: "Wi-Fi Optimization"
    },
    {
        id: "custom",
        icon: "fa-solid fa-screwdriver-wrench",
        title: "Custom PC Build",
        description: "Gaming & workstation PCs",
        feature1: "Gaming PCs",
        feature2: "Workstations"
    }
];

export function renderServiceStep() {

    return `

<div class="wizard-step">

    <h2>Select a Service</h2>

    <p>Choose the service you need.</p>

    <div class="service-grid">

        ${services.map(service => `

        <div
            class="service-card"
            data-service="${service.title}">

            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>

            <h3>${service.title}</h3>

            <p>${service.description}</p>

            <div class="service-tags">

    <span>
        <i class="fa-solid fa-circle-check"></i>
        ${service.feature1}
    </span>

    <span>
        <i class="fa-solid fa-circle-check"></i>
        ${service.feature2}
    </span>

</div>

        </div>

        `).join("")}

    </div>

</div>

`;

}

document.addEventListener("click", (e) => {

    const card = e.target.closest(".service-card");

    if (!card) return;

    document.querySelectorAll(".service-card").forEach(item => {

        item.classList.remove("selected");

    });

    card.classList.add("selected");

    bookingData.service = card.dataset.service;

    // Small animation before going next
    setTimeout(() => {

        nextStep();

    }, 250);

});
