// Lista de palavras suspeitas para identificar Fake News
const palavrasSuspeitas = [
  "cura milagrosa", "remédio secreto", "não querem que você saiba",
  "cura do câncer", "cura do hiv", "tratamento caseiro", "chá milagroso",
  "óleo essencial cura", "vacina perigosa", "vacina mata", "vacina causa autismo",
  "governo esconde", "segredo revelado", "plano secreto", "nova ordem mundial",
  "controle da mente", "chip implantado", "illuminati", "grupo secreto", "reunião secreta",
  "lua vai cair", "dinossauros vivos", "fim do mundo", "planeta vai explodir",
  "nasa confirma", "cientistas escondem", "buraco negro na terra",
  "urnas fraudadas", "eleição roubada", "golpe confirmado", "político preso",
  "fraude confirmada", "trama secreta", "corrupção revelada",
  "ganhe dinheiro fácil", "fique rico rápido", "método infalível",
  "pirâmide financeira", "investimento secreto", "dinheiro grátis",
  "terra plana", "alienígenas confirmados", "extraterrestres controlam",
  "fim dos tempos", "profecia bíblica", "profecia do apocalipse"
];

// Função para verificar a notícia digitada
function verificarNoticia() {
  const texto = document.getElementById("noticia").value;
  let resultado = "✅ Parece ser uma notícia confiável.";

  for (let palavra of palavrasSuspeitas) {
    if (texto.toLowerCase().includes(palavra.toLowerCase())) {
      resultado = "⚠️ Possível Fake News detectada!";
      break;
    }
  }

  document.getElementById("resultado").innerText = resultado;
}
