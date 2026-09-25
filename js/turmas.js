const conteudoPrincipal = document.getElementById("conteudo-principal");
const menuTurmas = document.getElementById("menu-turmas");
const menuPerfil = document.getElementById("menu-perfil");
const botaoSair = document.getElementById("botao-sair");

document.addEventListener("DOMContentLoaded", function () {
    const professor = SGAStorage.obterLogado();

    if (!professor) {
        window.location.href = "index.html";
        return;
    }

    atualizarCabecalho();
    adicionarEventosDoMenu();
    renderizarTurmas();
});

function adicionarEventosDoMenu() {
    menuTurmas.addEventListener("click", function () {
        marcarMenuAtivo(menuTurmas);
        renderizarTurmas();
    });

    menuPerfil.addEventListener("click", function () {
        marcarMenuAtivo(menuPerfil);
        renderizarPerfil();
    });

    botaoSair.addEventListener("click", sairDoSistema);
}

function marcarMenuAtivo(itemSelecionado) {
    const itensMenu = document.querySelectorAll(".item-menu");

    itensMenu.forEach(function (item) {
        item.classList.remove("ativo");
    });

    itemSelecionado.classList.add("ativo");
}

function obterTurmasDoProfessor() {
    const professor = SGAStorage.obterLogado();

    if (!professor) {
        return [];
    }

    return turmas.filter(function (turma) {
        return turma.professorId === professor.id;
    });
}

function renderizarTurmas() {
    const turmasDoProfessor = obterTurmasDoProfessor();

    conteudoPrincipal.innerHTML = `
        <section class="cabecalho-conteudo">
            <p class="texto-boas-vindas">Bem-vindo ao Sistema de Gestão Acadêmica</p>
            <h2>Minhas turmas</h2>
            <p>Selecione uma turma para visualizar os alunos e gerenciar as notas.</p>
        </section>

        <section class="lista-turmas" id="lista-turmas"></section>
    `;

    const listaTurmas = document.getElementById("lista-turmas");

    if (turmasDoProfessor.length === 0) {
        listaTurmas.innerHTML = `
            <p class="mensagem-sem-turmas">
                Nenhuma turma foi encontrada para este professor.
            </p>
        `;
        return;
    }

    turmasDoProfessor.forEach(function (turma) {
        listaTurmas.appendChild(criarCartaoTurma(turma));
    });
}

function criarCartaoTurma(turma) {
    const cartao = document.createElement("article");
    cartao.className = "cartao-turma";
    cartao.tabIndex = 0;
    cartao.setAttribute("role", "button");

    cartao.innerHTML = `
        <h3>${turma.disciplina}</h3>
        <p class="informacao-turma">Período: ${turma.periodo}</p>
        <p class="informacao-turma">Alunos matriculados: ${turma.alunos.length}</p>
        <button type="button" class="botao-acessar-turma">Acessar turma</button>
    `;

    cartao.addEventListener("click", function () {
        abrirTurma(turma.id);
    });

    cartao.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirTurma(turma.id);
        }
    });

    return cartao;
}

function abrirTurma(turmaId) {
    const turmaSelecionada = obterTurmasDoProfessor().find(function (turma) {
        return turma.id === turmaId;
    });

    if (!turmaSelecionada) {
        alert("Turma não encontrada.");
        return;
    }

    localStorage.setItem("turmaSelecionadaId", turmaSelecionada.id);
    SGANotas.renderizarTabelaNotas(turmaSelecionada.id);
}

function sairDoSistema() {
    const desejaSair = confirm("Deseja realmente sair do sistema?");

    if (!desejaSair) {
        return;
    }

    SGAStorage.logout();
    localStorage.removeItem("turmaSelecionadaId");
    window.location.href = "index.html";
}
