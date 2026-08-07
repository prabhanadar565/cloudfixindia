import { openBookingModal } from "./bookingModal";

export function initBookingModal() {

    const bookingButtons = document.querySelectorAll(
        ".book-service, .book-now, #bookServiceBtn"
    );

    console.log("Booking buttons found:", bookingButtons.length);

    bookingButtons.forEach(button => {

        button.addEventListener("click", (e) => {

            e.preventDefault();

            console.log("Book Service button clicked");

            openBookingModal();

        });

    });

}