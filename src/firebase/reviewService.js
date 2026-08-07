import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "./firebase";

const reviewsRef = collection(db, "reviews");

// Get all pending reviews
export async function getPendingReviews() {

    const q = query(
        reviewsRef,
        where("status", "==", "pending")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));

}

// Approve review
export async function approveReview(id) {

    await updateDoc(doc(db, "reviews", id), {
        status: "approved"
    });

}

// Reject review
export async function rejectReview(id) {

    await updateDoc(doc(db, "reviews", id), {
        status: "rejected"
    });

}

// Delete review
export async function deleteReview(id) {

    await deleteDoc(doc(db, "reviews", id));

}