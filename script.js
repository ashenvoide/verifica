// Lista de palavras e expressões suspeitas
const palavrasSuspeitas = [
  "fake", "boato", "mentira", "não acredite", "enganar", "golpe",
  "urgente", "compartilhe já", "não deixe de repassar", "antes que apaguem",
  "não querem que você saiba", "espalhe agora", "cuidado", "atenção",
  "governo esconde", "cientistas escondem", "mídia não mostra",
  "grande conspiração", "eles não querem", "segredo revelado",
  "proibido falar", "escondem de você",
  "cura milagrosa", "cura garantida", "tratamento secreto", 
  "remédio caseiro", "cura caseira", "cura natural imediata",
  "vacina causa", "vacina mata", "vacina perigosa",
  "cura em 24 horas", "cura em 7 dias", "100% garantido",
  "fraude eleitoral", "urnas fraudadas", "voto manipulado",
  "eleição roubada", "golpe confirmado", "plano secreto do governo",
  "terra plana", "nunca fomos à lua", "ciência mente",
  "aquecimento global é mentira", "teoria inventada",
  "milagre comprovado", "sinais do fim dos tempos", "profecia revelada",
  "cura espiritual", "revelação divina"
];

// Lista de fontes confiáveis
const fontesConfiaveis = [
  "g1.globo.com",
  "bbc.com",
  "agenciapublica.org",
  "lupa.uol.com.br",
  "estadao.com.br",
  "folha.uol.com.br",
  "cnnbrasil.com.br"
];

// Função para verificar se contém palavras suspeitas
function contemPalavraSuspeita(texto) {
  return palavrasSuspeitas.some(palavra =>
    texto.toLowerCase().includes(palavra.toLowerCase())
  );
}

// Função para verificar se contém fonte confiável
function contemFonteConfiavel(texto) {
  return fontesConfiaveis.some(fonte =>
    texto.toLowerCase().includes(fonte.toLowerCase())
  );
}

// Função principal de verificação
function verificarNoticia() {
  const texto = document.getElementById("noticia").value;
  const resultado = document.getElementById("resultado");

  if (texto.trim() === "") {
    resultado.innerHTML = "⚠️ Digite ou cole uma notícia para verificar.";
    resultado.style.color = "orange";
    return;
  }

  if (contemFonteConfiavel(texto)) {
    resultado.innerHTML = "✅ Essa notícia parece ser de uma <b>fonte confiável</b>.";
    resultado.style.color = "green";
  } else if (contemPalavraSuspeita(texto)) {
    resultado.innerHTML = "🚨 Essa notícia contém sinais de <b>fake news</b>. Tenha cuidado!";
    resultado.style.color = "red";
  } else {
    resultado.innerHTML = "ℹ️ Não encontramos indícios claros de fake news, mas sempre confirme em fontes confiáveis.";
    resultado.style.color = "blue";
  }
}
