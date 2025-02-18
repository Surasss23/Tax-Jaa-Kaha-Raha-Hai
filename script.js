async function fetchPotholeData() {
    const sheetURL = "https://opensheet.elk.sh/13F9eJQD9e2rzZiDJYVvqkkSJLOtAXu1JIV2irvJ_4mk/Sheet1"; 
    try {
        let response = await fetch(sheetURL);
        let data = await response.json();
        updateImageContainer(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateImageContainer(data) {
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = ""; // Purani images clear karo

    data.forEach(entry => {
        const imgBox = document.createElement("div");
        imgBox.classList.add("image-box");

        const img = document.createElement("img");
        img.src = entry.ImageURL; // Google Sheet me "ImageURL" column hona chaiye
        img.alt = "Pothole Image";

        const locationLink = document.createElement("a");
        locationLink.href = entry.LocationURL; // Google Sheet me "LocationURL" column bhi hona chaiye
        locationLink.classList.add("location-btn");
        locationLink.target = "_blank";
        locationLink.textContent = "View Location";

        imgBox.appendChild(img);
        imgBox.appendChild(locationLink);
        imageContainer.appendChild(imgBox);
    });
}

fetchPotholeData();
setInterval(fetchPotholeData, 60000); // Refresh every 60 sec
