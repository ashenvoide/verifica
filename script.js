function checkNews() {
  const text = document.getElementById("newsInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  // Lista de palavras suspeitas
  const fakeKeywords = [
    "urgente", "exclusivo", "milagre", "cura", "segredo",
    "proibido", "não querem que você saiba", "compartilhe já",
    "100%", "garantido", "desmascarado", "golpe", "teoria",
    "revelado", "inacreditável", "censurado"
  ];

  let found = fakeKeywords.some(word => text.includes(word));

  if (found) {
    resultDiv.innerHTML = "🚨 Possível Fake News detectada!";
    resultDiv.style.color = "red";
  } else if (text.trim() === "") {
    resultDiv.innerHTML = "⚠️ Por favor, cole uma notícia para verificar.";
    resultDiv.style.color = "orange";
  } else {
    resultDiv.innerHTML = "✅ Nenhum sinal claro de Fake News encontrado.";
    resultDiv.style.color = "green";
  }
}
