function verificarNoticia() {
  const texto = (document.getElementById("noticia").value || "").toLowerCase().trim();
  const resultado = document.getElementById("resultado");

  // 1) checagem rápida: parece notícia?
  if (texto.length < 15 || texto.split(/\s+/).length < 5) {
    resultado.textContent = "ℹ️ Isso não parece ser uma notícia.";
    resultado.style.color = "#ffd54f"; // amarelo
    return;
  }

  // 2) palavras/expressões suspeitas
  const palavrasSuspeitas = [
    // saúde e “milagres”
    "cura milagrosa","remédio secreto","chá milagroso","óleo essencial cura",
    "vacina perigosa","vacina mata","vacina causa autismo","tratamento caseiro",
    // conspirações
    "governo esconde","segredo revelado","plano secreto","nova ordem mundial",
    "controle da mente","chip implantado","ninguém quer que você saiba","compartilhe antes que apaguem",
    // ciência absurda
    "dinossauros vivos","nasa confirma","lua vai cair","buraco negro na terra","fim do mundo",
    // política/eleições
    "urnas fraudadas","eleição roubada","golpe confirmado","fraude confirmada",
    // dinheiro fácil
    "ganhe dinheiro fácil","fique rico rápido","método infalível","pirâmide financeira",
    // outros
    "alienígenas confirmados","terra plana","profecia do apocalipse"
  ];

  let suspeita = palavrasSuspeitas.some(p => texto.includes(p));

  if (suspeita) {
    resultado.textContent = "🚨 Possível Fake News detectada!";
    resultado.style.color = "#ff6b6b"; // vermelho
  } else {
    resultado.textContent = "✅ Não encontramos sinais claros de Fake News.";
    resultado.style.color = "#a3e635"; // verde
  }
}
const palavrasSuspeitas = [
  // Geral
  "fake", "boato", "mentira", "não acredite", "enganar", "golpe",
  
  // Urgência / medo
  "urgente", "compartilhe já", "não deixe de repassar", "antes que apaguem",
  "não querem que você saiba", "espalhe agora", "cuidado", "atenção",
  
  // Conspiração
  "governo esconde", "cientistas escondem", "mídia não mostra",
  "grande conspiração", "eles não querem", "segredo revelado",
  "proibido falar", "escondem de você",
  
  // Saúde / cura falsa
  "cura milagrosa", "cura garantida", "tratamento secreto", 
  "remédio caseiro", "cura caseira", "cura natural imediata",
  "vacina causa", "vacina mata", "vacina perigosa",
  "cura em 24 horas", "cura em 7 dias", "100% garantido",
  
  // Política
  "fraude eleitoral", "urnas fraudadas", "voto manipulado",
  "eleição roubada", "golpe confirmado", "plano secreto do governo",
  
  // Ciência falsa
  "terra plana", "nunca fomos à lua", "ciência mente",
  "aquecimento global é mentira", "teoria inventada",
  
  // Milagres / sobrenatural
  "milagre comprovado", "sinais do fim dos tempos", "profecia revelada",
  "cura espiritual", "revelação divina"
];
const fontesConfiaveis = ["g1.globo.com", "bbc.com", "agenciapublica.org", "lupa.uol.com.br"];

function verificarFonte(texto) {
  return fontesConfiaveis.some(fonte => texto.includes(fonte));
}
