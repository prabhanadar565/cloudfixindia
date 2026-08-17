import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../../firebase/firebase";


// ==========================================
// GET CUSTOMERS FROM BOOKINGS
// ==========================================

export async function getCustomers() {

    const bookingsRef =
        collection(db, "bookings");

    const snapshot =
        await getDocs(bookingsRef);


    const customersMap =
        new Map();


    snapshot.forEach((document) => {

        const booking =
            document.data();


        const customerData =
            booking.customer || {};


        const phone =
            customerData.phone?.trim();


        // Phone is the customer identifier
        if (!phone) {
            return;
        }


        // --------------------------------------
        // CREATE CUSTOMER
        // --------------------------------------

        if (!customersMap.has(phone)) {

            customersMap.set(phone, {

                name:
                    customerData.name || "Unknown",

                phone:
                    phone,

                email:
                    customerData.email || "",

                bookings: 0,

                lastBooking:
                    booking.createdAt || null,

                services: []

            });

        }


        const customer =
            customersMap.get(phone);


        // --------------------------------------
        // COUNT BOOKINGS
        // --------------------------------------

        customer.bookings++;


        // --------------------------------------
        // UPDATE EMAIL
        // --------------------------------------

        if (
            !customer.email &&
            customerData.email
        ) {

            customer.email =
                customerData.email;

        }


        // --------------------------------------
        // ADD SERVICE
        // --------------------------------------

        if (
            booking.service &&
            !customer.services.includes(
                booking.service
            )
        ) {

            customer.services.push(
                booking.service
            );

        }


        // --------------------------------------
        // UPDATE LAST BOOKING
        // --------------------------------------

        if (booking.createdAt) {

            if (!customer.lastBooking) {

                customer.lastBooking =
                    booking.createdAt;

            } else {

                const currentSeconds =
                    booking.createdAt.seconds || 0;

                const lastSeconds =
                    customer.lastBooking.seconds || 0;


                if (
                    currentSeconds >
                    lastSeconds
                ) {

                    customer.lastBooking =
                        booking.createdAt;

                }

            }

        }

    });


    return Array.from(
        customersMap.values()
    );

}


// ==========================================
// GET CUSTOMER BOOKING HISTORY
// ==========================================

export async function getCustomerBookings(phone) {

    const bookingsRef =
        collection(db, "bookings");

    const snapshot =
        await getDocs(bookingsRef);


    const bookings = [];


    snapshot.forEach((document) => {

        const booking =
            document.data();


        const customerData =
            booking.customer || {};


        const bookingPhone =
            customerData.phone?.trim();


        // Only include bookings
        // belonging to this customer
        if (
            bookingPhone !==
            phone?.trim()
        ) {

            return;

        }


        bookings.push({

            id:
                document.id,

            name:
                customerData.name || "Unknown",

            phone:
                bookingPhone || "",

            email:
                customerData.email || "",

            service:
                booking.service || "Unknown Service",

            address:
                booking.address || "—",

            problem:
                booking.problem || "—",

            status:
                booking.status || "pending",

            visit:
                booking.visit || {},

            createdAt:
                booking.createdAt || null

        });

    });


    // --------------------------------------
    // NEWEST BOOKING FIRST
    // --------------------------------------

    bookings.sort((a, b) => {

        const dateA =
            a.createdAt?.seconds || 0;

        const dateB =
            b.createdAt?.seconds || 0;


        return dateB - dateA;

    });


    return bookings;

}


// ==========================================
// GET ALL BOOKINGS FOR CUSTOMER STATISTICS
// ==========================================

export async function getCustomerBookingsForStats() {

    const bookingsRef =
        collection(db, "bookings");


    const snapshot =
        await getDocs(bookingsRef);


    const bookings = [];


    snapshot.forEach((document) => {

        const booking =
            document.data();


        bookings.push({

            // ==================================
            // BASIC BOOKING INFORMATION
            // ==================================

            id:
                document.id,


            status:
                booking.status || "pending",


            service:
                booking.service || "",


            createdAt:
                booking.createdAt || null,


            // ==================================
            // PAYMENT INFORMATION
            // ==================================

            paymentAmount:
                Number(
                    booking.paymentAmount
                ) || 0,


            paidAmount:
                Number(
                    booking.paidAmount
                ) || 0,


            paymentStatus:
                booking.paymentStatus || "unpaid",


            paymentMethod:
                booking.paymentMethod || ""

        });

    });


    return bookings;

}