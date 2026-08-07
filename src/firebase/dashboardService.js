import {
    collection,
    getCountFromServer,
    query,
    where
} from "firebase/firestore";

import { db } from "./firebase";

const reviewsRef = collection(db, "reviews");

export async function getDashboardStats() {

    const pending = await getCountFromServer(
        query(reviewsRef, where("status", "==", "pending"))
    );

    const approved = await getCountFromServer(
        query(reviewsRef, where("status", "==", "approved"))
    );

    const rejected = await getCountFromServer(
        query(reviewsRef, where("status", "==", "rejected"))
    );

    return {
        pending: pending.data().count,
        approved: approved.data().count,
        rejected: rejected.data().count
    };

}