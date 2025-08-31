function verificar() {
  let texto = document.getElementById("texto").value.toLowerCase();
  let resultado = document.getElementById("resultado");

  // lista básica de palavras/expressões suspeitas
  let suspeitas = [
    "urgente", "segredo", "ninguém conta", "proibido", "governo esconde",
    "vacina mata", "cura milagrosa", "veneno", "chip", "cientistas escondem",
    "compartilhe antes que apaguem"
  ];

  if (texto.trim() === "") {
    resultado.innerHTML = "⚠️ Digite um texto para verificar.";
    resultado.className = "resultado-neutro";
    resultado.style.display = "block";
    return;
  }

  // detecta se tem palavras suspeitas
  let encontrou = suspeitas.some(palavra => texto.includes(palavra));

  if (encontrou) {
    resultado.innerHTML = "🚨 Possível Fake News detectada!";
    resultado.className = "resultado-fake";
  } else if (texto.split(" ").length < 5) {
    resultado.innerHTML = "ℹ️ Isso não parece ser uma notícia.";
    resultado.className = "resultado-neutro";
  } else {
    resultado.innerHTML = "✅ Não encontramos sinais de Fake News.";
    resultado.className = "resultado-verdade";
  }

  resultado.style.display = "block";
}
