import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { auth } from "./firebase";

export async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    return await signOut(auth);
}

export function checkAuth(callback) {
    return onAuthStateChanged(auth, callback);
}