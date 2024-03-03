export function displayImage() {
    const imageUrl = document.getElementById("image_input").value;
    const imageDisplay = document.getElementById("image-display");

    // Set the background image of the div
    imageDisplay.style.backgroundImage = `url('${imageUrl}')`;
}