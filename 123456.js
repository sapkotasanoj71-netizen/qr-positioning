const reader = new Html5Qrcode("camera");
let scannerOn = false;

const btn = document.getElementById("btn");
const mapContainer = document.getElementById("mapContainer");
const marker = document.getElementById("marker");

function toggleScanner() {
    scannerOn = !scannerOn;

    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const item = JSON.parse(text);

            // Show marker on map
            showMarkerAt(item.top, item.left);

            // Show inventory info
            document.getElementById("itemName").innerText =
                "Name: " + item.name;

            document.getElementById("itemStatus").innerText =
                "In store: " + (item.in_store ? "Yes" : "No");

            document.getElementById("itemPrice").innerText =
                "Price: " + item.price + " €";

            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}