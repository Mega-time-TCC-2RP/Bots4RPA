const SetTema = () => {
    let mode = localStorage.getItem('temaApp');
    if (mode === "normal") {
        document.documentElement.classList.toggle("normal")
        document.documentElement.classList.remove("Acromatopsia")
        document.documentElement.classList.remove("Protanopia")
        document.documentElement.classList.remove("Deuteranopia")
        document.documentElement.classList.remove("Tritanopia")
        localStorage.setItem('temaApp', mode);
    }
    else if (mode === "achromatopsia") {
        document.documentElement.classList.toggle("Acromatopsia")
        document.documentElement.classList.remove("default")
        document.documentElement.classList.remove("Protanopia")
        document.documentElement.classList.remove("Deuteranopia")
        document.documentElement.classList.remove("Tritanopia")
        localStorage.setItem('temaApp', mode);
    }
    else if (mode === "protanopia") {
        document.documentElement.classList.toggle("Protanopia")
        document.documentElement.classList.remove("Acromatopsia")
        document.documentElement.classList.remove("default")
        document.documentElement.classList.remove("Deuteranopia")
        document.documentElement.classList.remove("Tritanopia")
        localStorage.setItem('temaApp', mode);
    }
    else if (mode === "deuteranopia") {
        document.documentElement.classList.toggle("Deuteranopia")
        document.documentElement.classList.remove("Acromatopsia")
        document.documentElement.classList.remove("Protanopia")
        document.documentElement.classList.remove("default")
        document.documentElement.classList.remove("Tritanopia")
        localStorage.setItem('temaApp', mode);
    }
    else if (mode === "tritanopia") {
        document.documentElement.classList.toggle("Tritanopia")
        document.documentElement.classList.remove("Acromatopsia")
        document.documentElement.classList.remove("Protanopia")
        document.documentElement.classList.remove("Deuteranopia")
        document.documentElement.classList.remove("default")
        localStorage.setItem('temaApp', mode);
    }
    else {
        document.documentElement.classList.toggle("normal")
        document.documentElement.classList.remove("Acromatopsia")
        document.documentElement.classList.remove("Protanopia")
        document.documentElement.classList.remove("Deuteranopia")
        document.documentElement.classList.remove("Tritanopia")
        localStorage.setItem('temaApp', "normal");
    }
  }
  