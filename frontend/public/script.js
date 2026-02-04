const API_BASE = "http://localhost:8000";

let lastSlug = null;

const generate = async () => {
    const url = document.getElementById("urlInput").value;
    const slug = document.getElementById("slugInput").value;
    const resultEl = document.getElementById("result");
    const analyticsEl = document.getElementById("analytics");

    if (!url) {
        resultEl.textContent = "URL is required";
        return;
    }

    resultEl.textContent = "Loading...";
    analyticsEl.textContent = "";

    try {
        const res = await fetch(`${API_BASE}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, slug }),
        });

        const data = await res.json();

        if (!res.ok && res.status !== 409) {
            resultEl.textContent = data.message;
            return;
        }

        lastSlug = data.data.slug;

        resultEl.innerHTML = `
            <a href="${data.data.shortUrl}" target="_blank">
                ${data.data.shortUrl}
            </a>
            <br /><br />
            <button onclick="getAnalytics()">View Analytics</button>
            `;
    } catch (error) {
        resultEl.textContent = "Something went wrong";
    }
};

let chartInstance = null;

const getAnalytics = async () => {
    const analyticsEl = document.getElementById("analytics");

    if (!lastSlug) {
        analyticsEl.textContent = "Generate a short URL first";
        return;
    }

    analyticsEl.textContent = "Loading analytics...";

    try {
        const res = await fetch(`${API_BASE}/${lastSlug}/analytics`);
        const data = await res.json();

        if (!res.ok) {
            analyticsEl.textContent = data.message;
            return;
        }

        const history = data.data.history;
        const clicksByDate = {};

        for (let i = 0; i < history.length; i++) {
            const timestamp = history[i];
            const date = new Date(timestamp).toISOString().split("T")[0];
            clicksByDate[date] = (clicksByDate[date] || 0) + 1;
        }

        const labels = Object.keys(clicksByDate);
        const values = Object.values(clicksByDate);

        analyticsEl.textContent = `Total Clicks: ${data.data.count}`;

        const ctx = document.getElementById("analyticsChart").getContext("2d");

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Clicks per Day",
                        data: values,
                    },
                ],
            },
            options: {
                responsive: false,
            },
        });
    } catch (error) {
        analyticsEl.textContent = "Failed to load analytics";
    }
};
