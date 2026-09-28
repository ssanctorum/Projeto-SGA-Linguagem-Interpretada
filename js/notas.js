function calcularNotaIndividual(aluno) {
  return (aluno.prova1 + aluno.prova2) / 2;
}

function calcularNotaProjeto(aluno) {
  return (aluno.projeto1 + aluno.projeto2) / 2;
}

function calcularMedia(aluno) {
  return calcularNotaIndividual(aluno) * 0.4 + calcularNotaProjeto(aluno) * 0.6;
}

function precisaDeFinal(aluno) {
  return calcularMedia(aluno) < 7 && calcularNotaProjeto(aluno) >= 4;
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

const ALUNOS_POR_PAGINA = 6;
let paginaAtual = 1;
let turmaAtual = null;

function renderizarTabela(idTurma, containerId = "conteudo-principal") {
  turmaAtual = turmas.find(t => t.id === idTurma);
  paginaAtual = 1;
  desenharTabela(containerId);
}

function criarCampoNota(aluno, campo) {
  return `<input type="number" min="0" max="10" step="0.1" value="${aluno[campo]}" data-matricula="${aluno.matricula}" data-campo="${campo}">`;
}

function criarCelulaFinal(aluno) {
  if (!precisaDeFinal(aluno)) return "-";
  return `<input type="number" min="0" max="10" step="0.1" value="${aluno.notaFinal ?? ""}" data-matricula="${aluno.matricula}" data-campo="notaFinal">`;
}

function criarLinhaAluno(aluno) {
  return `
    <tr>
      <td>${aluno.matricula}</td>
      <td>${aluno.nome}</td>
      <td>${criarCampoNota(aluno, "prova1")}</td>
      <td>${criarCampoNota(aluno, "prova2")}</td>
      <td>${criarCampoNota(aluno, "projeto1")}</td>
      <td>${criarCampoNota(aluno, "projeto2")}</td>
      <td class="celula-media">${calcularMedia(aluno).toFixed(1)}</td>
      <td class="celula-status">${definirStatus(aluno)}</td>
      <td class="celula-final">${criarCelulaFinal(aluno)}</td>
    </tr>
  `;
}

function criarCabecalhoTabela() {
  return `
    <table>
      <thead>
        <tr>
          <th>Matrícula</th>
          <th>Nome</th>
          <th>P1</th>
          <th>P2</th>
          <th>Proj. F1</th>
          <th>Proj. F2</th>
          <th>Média</th>
          <th>Status</th>
          <th>Final</th>
        </tr>
      </thead>
      <tbody>
  `;
}

function criarControlesPaginacao(totalPaginas) {
  return `
    <div class="paginacao">
      <button type="button" id="pag-anterior" ${paginaAtual === 1 ? "disabled" : ""}>&lt;</button>
      <span>Página ${paginaAtual} de ${totalPaginas}</span>
      <button type="button" id="pag-proximo" ${paginaAtual === totalPaginas ? "disabled" : ""}>&gt;</button>
    </div>
  `;
}

function atualizarLinha(linha, aluno) {
  linha.querySelector(".celula-media").textContent = calcularMedia(aluno).toFixed(1);
  linha.querySelector(".celula-status").textContent = definirStatus(aluno);
  linha.querySelector(".celula-final").innerHTML = criarCelulaFinal(aluno);

  const campoFinal = linha.querySelector('input[data-campo="notaFinal"]');
  if (campoFinal) campoFinal.addEventListener("change", aoEditarNota);
}

function aoEditarNota(evento) {
  const input = evento.target;
  const aluno = turmaAtual.alunos.find(a => a.matricula === input.dataset.matricula);
  const campo = input.dataset.campo;
  const valor = input.value.trim();

  if (campo === "notaFinal" && valor === "") {
    aluno.notaFinal = null;
  } else if (notaValida(valor)) {
    aluno[campo] = Number(valor);
  } else {
    alert("Digite uma nota entre 0 e 10.");
    input.value = aluno[campo] ?? "";
    return;
  }

  if (!precisaDeFinal(aluno)) aluno.notaFinal = null;

  atualizarLinha(input.closest("tr"), aluno);
}

function desenharTabela(containerId) {
  const container = document.getElementById(containerId);
  const totalPaginas = Math.ceil(turmaAtual.alunos.length / ALUNOS_POR_PAGINA);
  const inicio = (paginaAtual - 1) * ALUNOS_POR_PAGINA;
  const fim = inicio + ALUNOS_POR_PAGINA;
  const alunosDaPagina = turmaAtual.alunos.slice(inicio, fim);
  const linhas = alunosDaPagina.map(criarLinhaAluno).join("");

  container.innerHTML = `
    <button type="button" id="voltar-turmas">&lt; Voltar para minhas turmas</button>
    <h2>${turmaAtual.disciplina}</h2>
    <p>${turmaAtual.periodo} - ${turmaAtual.alunos.length} alunos matriculados</p>
    ${criarCabecalhoTabela()}
      ${linhas}
      </tbody>
    </table>
    ${criarControlesPaginacao(totalPaginas)}
  `;

  container.querySelectorAll("input[data-campo]").forEach(input => {
    input.addEventListener("change", aoEditarNota);
  });

  document.getElementById("pag-anterior").addEventListener("click", () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      desenharTabela(containerId);
    }
  });

  document.getElementById("pag-proximo").addEventListener("click", () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      desenharTabela(containerId);
    }
  });
}