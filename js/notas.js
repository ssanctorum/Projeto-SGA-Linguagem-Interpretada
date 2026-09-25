const SGANotas = (() => {

    const ALUNOS_POR_PAGINA = 5;

    let turmaAtual = null;
    let alunosDaTurma = [];
    let paginaAtual = 1;

    function converterNota(valor) {
        if (valor === null || valor === undefined || valor === "") {
            return null;
        }

        const numero = Number(valor);

        return Number.isFinite(numero) ? numero : null;
    }

    function calcularNotaIndividual(aluno) {
        const prova1 = converterNota(aluno.prova1);
        const prova2 = converterNota(aluno.prova2);

        if (prova1 === null || prova2 === null) {
            return null;
        }

        return (prova1 + prova2) / 2;
    }

    function calcularNotaProjeto(aluno) {
        const projeto1 = converterNota(aluno.projeto1);
        const projeto2 = converterNota(aluno.projeto2);

        if (projeto1 === null || projeto2 === null) {
            return null;
        }

        return (projeto1 + projeto2) / 2;
    }

    function calcularMedia(aluno) {
        const notaIndividual = calcularNotaIndividual(aluno);
        const notaProjeto = calcularNotaProjeto(aluno);

        if (notaIndividual === null || notaProjeto === null) {
            return null;
        }

        return notaIndividual * 0.4 + notaProjeto * 0.6;
    }

    function definirStatus(aluno) {
        const media = calcularMedia(aluno);
        const notaProjeto = calcularNotaProjeto(aluno);
        const notaFinal = converterNota(aluno.notaFinal);

        if (media === null || notaProjeto === null) {
            return "Pendente";
        }

        if (media >= 7) {
            return "Aprovado";
        }

        if (notaProjeto < 4) {
            return "Reprovado";
        }

        if (notaFinal === null) {
            return "Fará prova final";
        }

        return notaProjeto + notaFinal >= 7
            ? "Aprovado"
            : "Reprovado";
    }

    function notaValida(valor) {
        const nota = converterNota(valor);

        return nota !== null && nota >= 0 && nota <= 10;
    }

    function formatarNota(valor) {
        const nota = converterNota(valor);

        return nota === null ? "-" : nota.toFixed(1);
    }

    function obterClasseStatus(status) {
        if (status === "Aprovado") {
            return "status-aprovado";
        }

        if (status === "Reprovado") {
            return "status-reprovado";
        }

        if (status === "Fará prova final") {
            return "status-final";
        }

        return "status-pendente";
    }

    function renderizarTabelaNotas(turmaId) {
        const id = Number(turmaId);

        turmaAtual = turmas.find(turma => turma.id === id);

        if (!turmaAtual) {
            exibirErro("Turma não encontrada.");
            return;
        }

        alunosDaTurma =
            SGAStorage.obterAlunosDaTurma(turmaAtual);

        paginaAtual = 1;

        renderizarPagina();
    }

    function renderizarPagina() {
        const conteudo =
            document.getElementById("conteudo-principal");

        if (!conteudo || !turmaAtual) {
            return;
        }

        const totalPaginas = Math.max(
            1,
            Math.ceil(
                alunosDaTurma.length /
                ALUNOS_POR_PAGINA
            )
        );

        if (paginaAtual > totalPaginas) {
            paginaAtual = totalPaginas;
        }

        const inicio =
            (paginaAtual - 1) * ALUNOS_POR_PAGINA;

        const alunosDaPagina =
            alunosDaTurma.slice(
                inicio,
                inicio + ALUNOS_POR_PAGINA
            );

        conteudo.innerHTML = `
            <section class="cabecalho-conteudo">
                <p class="texto-boas-vindas">
                    Lançamento de notas
                </p>

                <h2>${turmaAtual.disciplina}</h2>

                <p>
                    Período: ${turmaAtual.periodo}
                </p>
            </section>

            <button
                type="button"
                class="botao-voltar-turmas"
                id="botao-voltar-turmas"
            >
                Voltar para minhas turmas
            </button>

            <div class="tabela-notas-container">
                <table class="tabela-notas">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>Prova 1</th>
                            <th>Prova 2</th>
                            <th>Projeto 1</th>
                            <th>Projeto 2</th>
                            <th>Média</th>
                            <th>Status</th>
                            <th>Nota final</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody id="corpo-tabela-notas">
                        ${alunosDaPagina
                            .map(criarLinhaAluno)
                            .join("")}
                    </tbody>
                </table>
            </div>

            <div class="paginacao-notas">
                <button
                    type="button"
                    class="botao-pagina"
                    data-pagina="${paginaAtual - 1}"
                    ${paginaAtual === 1 ? "disabled" : ""}
                >
                    Anterior
                </button>

                <div class="numeros-paginacao">
                    ${criarBotoesDasPaginas(totalPaginas)}
                </div>

                <span>
                    Página ${paginaAtual} de ${totalPaginas}
                </span>

                <button
                    type="button"
                    class="botao-pagina"
                    data-pagina="${paginaAtual + 1}"
                    ${paginaAtual === totalPaginas ? "disabled" : ""}
                >
                    Próxima
                </button>
            </div>
        `;

      function criarBotoesDasPaginas(totalPaginas) {
          let botoes = "";

          for (
              let numeroPagina = 1;
              numeroPagina <= totalPaginas;
              numeroPagina++
          ) {
              const classeAtiva =
                  numeroPagina === paginaAtual
                      ? "pagina-ativa"
                      : "";

              botoes += `
                  <button
                      type="button"
                      class="botao-pagina botao-numero-pagina ${classeAtiva}"
                      data-pagina="${numeroPagina}"
                      aria-label="Ir para a página ${numeroPagina}"
                  >
                      ${numeroPagina}
                  </button>
              `;
          }

          return botoes;
      }

        adicionarEventosDaTabela(totalPaginas);
    }

    function criarLinhaAluno(aluno) {
        const media = calcularMedia(aluno);
        const status = definirStatus(aluno);
        const classeStatus = obterClasseStatus(status);

        const alunoSemFinal = {
            ...aluno,
            notaFinal: null
        };

        const precisaDeFinal =
            definirStatus(alunoSemFinal) ===
            "Fará prova final";

        return `
            <tr data-matricula="${aluno.matricula}">
                <td>${aluno.matricula}</td>

                <td class="nome-aluno">
                    ${aluno.nome}
                </td>

                <td>
                    ${criarCampoNota(
                        "prova1",
                        aluno.prova1
                    )}
                </td>

                <td>
                    ${criarCampoNota(
                        "prova2",
                        aluno.prova2
                    )}
                </td>

                <td>
                    ${criarCampoNota(
                        "projeto1",
                        aluno.projeto1
                    )}
                </td>

                <td>
                    ${criarCampoNota(
                        "projeto2",
                        aluno.projeto2
                    )}
                </td>

                <td class="media-aluno">
                    ${formatarNota(media)}
                </td>

                <td>
                    <span class="status-aluno ${classeStatus}">
                        ${status}
                    </span>
                </td>

                <td>
                    ${criarCampoNota(
                        "notaFinal",
                        aluno.notaFinal,
                        !precisaDeFinal
                    )}
                </td>

                <td>
                    <button
                        type="button"
                        class="botao-salvar-notas"
                        data-matricula="${aluno.matricula}"
                    >
                        Salvar
                    </button>
                </td>
            </tr>
        `;
    }

    function criarCampoNota(campo, valor, desabilitado = false) {
        const nota = converterNota(valor);
        const valorExibido =
            nota === null ? "" : nota;

        return `
            <input
                type="number"
                class="campo-nota"
                data-campo="${campo}"
                value="${valorExibido}"
                min="0"
                max="10"
                step="0.1"
                ${desabilitado ? "disabled" : ""}
            >
        `;
    }

    function adicionarEventosDaTabela(totalPaginas) {
        const botoesSalvar =
            document.querySelectorAll(
                ".botao-salvar-notas"
            );

        botoesSalvar.forEach(botao => {
            botao.addEventListener("click", () => {
                salvarNotasAluno(
                    botao.dataset.matricula
                );
            });
        });

        const botoesPagina =
            document.querySelectorAll(
                ".botao-pagina"
            );

        botoesPagina.forEach(botao => {
            botao.addEventListener("click", () => {
                const novaPagina =
                    Number(botao.dataset.pagina);

                if (
                    novaPagina >= 1 &&
                    novaPagina <= totalPaginas
                ) {
                    paginaAtual = novaPagina;
                    renderizarPagina();
                }
            });
        });

        const botaoVoltar =
            document.getElementById(
                "botao-voltar-turmas"
            );

        if (botaoVoltar) {
            botaoVoltar.addEventListener(
                "click",
                () => {
                    if (
                        typeof renderizarTurmas ===
                        "function"
                    ) {
                        renderizarTurmas();
                    }
                }
            );
        }
    }

    function salvarNotasAluno(matricula) {
        const linha = document.querySelector(
            `tr[data-matricula="${matricula}"]`
        );

        const aluno = alunosDaTurma.find(
            aluno => aluno.matricula === matricula
        );

        if (!linha || !aluno) {
            return;
        }

        const prova1 =
            obterValorDoCampo(linha, "prova1");

        const prova2 =
            obterValorDoCampo(linha, "prova2");

        const projeto1 =
            obterValorDoCampo(linha, "projeto1");

        const projeto2 =
            obterValorDoCampo(linha, "projeto2");

        const notasObrigatorias = [
            prova1,
            prova2,
            projeto1,
            projeto2
        ];

        if (!notasObrigatorias.every(notaValida)) {
            alert(
                "Preencha todas as notas com valores entre 0 e 10."
            );

            return;
        }

        const notasAtualizadas = {
            prova1: converterNota(prova1),
            prova2: converterNota(prova2),
            projeto1: converterNota(projeto1),
            projeto2: converterNota(projeto2),
            notaFinal: null
        };

        const precisaDeFinal =
            definirStatus(notasAtualizadas) ===
            "Fará prova final";

        if (precisaDeFinal) {
            const notaFinal =
                obterValorDoCampo(
                    linha,
                    "notaFinal"
                );

            if (
                notaFinal !== "" &&
                !notaValida(notaFinal)
            ) {
                alert(
                    "A nota final deve estar entre 0 e 10."
                );

                return;
            }

            notasAtualizadas.notaFinal =
                notaFinal === ""
                    ? null
                    : converterNota(notaFinal);
        }

        Object.assign(aluno, notasAtualizadas);

        const salvou =
            SGAStorage.salvarNotasAluno(
                turmaAtual.id,
                aluno.matricula,
                notasAtualizadas
            );

        if (!salvou) {
            alert(
                "Não foi possível salvar as notas."
            );

            return;
        }

        renderizarPagina();
    }

    function obterValorDoCampo(linha, campo) {
        const input = linha.querySelector(
            `[data-campo="${campo}"]`
        );

        return input ? input.value.trim() : "";
    }

    function exibirErro(mensagem) {
        const conteudo =
            document.getElementById(
                "conteudo-principal"
            );

        if (!conteudo) {
            return;
        }

        conteudo.innerHTML = `
            <p class="mensagem-erro-notas">
                ${mensagem}
            </p>
        `;
    }

    return {
        calcularNotaIndividual,
        calcularNotaProjeto,
        calcularMedia,
        definirStatus,
        notaValida,
        renderizarTabelaNotas
    };

})();

function renderizarTabelaNotas(turmaId) {
    SGANotas.renderizarTabelaNotas(turmaId);
}