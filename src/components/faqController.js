export function initFaq() {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove("active");
            });

            // Open the clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add("active");
            }

        });

    });

}