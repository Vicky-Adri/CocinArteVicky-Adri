document.addEventListener("DOMContentLoaded", () => {
    // Poner ruta de la imagen
    // "id": "Ruta", (El id es el id del html)
    const recetas = {
        "espagueti-carbonara": "../IMG/espaguetis-carbonara.webp",
        "mojito-fresa": "../IMG/mojito-fresa.webp"
    };

    // Crear contenedor de imagen
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0, 0, 0, 0.8)";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";

    const img = document.createElement("img");
    img.id = "modal-img";
    img.style.maxWidth = "80%";
    img.style.maxHeight = "80%";
    img.style.borderRadius = "10px";
    modal.appendChild(img);

    document.body.appendChild(modal);

    // Mostrar imagen al hacer clic en una receta
    document.querySelectorAll(".receta").forEach(div => {
        div.addEventListener("click", () => {
            const id = div.id;
            if (recetas[id]) {
                img.src = recetas[id];
                modal.style.display = "flex";
            } else {
                alert("Lo sentimos no hemos encontrado la imagen de la receta.");
            }
        });
    });

    // Cerrar imagen al hacer clic en el modal
    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Función de búsqueda de receta
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-btn");
    let highlights = [];
    let currentIndex = -1;

    function resetHighlights() {
        document.querySelectorAll(".highlight").forEach(element => {
            element.classList.remove("highlight");
            element.innerHTML = element.textContent; // Restaurar texto original
        });
        highlights = [];
        currentIndex = -1;
    }

    function highlightMatches(query) {
        resetHighlights();
        if (!query) return;

        const elements = document.body.querySelectorAll("h3, p, li");

        elements.forEach(element => {
            const text = element.textContent;
            const regex = new RegExp(`(${query})`, "gi");
            
            if (regex.test(text)) {
                element.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
                highlights.push(...element.querySelectorAll(".highlight"));
            }
        });
    }

    function searchRecipe() {
        const query = searchInput.value.toLowerCase();
        highlightMatches(query);

        if (highlights.length > 0) {
            currentIndex = 0;
            highlights[currentIndex].scrollIntoView({ behavior: "smooth" });
        } else {
            alert("No se encontró ninguna receta con ese nombre.");
        }
    }

    function moveToNextHighlight() {
        if (highlights.length === 0) return;
        
        currentIndex = (currentIndex + 1) % highlights.length;
        highlights[currentIndex].scrollIntoView({ behavior: "smooth" });
    }

    searchButton.addEventListener("click", searchRecipe);
    
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            if (currentIndex === -1) {
                searchRecipe();
            } else {
                moveToNextHighlight();
            }
        }
    });

    searchInput.addEventListener("input", () => {
        resetHighlights();
    });

    // Botón para subir arriba de la página.
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", () => {
        scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
