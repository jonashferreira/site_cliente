const areasData = [
    {
        id: "contencioso",
        title: "Contencioso e Arbitragem",
        description1: "O escritório possui sólida experiência na condução de litígios complexos, envolvendo tanto disputas empresariais quanto interesses particulares, com atuação estratégica alinhada aos objetivos do cliente e individualizada em cada caso.",
        description2: "A experiência acumulada ao longo dos anos é aliada a uma atuação próxima e qualificada perante os Tribunais, em todas as instâncias e fases processuais.",
        highlight: "A experiência acumulada ao longo dos anos é aliada a uma atuação próxima e qualificada perante os Tribunais, em todas as instâncias e fases processuais."
    },
    { id: "contratos", title: "Contratos e Desenvolvimento de Projetos" },
    { id: "consumidor", title: "Consumidor" },
    { id: "entretenimento", title: "Entretenimento e Publicidade" },
    { id: "internet", title: "Internet e IA" },
    { id: "midia", title: "Mídia e Comunicação" },
    { id: "societario", title: "Societário" },
    { id: "sucessoes", title: "Sucessões e Planejamento Patrimonial" },
    { id: "administrativo", title: "Administrativo e Probidade Administrativa" },
    { id: "bancos", title: "Bancos e Serviços Financeiros" },
    { id: "influenciadores", title: "Influenciadores e Artistas" },
    { id: "infraestrutura", title: "Infraestrutura Portuária" },
    { id: "mascs", title: "Métodos Adequados de Solução de Conflitos (MASCs)" },
    { id: "imobiliario", title: "Negócios Imobiliários" },
    { id: "oleo-gas", title: "Óleo e Gás" },
    { id: "dados", title: "Proteção de Dados" },
    { id: "responsabilidade", title: "Responsabilidade Civil" },
    { id: "saude", title: "Saúde" },
    { id: "seguros", title: "Seguro, Resseguro e Previdência Privada" },
    { id: "lorem", title: "Lorem Ipsum" }
];

document.addEventListener("DOMContentLoaded", () => {
    const gridView = document.getElementById("areas-grid-view");
    const gridContainer = document.getElementById("areas-page-grid");
    const detailView = document.getElementById("area-detail-view");
    const backBtn = document.getElementById("area-back-btn");
    const detailTitle = document.getElementById("area-detail-title");
    const detailDesc = document.getElementById("area-detail-desc");
    const detailHighlight = document.getElementById("area-detail-highlight");

    if (!gridContainer || !detailView) return;

    // Renderiza os cards sem classe active fixa
    function renderGrid() {
        gridContainer.innerHTML = "";
        areasData.forEach((area) => {
            const card = document.createElement("div");
            card.className = "area-card";
            card.setAttribute("data-id", area.id);

            card.innerHTML = `
                <span class="card-bar"></span>
                <h3>${area.title.replace(" e ", " e<br>")}</h3>
            `;

            card.addEventListener("click", () => {
                openAreaDetail(area);
            });

            gridContainer.appendChild(card);
        });
    }

    // Abre o detalhe preenchendo textos dinâmicos
    function openAreaDetail(area) {
        detailTitle.textContent = area.title.toUpperCase();

        const p1 = area.description1 || `O escritório possui sólida experiência na condução de litígios complexos e assessoria estratégica em ${area.title}, com atuação alinhada aos objetivos específicos de cada cliente.`;
        const p2 = area.description2 || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

        detailDesc.innerHTML = `<p>${p1}</p><p>${p2}</p>`;

        detailHighlight.textContent = area.highlight || `A experiência acumulada ao longo dos anos é aliada a uma atuação próxima e qualificada perante os Tribunais, em todas as instâncias e fases processuais.`;

        gridView.classList.add("hidden");
        detailView.classList.remove("hidden");
        window.scrollTo({ top: 320, behavior: "smooth" });
    }

    // Retorna para a grade
    function showGrid() {
        detailView.classList.add("hidden");
        gridView.classList.remove("hidden");
        window.scrollTo({ top: 320, behavior: "smooth" });
    }

    if (backBtn) {
        backBtn.addEventListener("click", showGrid);
    }

    renderGrid();

    // Se a URL tiver ?area=contencioso abre direto o item correspondente
    const urlParams = new URLSearchParams(window.location.search);
    const areaParam = urlParams.get("area");
    if (areaParam) {
        const targetArea = areasData.find(a => a.id === areaParam);
        if (targetArea) openAreaDetail(targetArea);
    }
});
