import { login, checkAuth } from "../../firebase/auth";

const form = document.getElementById("loginForm");
const error = document.getElementById("loginError");

// If already logged in, go directly to dashboard
checkAuth((user) => {

    if (user) {

        window.location.href = "/admin.html";

    }

});

// Login Form
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    error.textContent = "";

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    try {

        await login(email, password);

        window.location.href = "/admin.html";

    } catch (err) {

        console.error(err);

        error.textContent = "Invalid email or password.";

    }

});