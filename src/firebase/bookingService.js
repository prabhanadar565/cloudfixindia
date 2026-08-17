import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "./firebase";


const bookingRef = collection(db, "bookings");


// ==========================================
// Get All Bookings
// ==========================================

export async function getAllBookings() {

    const q = query(
        bookingRef,
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((bookingDoc) => ({

        id: bookingDoc.id,

        ...bookingDoc.data()

    }));

}


// ==========================================
// Get Pending Bookings
// ==========================================

export async function getPendingBookings() {

    const q = query(
        bookingRef,

        where("status", "==", "pending"),

        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((bookingDoc) => ({

        id: bookingDoc.id,

        ...bookingDoc.data()

    }));

}


// ==========================================
// Get Accepted Bookings
// ==========================================

export async function getAcceptedBookings() {

    const q = query(
        bookingRef,

        where("status", "==", "accepted"),

        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((bookingDoc) => ({

        id: bookingDoc.id,

        ...bookingDoc.data()

    }));

}


// ==========================================
// Get Completed Bookings
// ==========================================

export async function getCompletedBookings() {

    const q = query(
        bookingRef,

        where("status", "==", "completed"),

        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((bookingDoc) => ({

        id: bookingDoc.id,

        ...bookingDoc.data()

    }));

}


// ==========================================
// Get Cancelled Bookings
// ==========================================

export async function getCancelledBookings() {

    const q = query(
        bookingRef,

        where("status", "==", "cancelled"),

        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((bookingDoc) => ({

        id: bookingDoc.id,

        ...bookingDoc.data()

    }));

}

// --------------------
// Update Payment
// --------------------
export async function updateBookingPayment(
    id,
    paymentAmount,
    paidAmount,
    paymentMethod
) {

    const amount =
        Number(paymentAmount) || 0;

    const paid =
        Number(paidAmount) || 0;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (amount < 0) {

        throw new Error(
            "Service amount cannot be negative."
        );

    }


    if (paid < 0) {

        throw new Error(
            "Paid amount cannot be negative."
        );

    }


    if (paid > amount) {

        throw new Error(
            "Paid amount cannot be greater than the service amount."
        );

    }


    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    let paymentStatus =
        "unpaid";


    if (
        paid > 0 &&
        paid < amount
    ) {

        paymentStatus =
            "partial";

    }


    if (
        amount > 0 &&
        paid >= amount
    ) {

        paymentStatus =
            "paid";

    }


    // ==========================================
    // SAVE PAYMENT
    // ==========================================

    await updateDoc(

        doc(
            db,
            "bookings",
            id
        ),

        {

            paymentAmount:
                amount,

            paidAmount:
                paid,

            paymentStatus:
                paymentStatus,

            paymentMethod:
                paymentMethod || ""

        }

    );

}


// ==========================================
// Accept Booking
// ==========================================

export async function acceptBooking(id) {

    await updateDoc(

        doc(db, "bookings", id),

        {
            status: "accepted"
        }

    );

}


// ==========================================
// Complete Booking
// ==========================================

export async function completeBooking(id) {

    await updateDoc(

        doc(db, "bookings", id),

        {
            status: "completed"
        }

    );

}


// ==========================================
// Cancel Booking
// ==========================================

export async function cancelBooking(id) {

    await updateDoc(

        doc(db, "bookings", id),

        {
            status: "cancelled"
        }

    );

}


// ==========================================
// Delete Booking
// ==========================================

export async function deleteBooking(id) {

    await deleteDoc(

        doc(db, "bookings", id)

    );

}