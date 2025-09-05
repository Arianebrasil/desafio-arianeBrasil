const AbrigoAnimais = require("./abrigo-animais");

describe("AbrigoAnimais", () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("deve retornar lista para entrada válida", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,BOLA",
      "BOLA,RATO,LASER",
      "Rex,Fofo"
    );

    expect(resultado.lista).toContain("Rex - pessoa 1"); // cão → vai pra pessoa 1
    expect(resultado.lista).toContain("Fofo - pessoa 2"); // gato → vai pra pessoa 2
  });

  test("deve marcar como abrigo quando ninguém tem os brinquedos", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO",
      "BOLA",
      "Bola" // precisa de CAIXA e NOVELO
    );

    expect(resultado.lista).toContain("Bola - abrigo");
  });

  test("deve dar erro para brinquedo inválido", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,FOGUETE", // FOGUETE não existe
      "BOLA",
      "Rex"
    );

    expect(resultado.erro).toBe("Brinquedo inválido");
  });

  test("deve dar erro para animal inválido", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,BOLA",
      "BOLA,RATO",
      "Tigrão" // não existe na lista
    );

    expect(resultado.erro).toBe("Animal inválido");
  });

  test("não deve aceitar brinquedos duplicados", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,RATO",
      "BOLA",
      "Rex"
    );

    expect(resultado.erro).toBe("Brinquedo inválido");
  });

  test("gato deve ficar no abrigo quando ambos têm todos os brinquedos", () => {
    const resultado = abrigo.encontraPessoas(
      "BOLA,LASER",
      "BOLA,LASER",
      "Mimi" // gato
    );

    expect(resultado.lista).toContain("Mimi - abrigo");
  });

  test("cão deve ir para pessoa 1 quando ambos têm todos os brinquedos", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex" // cão
    );

    expect(resultado.lista).toContain("Rex - pessoa 1");
  });
});
