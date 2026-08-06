import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";

import { db } from "./firebase";

// Add Review
export async function addReview(review) {

    await addDoc(collection(db, "reviews"), {

        name: review.name,

        city: review.city,

        service: review.service,

        rating: review.rating,

        review: review.review,

        approved: false,

        verified: false,

        createdAt: Timestamp.now()

    });

}

// Get Approved Reviews
export async function getApprovedReviews() {
  const q = query(
    collection(db, "reviews"),
    where("approved", "==", true),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}