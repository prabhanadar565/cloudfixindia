import {
    collection,
    addDoc,
    Timestamp
} from "firebase/firestore";

import { db } from "./firebase";


export async function createBooking(booking) {

    const bookingRef = await addDoc(
        collection(db, "bookings"),
        {
            service: booking.service,

            customer: {
                name: booking.name,
                phone: booking.phone,
                email: booking.email || ""
            },

            address: booking.address,

            visit: {
                date: booking.date,
                time: booking.time
            },

            problem: booking.problem,

            // ==============================
            // BOOKING STATUS
            // ==============================
            status: "pending",

            // ==============================
            // PAYMENT INFORMATION
            // ==============================
            paymentAmount: 0,
            paidAmount: 0,
            paymentStatus: "unpaid",
            paymentMethod: "",

            // ==============================
            // CREATED TIME
            // ==============================
            createdAt: Timestamp.now()
        }
    );

    return bookingRef.id;
}