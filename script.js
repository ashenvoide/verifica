function verificarNoticia() {
  const texto = document.getElementById("noticia").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  const suspeitas = ["cura milagrosa", "chip", "veneno", "manipulação"];
  
  let encontrado = suspeitas.find(p => texto.includes(p));

  if (encontrado) {
    resultado.innerHTML = "⚠️ Essa notícia parece suspeita. Pode ser fake news!";
    resultado.style.color = "red";
  } else {
    resultado.innerHTML = "✅ Não encontramos nada suspeito. Mas confirme em fontes confiáveis.";
    resultado.style.color = "green";
  }
}
