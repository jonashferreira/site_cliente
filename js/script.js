// ==========================================
// 1. CONTROLE DO SLIDER PRINCIPAL (HOME)
// ==========================================
let slideIndex = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll(".hero-slider .slide");
    const dots = document.querySelectorAll(".slider-controls .dot");

    if (!slides.length) return;

    if (index >= slides.length) slideIndex = 0;
    else if (index < 0) slideIndex = slides.length - 1;
    else slideIndex = index;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === slideIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === slideIndex);
    });
}

function currentSlide(index) {
    showSlide(index);
    resetSlideTimer();
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function resetSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
}

// ==========================================
// 2. INICIALIZAÇÃO DO MENU, BUSCA, SLIDER E CONTATO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Iniciar Slider (caso esteja na index.html)
    const slides = document.querySelectorAll(".hero-slider .slide");
    if (slides.length > 0) {
        showSlide(0);
        resetSlideTimer();
    }

    // Controle do Menu Lateral Flutuante (side-drawer)
    const menuToggle = document.getElementById("menu-toggle");
    const sideDrawer = document.getElementById("side-drawer");
    const drawerClose = document.getElementById("drawer-close");

    if (menuToggle && sideDrawer) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            sideDrawer.classList.add("open");
        });
    }

    if (drawerClose && sideDrawer) {
        drawerClose.addEventListener("click", () => {
            sideDrawer.classList.remove("open");
        });
    }

    // Fechar o menu ao clicar fora dele
    document.addEventListener("click", (e) => {
        if (sideDrawer && sideDrawer.classList.contains("open")) {
            if (!sideDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
                sideDrawer.classList.remove("open");
            }
        }
    });

    // Fechar o menu ao pressionar a tecla ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sideDrawer && sideDrawer.classList.contains("open")) {
            sideDrawer.classList.remove("open");
        }
    });

    // Fechar o menu ao clicar em qualquer link de navegação
    document.querySelectorAll(".side-drawer .nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (sideDrawer) sideDrawer.classList.remove("open");
        });
    });

    // Botão de Pesquisa (Lupa no cabeçalho)
    const searchBtn = document.getElementById("search-btn");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const pubSearchInput = document.getElementById("pub-search-input");
            if (pubSearchInput) {
                pubSearchInput.focus();
                pubSearchInput.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                window.location.href = "publicacoes.html";
            }
        });
    }

    // Formulário de Contato (contato.html) - Envio Nativo PHP (Locaweb)
    const contactForm = document.getElementById("contact-form");
    const contactFeedback = document.getElementById("contact-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector(".btn-submit-black");
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "enviando...";
            submitBtn.disabled = true;

            if (contactFeedback) {
                contactFeedback.classList.add("hidden");
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch("enviar.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (contactFeedback) {
                    contactFeedback.textContent = result.message;
                    contactFeedback.classList.remove("hidden");
                }

                if (response.ok && result.status === "success") {
                    contactForm.reset();
                }
            } catch (error) {
                if (contactFeedback) {
                    contactFeedback.textContent = "Não foi possível conectar ao servidor. Tente novamente em instantes.";
                    contactFeedback.classList.remove("hidden");
                }
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});