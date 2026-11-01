document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. SLIDER BANNER PRINCIPAL (HERO)
       ========================================== */
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    const autoSlideInterval = 6000; // 6 segundos

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlideIndex = index;
        if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;

        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }

    window.currentSlide = function(index) {
        showSlide(index);
    };

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    let slideTimer = setInterval(nextSlide, autoSlideInterval);

    // Pausar banner ao passar o mouse
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => clearInterval(slideTimer));
        heroSection.addEventListener('mouseleave', () => slideTimer = setInterval(nextSlide, autoSlideInterval));
    }

    /* ==========================================
       2. MENU MOBILE TOGGLE
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    /* ==========================================
       3. INTERATIVIDADE - ÁREAS DE ATUAÇÃO
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
                <p>O trabalho envolve a identificação dos principais riscos, a definição de responsabilidades entre as partes e o acompanhamento das questões jurídicas que surjam ao longo da implementação de cada projeto.</p>
            `
        },
        entretenimento: {
            title: "ENTRETENIMENTO E PUBLICIDADE",
            content: `
                <p>Nossa atuação abrange questões jurídicas relacionadas à publicidade, entretenimento, mídia e indústria criativa, com especial atenção a contratos, direitos autorais, direitos de imagem, propriedade intelectual e regulação do setor.</p>
                <p>Temos expertise em matérias envolvendo a regulação e autorregulação da publicidade e mídia no Brasil, e em disputas perante o Conselho de Ética do CONAR.</p>
                <p>Assessoramos clientes tanto na estruturação e viabilização de campanhas, projetos e parcerias, como na prevenção e solução de conflitos decorrentes dessas atividades.</p>
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
            const data = areasData[areaKey] || {
                title: card.querySelector('h3').innerText.toUpperCase(),
                content: `<p>${card.querySelector('p').innerText}</p><p>Aprofundamento técnico e assessoria completa adaptada às necessidades do cliente.</p>`
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

    /* ==========================================
       4. FORMULÁRIOS (CONTATO E NEWSLETTER)
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Obrigado por entrar em contato! Sua mensagem foi enviada com sucesso.');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('E-mail cadastrado com sucesso na nossa newsletter!');
            newsletterForm.reset();
        });
    }
});