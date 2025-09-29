// script.js - Detector reforçado para Verifica
// Requisitos no HTML:
//  - textarea (id="textoNoticia")
//  - div/p para resultado (id="resultado")
//  - (opcional) um elemento para histórico (id="historico") se quiser mostrar

/* ---------------- utilitários ---------------- */
function normalizeText(s) {
  if (!s) return "";
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^\w\s]/g, " ") // remove pontuação, mantém espaços
    .replace(/\s+/g, " ").trim(); // normaliza espaços
}

function countOccurrences(text, pattern) {
  if (!pattern) return 0;
  const re = new RegExp(pattern, "gi");
  const matches = text.match(re);
  return matches ? matches.length : 0;
}

/* ---------------- listas de suspeitas ---------------- */
/* Frases suspeitas (verificadas primeiro) */
const frasesSuspeitas = [
  "cura milagrosa",
  "cura do cancer", "cura do cancer encontrada", "cura do hiv",
  "cura em 24 horas", "cura em 48 horas", "cura garantida",
  "remedio secreto", "remedio secreto da familia",
  "vacina causa autismo", "vacina mata", "vacina perigosa",
  "chip na vacina", "chip 5g", "chip implantado",
  "governo esconde", "segredo revelado", "documento vazado",
  "antes que apaguem", "compartilhe antes que apaguem",
  "não querem que você saiba", "não querem que voce saiba",
  "urna[s]? fraudada[s]?", "eleição roubada", "ganhe dinheiro fácil",
  "fique rico rápido", "método infalível", "metodo infalivel",
  "terra plana", "nasa mente", "cientistas escondem",
  "novo tratamento secreto", "revelação chocante", "exclusivo: ",
  "proibido falar", "proibido divulgar", "corrida para comprar"
];

/* Palavras-chave suspeitas (mais flexíveis) */
const palavrasChave = [
  "cura", "remedio", "milagre", "secreto", "secreto",
  "vacina", "chip", "5g", "conspira", "conspiração", "conspiracao",
  "fraude", "fraudado", "fraudada", "roubo", "roubado",
  "compartilhe", "urgente", "exclusivo", "alarmante", "chocante",
  "inacreditavel", "grande revelacao", "revelacao", "segredo",
  "proibido", "vazou", "vazamento", "vazado", "vazada",
  "garantido", "100%", "comprovado", "comprovada", "garantia",
  "enriquecer", "rico", "ganhar", "ganhe", "dinheiro",
  "piramide", "pirâmide", "piramide", "cura caseira", "tratamento caseiro",
  "fim do mundo", "apocalipse", "extraterrestre", "alienigena", "alienigena",
  "terra plana", "mentira", "boato", "falso", "falso",
  "manipulação", "manipulacao", "manipular", "manipulado",
  "mídia", "midia", "midia comprada", "midia controlada"
];

/* Palavras sensacionalistas (mais pesadas — várias juntas dão sinal) */
const sensacionalistas = [
  "urgente", "compartilhe", "antes que apaguem", "espalhe", "exclusivo",
  "chocante", "inacreditavel", "alarmante", "grande revelacao", "nao conte"
];

/* Fontes confiáveis conhecidas (se o texto citar o domínio, consideramos mais seguro) */
const fontesConfiaveis = [
  "g1.globo.com", "bbc.com", "lupa.uol.com.br", "agenciapublica.org",
  "folha.uol.com.br", "estadao.com.br", "cnnbrasil.com.br", "uol.com.br"
];

/* ---------------- histórica (localStorage) ---------------- */
function saveHistory(entry) {
  try {
    const key = "verifica_history_v1";
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift({ text: entry.text, result: entry.result, when: new Date().toISOString() });
    // mantemos apenas as 30 últimas entradas
    localStorage.setItem(key, JSON.stringify(arr.slice(0, 30)));
  } catch (e) {
    // ignore
    // console.warn("History save failed", e);
  }
}

/* ---------------- funções de detecção ---------------- */
function containsSuspiciousPhrase(normalizedText) {
  for (let p of frasesSuspeitas) {
    const np = normalizeText(p);
    if (np.length === 0) continue;
    if (normalizedText.includes(np)) return { found: true, phrase: p };
  }
  return { found: false };
}

function containsSuspiciousKeyword(normalizedText) {
  for (let k of palavrasChave) {
    const nk = normalizeText(k);
    if (nk.length === 0) continue;
    if (normalizedText.includes(nk)) return { found: true, keyword: k };
  }
  return { found: false };
}

function containsTrustedSource(rawText) {
  const lower = rawText.toLowerCase();
  for (let d of fontesConfiaveis) {
    if (lower.includes(d)) return true;
  }
  return false;
}

function countSensational(normalizedText) {
  let count = 0;
  for (let s of sensacionalistas) {
    if (normalizedText.includes(normalizeText(s))) count++;
  }
  return count;
}

/* ---------------- função principal exposta ---------------- */
function verificarNoticia() {
  const textarea = document.getElementById("textoNoticia") || document.getElementById("noticia") || document.getElementById("newsInput");
  const resultado = document.getElementById("resultado") || document.getElementById("result");

  if (!textarea || !resultado) {
    alert("Erro: elementos esperados não encontrados no HTML. Use id='textoNoticia' e id='resultado'.");
    return;
  }

  const raw = textarea.value || "";
  const normalized = normalizeText(raw);

  // 1) vazio
  if (normalized.length === 0) {
    resultado.innerHTML = "⚠️ Você precisa digitar um texto para analisarmos.";
    resultado.style.background = "transparent";
    resultado.style.color = "#ffd54f";
    resultado.className = "alerta-aviso";
    return;
  }

  // 2) muito curto / não parece notícia
  const wordCount = normalized.split(" ").filter(Boolean).length;
  if (normalized.length < 30 || wordCount < 6) {
    resultado.innerHTML = "🤔 Isso não parece ser uma notícia.";
    resultado.style.background = "transparent";
    resultado.style.color = "#ffd54f";
    resultado.className = "alerta-aviso";
    return;
  }

  // 3) fontes confiáveis (se menciona domínio confiável consideramos mais seguro)
  if (containsTrustedSource(raw)) {
    resultado.innerHTML = "✅ Essa notícia cita uma <b>fonte conhecida</b>. Ainda confirme, mas é um bom sinal.";
    resultado.style.background = "#b7e4c7";
    resultado.style.color = "#064e3b";
    resultado.className = "alerta-verdade";
    saveHistory({ text: raw, result: "fonte confiavel" });
    return;
  }

  // 4) frases suspeitas (checamos primeiro)
  const phraseCheck = containsSuspiciousPhrase(normalized);
  if (phraseCheck.found) {
    resultado.innerHTML = `🚨 Possível Fake News detectada (frase suspeita: "${phraseCheck.phrase}").`;
    resultado.style.background = "#ff6b6b";
    resultado.style.color = "#111";
    resultado.className = "alerta-fake";
    saveHistory({ text: raw, result: "suspeita (frase)" });
    return;
  }

  // 5) palavras-chave + sensacionalismo
  const keywordCheck = containsSuspiciousKeyword(normalized);
  const sensCount = countSensational(normalized);

  // se tiver palavra-chave forte
  if (keywordCheck.found && sensCount >= 1) {
    resultado.innerHTML = `🚨 Possível Fake News detectada (palavra: "${keywordCheck.keyword}" + linguagem sensacionalista).`;
    resultado.style.background = "#ff6b6b";
    resultado.style.color = "#111";
    resultado.className = "alerta-fake";
    saveHistory({ text: raw, result: "suspeita (keyword+sensacionalismo)" });
    return;
  }

  // se tiver muitas palavras sensacionalistas sozinhas
  if (sensCount >= 2) {
    resultado.innerHTML = "🚨 Possível Fake News detectada (linguagem sensacionalista identificada).";
    resultado.style.background = "#ff6b6b";
    resultado.style.color = "#111";
    resultado.className = "alerta-fake";
    saveHistory({ text: raw, result: "suspeita (sensacionalismo)" });
    return;
  }

  // 6) heurística: muitas letras maiúsculas (gritos) ou vários "!"
  const capsCount = (raw.match(/[A-ZÀ-Ú]/g) || []).length;
  const capsRatio = capsCount / Math.max(1, raw.length);
  const exclams = (raw.match(/!/g) || []).length;
  if (capsRatio > 0.12 || exclams >= 3) {
    resultado.innerHTML = "🚨 Possível Fake News detectada (tom sensacionalista / 'GRITO').";
    resultado.style.background = "#ff6b6b";
    resultado.style.color = "#111";
    resultado.className = "alerta-fake";
    saveHistory({ text: raw, result: "suspeita (caps/exclamacao)" });
    return;
  }

  // 7) se chegou aqui, achar provável confiável (mas sempre avisar)
  resultado.innerHTML = "✅ Não encontramos sinais claros de fake news — confirme em fontes confiáveis.";
  resultado.style.background = "#b7e4c7";
  resultado.style.color = "#064e3b";
  resultado.className = "alerta-verdade";
  saveHistory({ text: raw, result: "provavel confiavel" });
}

/* ---------------- função para trocar de tela (usada pelos botões) ---------------- */
function irPara(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  const el = document.getElementById(id);
  if (el) el.classList.add("ativa");
}

/* ---------------- export (útil para devtools) ---------------- */
window.__VERIFICA = {
  verificarNoticia,
  normalizeText,
  frasesSuspeitas,
  palavrasChave,
  sensacionalistas
};
