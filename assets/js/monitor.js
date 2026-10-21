/* ==========================================================================
   1. DADOS MOCKADOS (Obrigatório)
   Informações fictícias armazenadas diretamente no cliente, sem uso de API.
   ========================================================================== */
const rotas = [
  {
    bairro: "Jardim Verde",
    rua: "Rua das Flores",
    coletas: [
      { tipo: "Lixo comum", dias: ["Segunda", "Quinta"], horario: "08h–10h" },
      { tipo: "Recicláveis", dias: ["Terça"], horario: "14h–16h" }
    ]
  },
  {
    bairro: "Centro",
    rua: "Avenida Central",
    coletas: [
      { tipo: "Lixo comum", dias: ["Segunda", "Quarta", "Sexta"], horario: "07h–09h" },
      { tipo: "Recicláveis", dias: ["Quinta"], horario: "15h–17h" },
      { tipo: "Resíduos especiais", dias: ["Sábado"], horario: "09h–11h" }
    ]
  },
  {
    bairro: "Jardim Goiás",
    rua: "Avenida Jamel Cecílio",
    coletas: [
      { tipo: "Lixo comum", dias: ["Terça", "Quinta", "Sábado"], horario: "19h–21h" },
      { tipo: "Recicláveis", dias: ["Quarta"], horario: "08h–10h" }
    ]
  },
  {
    bairro: "Setor Bueno",
    rua: "Avenida T-63",
    coletas: [
      { tipo: "Lixo comum", dias: ["Segunda", "Quarta", "Sexta"], horario: "20h–22h" },
      { tipo: "Recicláveis", dias: ["Terça", "Quinta"], horario: "14h–16h" },
      { tipo: "Resíduos especiais", dias: ["Sexta"], horario: "09h–12h" }
    ]
  }
];

/* Configuração visual para cada tipo de coleta */
const configTipos = {
  "Lixo comum": { cor: "var(--cor-comum)", icone: "🗑️" },
  "Recicláveis": { cor: "var(--cor-reciclavel)", icone: "♻️" },
  "Resíduos especiais": { cor: "var(--cor-especial)", icone: "⚠️" }
};

/* ==========================================================================
   2. ELEMENTOS DO DOM
   ========================================================================== */
const bairroSelect = document.getElementById("bairroSelect");
const ruaSelect = document.getElementById("ruaSelect");
const checkboxes = document.querySelectorAll('input[name="tipoFiltro"]');
const resultsArea = document.getElementById("resultsArea");

/* ==========================================================================
   3. INICIALIZAÇÃO DOS CAMPOS DE SELEÇÃO
   Extrai bairros únicos do array 'rotas' para popular o primeiro select.
   ========================================================================== */
function inicializarFiltros() {
  // Cria um Set (coleção de valores únicos) com os nomes dos bairros
  const bairrosUnicos = [...new Set(rotas.map(rota => rota.bairro))].sort();

  bairrosUnicos.forEach(bairro => {
    const option = document.createElement("option");
    option.value = bairro;
    option.textContent = bairro;
    bairroSelect.appendChild(option);
  });
}

/* Atualiza as ruas disponíveis sempre que o usuário muda o bairro */
bairroSelect.addEventListener("change", function() {
  const bairroEscolhido = this.value;

  // Reseta e desabilita o select de ruas se nenhum bairro estiver escolhido
  ruaSelect.innerHTML = '<option value="">-- Escolha a rua --</option>';
  if (!bairroEscolhido) {
    ruaSelect.disabled = true;
    renderizarResultados();
    return;
  }

  // Filtra as rotas pelo bairro escolhido e pega as ruas correspondentes
  ruaSelect.disabled = false;
  const rotasDoBairro = rotas.filter(rota => rota.bairro === bairroEscolhido);

  rotasDoBairro.forEach(rota => {
    const option = document.createElement("option");
    option.value = rota.rua;
    option.textContent = rota.rua;
    ruaSelect.appendChild(option);
  });

  renderizarResultados();
});

/* ==========================================================================
   4. FILTRAGEM E RENDERIZAÇÃO DOS RESULTADOS
   Esta função é disparada ao mudar a rua ou ao marcar/desmarcar checkboxes.
   ========================================================================== */
function renderizarResultados() {
  const bairroEscolhido = bairroSelect.value;
  const ruaEscolhida = ruaSelect.value;

  // Limpa os resultados atuais
  resultsArea.innerHTML = "";

  // Verifica se o usuário já selecionou tudo
  if (!bairroEscolhido || !ruaEscolhida) {
    resultsArea.innerHTML = `<div class="message">Selecione um bairro e uma rua para visualizar os horários de coleta.</div>`;
    return;
  }

  // Procura a rota específica no mock de dados
  const rotaEncontrada = rotas.find(r => r.bairro === bairroEscolhido && r.rua === ruaEscolhida);

  // Tratamento para caso a rua não exista no mock (Requisito 3.6)
  if (!rotaEncontrada) {
    resultsArea.innerHTML = `<div class="message">Ainda não temos dados para essa rua. Este é um protótipo com informações fictícias.</div>`;
    return;
  }

  // Descobre quais checkboxes estão marcados
  const tiposAtivos = Array.from(checkboxes)
                           .filter(cb => cb.checked)
                           .map(cb => cb.value);

  // Filtra os dados de coleta (dentro da rota encontrada) baseados nos checkboxes ativos
  const coletasFiltradas = rotaEncontrada.coletas.filter(coleta => tiposAtivos.includes(coleta.tipo));

  // Se filtrou tudo e não sobrou nada, avisa o usuário
  if (coletasFiltradas.length === 0) {
    resultsArea.innerHTML = `<div class="message">Nenhum tipo de coleta selecionado para exibição. Marque as opções acima.</div>`;
    return;
  }

  // Cria os cards (Requisito 3.4) dinamicamente
  coletasFiltradas.forEach(coleta => {
    const config = configTipos[coleta.tipo];

    const card = document.createElement("div");
    card.className = "card";
    // Aplica a borda lateral com a cor correspondente ao tipo (Requisito 3.3)
    card.style.borderLeft = `5px solid ${config.cor}`;

    card.innerHTML = `
      <div class="card-header" style="color: ${config.cor}">
        <span style="font-size: 1.5rem">${config.icone}</span>
        <span>${coleta.tipo}</span>
      </div>
      <div class="card-body">
        <p><strong>Dias:</strong> ${coleta.dias.join(", ")}</p>
        <p><strong>Horário:</strong> ${coleta.horario}</p>
      </div>
    `;

    resultsArea.appendChild(card);
  });
}

// Adiciona os eventos para as interações
ruaSelect.addEventListener("change", renderizarResultados);
checkboxes.forEach(cb => cb.addEventListener("change", renderizarResultados));

// Roda a inicialização ao carregar a página
window.onload = inicializarFiltros;
