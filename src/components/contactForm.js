export function initContactForm() {

    const btn = document.getElementById("whatsappSubmit");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value.trim();

        if (!name || !phone) {

            alert("Please enter your Name and Phone Number.");

            return;

        }

        const text =
`Hello CloudFix India,

My Name: ${name}

Phone: ${phone}

Service Required: ${service}

Problem:
${message}

Please contact me.`;

        const url =
`https://wa.me/918097716336?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank");

    });

}