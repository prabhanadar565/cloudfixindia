import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
    Timestamp
} from "firebase/firestore";

import { db } from "./firebase";

const bookingRef = collection(db, "bookings");

// --------------------
// Add Booking
// --------------------
export async function addBooking(booking) {

    await addDoc(bookingRef, {

        name: booking.name,

        phone: booking.phone,

        email: booking.email,

        service: booking.service,

        date: booking.date,

        time: booking.time,

        address: booking.address,

        problem: booking.problem,

        status: "pending",

        createdAt: Timestamp.now()

    });

}

// --------------------
// Get Pending Bookings
// --------------------
export async function getPendingBookings() {

    const q = query(

        bookingRef,

        where("status", "==", "pending"),

        orderBy("createdAt", "desc")

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

// --------------------
// Accept Booking
// --------------------
export async function acceptBooking(id) {

    await updateDoc(doc(db, "bookings", id), {

        status: "accepted"

    });

}

// --------------------
// Complete Booking
// --------------------
export async function completeBooking(id) {

    await updateDoc(doc(db, "bookings", id), {

        status: "completed"

    });

}

// --------------------
// Cancel Booking
// --------------------
export async function cancelBooking(id) {

    await updateDoc(doc(db, "bookings", id), {

        status: "cancelled"

    });

}

// --------------------
// Delete Booking
// --------------------
export async function deleteBooking(id) {

    await deleteDoc(doc(db, "bookings", id));

}