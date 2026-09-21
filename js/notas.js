function calcularNotaIndividual(aluno) {
  return (aluno.prova1 + aluno.prova2) / 2;
}

function calcularNotaProjeto(aluno) {
  return (aluno.projeto1 + aluno.projeto2) / 2;
}

function calcularMedia(aluno) {
  return calcularNotaIndividual(aluno) * 0.4 + calcularNotaProjeto(aluno) * 0.6;
}

function definirStatus(aluno) {
  const media = calcularMedia(aluno);
  const projeto = calcularNotaProjeto(aluno);

  if (media >= 7) return "Aprovado";
  if (projeto < 4) return "Reprovado";
  if (aluno.notaFinal === null) return "Fará prova final";
  return projeto + aluno.notaFinal >= 7 ? "Aprovado" : "Reprovado";
}

function notaValida(valor) {
  return valor !== "" && !isNaN(valor) && valor >= 0 && valor <= 10;
}