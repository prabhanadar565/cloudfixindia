export function renderLayout() {

    const app = document.getElementById("adminApp");

    app.innerHTML = `

<div class="admin-layout">

    <aside class="sidebar">

        <div class="logo">

            <i class="fa-solid fa-cloud"></i>

            <span>CloudFix</span>

        </div>

        <nav>

    <a id="dashboardNav" class="active">
        <i class="fa-solid fa-gauge"></i>
        Dashboard
    </a>

    <a id="reviewsNav">
        <i class="fa-solid fa-star"></i>
        Reviews
    </a>

    <a id="bookingsNav">
        <i class="fa-solid fa-calendar"></i>
        Bookings
    </a>

    <a id="customersNav">
        <i class="fa-solid fa-users"></i>
        Customers
    </a>

    <a id="settingsNav">
        <i class="fa-solid fa-gear"></i>
        Settings
    </a>

    <hr>

    <a id="logoutBtn">
        <i class="fa-solid fa-right-from-bracket"></i>
        Logout
    </a>

</nav>

    </aside>

    <main class="content" id="adminContent">

        <h1>Dashboard</h1>

        <div class="cards">

            <div class="card pending">

                <div class="card-icon">⭐</div>

                <div class="card-info">

                    <h3>Pending Reviews</h3>

                    <h2 id="pendingCard">0</h2>

                    <p>Waiting for approval</p>

                </div>

            </div>

            <div class="card approved">

                <div class="card-icon">✅</div>

                <div class="card-info">

                    <h3>Approved Reviews</h3>

                    <h2 id="approvedCard">0</h2>

                    <p>Visible on website</p>

                </div>

            </div>

            <div class="card rejected">

                <div class="card-icon">❌</div>

                <div class="card-info">

                    <h3>Rejected Reviews</h3>

                    <h2 id="rejectedCard">0</h2>

                    <p>Hidden from website</p>

                </div>

            </div>

        </div>

        <div class="table">

            <div class="table-header">

                <h2>Pending Reviews</h2>

                <span id="pendingCount">0 Reviews</span>

            </div>

            <div id="reviewsTable"></div>

        </div>

    </main>

</div>

`;

}