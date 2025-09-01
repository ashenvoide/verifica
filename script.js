// Lista de palavras-chave suspeitas
const palavrasChave = [
  "vacina", "fraude", "golpe", "mentira", "boato", "farsa",
  "cura", "remédio", "milagroso", "secreto", "escondido",
  "conspiração", "terra plana", "manipulado", "roubado",
  "enganar", "enganoso", "proibido", "urgente", "compartilhe",
  "fake", "falso", "fraudado", "ameaça", "escândalo"
];

// Expressões sensacionalistas
const expressoesSuspeitas = [
  "compartilhe já", "antes que apaguem", "não querem que você saiba",
  "espalhe agora", "proibido falar", "cura garantida", "100% seguro",
  "vacina mata", "urnas fraudadas", "nunca fomos à lua"
];

// Fontes confiáveis
const fontesConfiaveis = [
  "g1.globo.com", "bbc.com", "agenciapublica.org",
  "lupa.uol.com.br", "estadao.com.br", "folha.uol.com.br", "cnnbrasil.com.br"
];

// Funções de verificação
function contemPalavraSuspeita(texto) {
  return palavrasChave.some(p => texto.includes(p));
}

function contemExpressaoSuspeita(texto) {
  return expressoesSuspeitas.some(e => texto.includes(e));
}

function contemFonteConfiavel(texto) {
  return fontesConfiaveis.some(f => texto.includes(f));
}

// Função principal
function verificarNoticia() {
  const texto = document.getElementById("noticia").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  if (texto.trim() === "") {
    resultado.innerHTML = "⚠️ Digite ou cole uma notícia para verificar.";
    resultado.style.color = "orange";
    return;
  }

  if (contemFonteConfiavel(texto)) {
    resultado.innerHTML = "✅ Essa notícia parece vir de uma <b>fonte confiável</b>.";
    resultado.style.color = "lightgreen";
  } else if (contemExpressaoSuspeita(texto) || contemPalavraSuspeita(texto)) {
    resultado.innerHTML = "🚨 Essa notícia contém sinais de <b>fake news</b>. Tenha cuidado!";
    resultado.style.color = "red";
  } else {
    resultado.innerHTML = "ℹ️ Não encontramos sinais claros de fake news. Consulte fontes confiáveis.";
    resultado.style.color = "yellow";
  }
}
