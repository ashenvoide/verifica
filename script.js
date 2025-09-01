function verificarNoticia() {
    const texto = document.getElementById("textoNoticia").value.toLowerCase();
    const resultado = document.getElementById("resultado");

    // Lista ampliada de palavras e expressões suspeitas
    const palavrasSuspeitas = [
        // saúde
        "cura milagrosa", "cura imediata", "sem efeitos colaterais", "remédio secreto",
        "vacina perigosa", "vacina mata", "vacina causa autismo", "tratamento caseiro",
        "não tome vacina", "nova doença inventada",

        // política e manipulação
        "governo esconde", "eles não querem que você saiba", "proibido divulgar",
        "mídia comprada", "grande conspiração", "golpe confirmado",

        // ciência
        "terra plana", "cientistas escondem", "teoria proibida",
        "nasa mente", "fim do mundo confirmado",

        // tecnologia
        "chip 5g", "controle da mente", "chip na vacina", "robôs vão dominar",

        // dinheiro e fraude
        "fique rico rápido", "ganhe dinheiro fácil", "t
