document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. SLIDER HERO ROTATIVO (SOMENTE SE EXISTIR)
       ========================================== */
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    const autoSlideInterval = 6000;

    function showSlide(index) {
        if (totalSlides === 0) return;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlideIndex = index;
        if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;

        slides[currentSlideIndex].classList.add('active');
        if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
    }

    window.currentSlide = function(index) {
        showSlide(index);
    };

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    if (totalSlides > 0) {
        let slideTimer = setInterval(nextSlide, autoSlideInterval);

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(slideTimer));
            heroSection.addEventListener('mouseleave', () => {
                slideTimer = setInterval(nextSlide, autoSlideInterval);
            });
        }
    }

    /* ==========================================
       2. MENU SUSPENSO FLUTUANTE
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const drawerClose = document.getElementById('drawer-close');
    const sideDrawer = document.getElementById('side-drawer');
    const navLinks = document.querySelectorAll('.nav-link');

    function closeMenu() {
        if (sideDrawer) sideDrawer.classList.remove('open');
    }

    if (menuToggle && sideDrawer) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sideDrawer.classList.toggle('open');
        });
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', closeMenu);
    }

    document.addEventListener('click', (e) => {
        if (sideDrawer && sideDrawer.classList.contains('open')) {
            if (!sideDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==========================================
       3. DETALHAMENTO INTERATIVO DAS ÁREAS DE ATUAÇÃO
       ========================================== */
    const areasData = {
        contencioso: {
            title: "CONTENCIOSO E ARBITRAGEM",
            content: `
                <p>O escritório possui sólida experiência na condução de litígios complexos, envolvendo tanto disputas empresariais quanto interesses particulares, com atuação estratégica alinhada aos objetivos do cliente e individualizada em cada caso.</p>
                <p>A experiência acumulada ao longo dos anos é aliada a uma atuação próxima e qualificada perante os Tribunais, em todas as instâncias e fases processuais.</p>
            `
        },
        contratos: {
            title: "CONTRATOS E DESENVOLVIMENTO DE PROJETOS",
            content: `
                <p>Atuamos na elaboração, negociação e revisão de contratos, bem como na estruturação jurídica de projetos, operações e relações empresariais complexas.</p>
                <p>A atuação inclui contratos de prestação de serviços, fornecimento, distribuição, licenciamento, parceria, associação, permuta, desenvolvimento de projetos e outras formas de contratação entre pessoas físicas e jurídicas.</p>
            `
        },
        entretenimento: {
            title: "ENTRETENIMENTO E PUBLICIDADE",
            content: `
                <p>Nossa atuação abrange questões jurídicas relacionadas à publicidade, entretenimento, mídia e indústria criativa, com especial atenção a contratos, direitos autorais, direitos de imagem, propriedade intelectual e regulação do setor.</p>
                <p>Temos expertise em matérias envolvendo a regulação e autorregulação da publicidade e mídia no Brasil, e em disputas perante o Conselho de Ética do CONAR.</p>
            `
        }
    };

    const areaCards = document.querySelectorAll('.area-card');
    const areaDetail = document.getElementById('area-detail');
    const areasGrid = document.getElementById('areas-grid');
    const backBtn = document.getElementById('back-to-areas');
    const areaDetailTitle = document.getElementById('area-detail-title');
    const areaDetailContent = document.getElementById('area-detail-content');

    areaCards.forEach(card => {
        card.addEventListener('click', () => {
            const areaKey = card.getAttribute('data-area');
            const titleText = card.querySelector('h3').innerText.replace(/\n/g, ' ').toUpperCase();
            const data = areasData[areaKey] || {
                title: titleText,
                content: `<p>Atuação consultiva e contenciosa especializada em ${titleText.toLowerCase()}, oferecendo soluções jurídicas estratégicas e personalizadas para cada cliente.</p>`
            };

            areaDetailTitle.innerText = data.title;
            areaDetailContent.innerHTML = data.content;

            areasGrid.style.display = 'none';
            areaDetail.classList.remove('hidden');
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            areaDetail.classList.add('hidden');
            areasGrid.style.display = 'grid';
        });
    }
});