class AbrigoAnimais {
  constructor() {
    this.animais = [
      { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    ];
    this.validosBrinquedos = ['RATO', 'BOLA', 'LASER', 'NOVELO', 'CAIXA', 'SKATE'];
  }

  encontraPessoas(brinqP1, brinqP2, ordem) {
    const pessoa1 = brinqP1.split(',').map(b => b.trim());
    const pessoa2 = brinqP2.split(',').map(b => b.trim());
    const ordemAnimais = ordem.split(',').map(a => a.trim());

    const isBrinqInvalido = arr => arr.some(b => !this.validosBrinquedos.includes(b));
    if (isBrinqInvalido(pessoa1) || isBrinqInvalido(pessoa2)) {
      return { erro: "Brinquedo inválido" };
    }

    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
      return { erro: "Brinquedo inválido" };
    }

    let lista = [];

    for (let nome of ordemAnimais) {
      const animal = this.animais.find(a => a.nome === nome);
      if (!animal) return { erro: "Animal inválido" };

      const pessoa1TemTodos = animal.brinquedos.every(b => pessoa1.includes(b));
      const pessoa2TemTodos = animal.brinquedos.every(b => pessoa2.includes(b));

      // Ambos têm os brinquedos
      if (pessoa1TemTodos && pessoa2TemTodos) {
        if (animal.tipo === 'gato') {
          lista.push(`${nome} - abrigo`); // gatos ficam no abrigo
        } else {
          lista.push(`${nome} - pessoa 1`); // cães e outros → pessoa 1 tem preferência
        }
        continue;
      }

      // Só pessoa 1 tem os brinquedos
      if (pessoa1TemTodos) {
        lista.push(`${nome} - pessoa 1`);
        continue;
      }

      // Só pessoa 2 tem os brinquedos
      if (pessoa2TemTodos) {
        lista.push(`${nome} - pessoa 2`);
        continue;
      }

      // Ninguém tem → fica no abrigo
      lista.push(`${nome} - abrigo`);
    }

    return { lista };
  }
}

module.exports = AbrigoAnimais;
