const professores = [
  {
    id: 1,
    nome: "Ana Paula Menezes",
    email: "ana.menezes@maisunifacisa.com.br",
    senha: "123456",
    disciplinaPrincipal: "Engenharia de Software"
  }
];

const turmas = [
  {
    id: 1,
    disciplina: "Engenharia de Software",
    periodo: "2026.2",
    professorId: 1,
    alunos: [
      { matricula: "2026304501", nome: "Beatriz Andrade Souza",  prova1: 8.5, prova2: 7.0, projeto1: 9.0, projeto2: 8.0, notaFinal: null },
      { matricula: "2026304502", nome: "Carlos Eduardo Lima",    prova1: 5.0, prova2: 4.5, projeto1: 3.0, projeto2: 3.5, notaFinal: null },
      { matricula: "2026304503", nome: "Daniela Ferreira Costa", prova1: 4.0, prova2: 5.5, projeto1: 6.5, projeto2: 6.0, notaFinal: null },
      { matricula: "2026304504", nome: "Eduardo Nascimento",     prova1: 9.0, prova2: 8.5, projeto1: 9.5, projeto2: 9.0, notaFinal: null },
      { matricula: "2026304505", nome: "Fernanda Melo Rocha",    prova1: 4.0, prova2: 3.5, projeto1: 3.0, projeto2: 4.5, notaFinal: null },
      { matricula: "2026304506", nome: "Gustavo Pereira Dias",   prova1: 6.5, prova2: 6.0, projeto1: 5.5, projeto2: 5.0, notaFinal: 6.5 },
      { matricula: "2026304507", nome: "Helena Barbosa Alves",   prova1: 6.0, prova2: 6.0, projeto1: 5.5, projeto2: 5.5, notaFinal: 1.0 },
      { matricula: "2026304508", nome: "Igor Santos Ribeiro",    prova1: 10,  prova2: 9.0, projeto1: 8.0, projeto2: 9.0, notaFinal: null },
      { matricula: "2026304509", nome: "Juliana Martins Prado",  prova1: 7.5, prova2: 6.5, projeto1: 7.0, projeto2: 7.5, notaFinal: null },
      { matricula: "2026304510", nome: "Kaique Oliveira Mendes", prova1: 3.0, prova2: 4.0, projeto1: 2.0, projeto2: 3.0, notaFinal: null },
      { matricula: "2026304511", nome: "Larissa Gomes Teixeira", prova1: 6.5, prova2: 7.0, projeto1: 6.0, projeto2: 6.5, notaFinal: null },
      { matricula: "2026304512", nome: "Mateus Cardoso Lopes",   prova1: 8.0, prova2: 9.0, projeto1: 7.5, projeto2: 8.5, notaFinal: null }
    ]
  },
  {
    id: 2,
    disciplina: "Banco de Dados II",
    periodo: "2026.2",
    professorId: 1,
    alunos: [
      { matricula: "2026305501", nome: "Natália Freitas Rocha", prova1: 7.0, prova2: 8.0, projeto1: 8.0, projeto2: 9.0, notaFinal: null },
      { matricula: "2026305502", nome: "Otávio Lima Duarte",    prova1: 5.5, prova2: 6.0, projeto1: 4.5, projeto2: 5.0, notaFinal: null },
      { matricula: "2026305503", nome: "Paula Ribeiro Neves",   prova1: 2.0, prova2: 3.0, projeto1: 3.0, projeto2: 2.5, notaFinal: null }
    ]
  }
];