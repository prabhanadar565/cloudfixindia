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