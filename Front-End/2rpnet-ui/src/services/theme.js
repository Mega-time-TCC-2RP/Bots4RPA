let form = document.querySelector('.color_mode');

form.addEventListener('change', (e) => {
    let mode = e.target.value;

    if (mode === "normal") {
        document.documentElement.classList.toggle("normal")
    }
    else if (mode === "achromatopsia") {
        document.documentElement.classList.toggle("Acromatopsia")
    }
    else if (mode === "protanopia") {
        document.documentElement.classList.toggle("Protanopia")
    }
    else if (mode === "deuteranopia") {
        document.documentElement.classList.toggle("Deuteranopia")
    }
    else if (mode === "tritanopia") {
        document.documentElement.classList.toggle("Tritanopia")
    }
    else{
        document.documentElement.classList.toggle("normal")
    }
})