import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

import { db } from "./firebase";


// ==========================================
// SETTINGS DOCUMENT
// ==========================================

const bookingSettingsRef =
    doc(
        db,
        "settings",
        "booking"
    );


// ==========================================
// GET BOOKING AVAILABILITY
// ==========================================

export async function
getBookingAvailability() {

    try {

        const snapshot =
            await getDoc(
                bookingSettingsRef
            );


        // If the settings document does
        // not exist yet, bookings remain
        // enabled by default.

        if (!snapshot.exists()) {

            return true;

        }


        const data =
            snapshot.data();


        return data.acceptingBookings !== false;


    } catch (error) {

        console.error(
            "Failed to load booking settings:",
            error
        );


        // Fail open so an accidental
        // settings read problem doesn't
        // block your customers.

        return true;

    }

}


// ==========================================
// SAVE BOOKING AVAILABILITY
// ==========================================

export async function
setBookingAvailability(
    acceptingBookings
) {

    await setDoc(
        bookingSettingsRef,
        {
            acceptingBookings:
                Boolean(
                    acceptingBookings
                ),

            updatedAt:
                new Date()
        },
        {
            merge: true
        }
    );

}