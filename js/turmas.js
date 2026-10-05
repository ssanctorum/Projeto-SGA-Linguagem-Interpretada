// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const conteudoPrincipal =
    document.getElementById("conteudo-principal");

const nomeProfessor =
    document.getElementById("nome-professor");

const avatarUsuario =
    document.getElementById("avatar-usuario");

const menuInicio =
    document.getElementById("menu-inicio");

const menuTurmas =
    document.getElementById("menu-turmas");

const menuPerfil =
    document.getElementById("menu-perfil");

const botaoSair =
    document.getElementById("botao-sair");


// ========================================
// INICIALIZAÇÃO DA HOME
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const professorLogado = SGAStorage.obterLogado();

    if (!professorLogado) {
        window.location.href = "index.html";
        return;
    }

    atualizarCabecalho();

    adicionarEventosDoMenu();

    renderizarTurmas();
});


// ========================================
// CRIAÇÃO DAS INICIAIS DO AVATAR
// ========================================

function criarIniciais(nome, sobrenome) {

    const primeiraInicial =
        nome.charAt(0).toUpperCase();

    const segundaInicial =
        sobrenome.charAt(0).toUpperCase();

    return primeiraInicial + segundaInicial;
}


// ========================================
// EVENTOS DO MENU
// ========================================

function adicionarEventosDoMenu() {

    menuInicio.addEventListener(
        "click",
        function () {

            marcarMenuAtivo(menuInicio);

            renderizarTurmas();
        }
    );


    menuTurmas.addEventListener(
        "click",
        function () {

            marcarMenuAtivo(menuTurmas);

            renderizarTurmas();
        }
    );


    menuPerfil.addEventListener(
        "click",
        function () {

            marcarMenuAtivo(menuPerfil);

            renderizarPerfil();
        }
    );


    botaoSair.addEventListener(
        "click",
        function () {

            sairDoSistema();
        }
    );
}


// ========================================
// ITEM ATIVO DO MENU
// ========================================

function marcarMenuAtivo(itemSelecionado) {

    const itensMenu =
        document.querySelectorAll(".item-menu");

    itensMenu.forEach(function (item) {
        item.classList.remove("ativo");
    });

    itemSelecionado.classList.add("ativo");
}


// ========================================
// EXIBIÇÃO DAS TURMAS
// ========================================

function renderizarTurmas() {

    conteudoPrincipal.innerHTML = "";


    const cabecalhoConteudo =
        document.createElement("section");

    cabecalhoConteudo.classList.add(
        "cabecalho-conteudo"
    );


    const textoBoasVindas =
        document.createElement("p");

    textoBoasVindas.classList.add(
        "texto-boas-vindas"
    );

    textoBoasVindas.textContent =
        "Bem-vindo ao Sistema de Gestão Acadêmica";


    const titulo =
        document.createElement("h2");

    titulo.textContent = "Minhas turmas";


    const descricao =
        document.createElement("p");

    descricao.textContent =
        "Selecione uma turma para visualizar os alunos e gerenciar as notas.";


    cabecalhoConteudo.appendChild(
        textoBoasVindas
    );

    cabecalhoConteudo.appendChild(titulo);

    cabecalhoConteudo.appendChild(descricao);


    const listaTurmas =
        document.createElement("section");

    listaTurmas.classList.add("lista-turmas");

    listaTurmas.id = "lista-turmas";


    conteudoPrincipal.appendChild(
        cabecalhoConteudo
    );

    conteudoPrincipal.appendChild(
        listaTurmas
    );


const professor = SGAStorage.obterLogado();

    const turmasDoProfessor = turmas.filter(
        function (turma) {
            return turma.professorId === professor.id;
        }
    );

    if (turmasDoProfessor.length === 0) {

        exibirMensagemSemTurmas(listaTurmas);

        return;
    }


    turmasDoProfessor.forEach(
        function (turma) {

            const cartao =
                criarCartaoTurma(turma);

            listaTurmas.appendChild(cartao);
        }
    );
}


// ========================================
// CRIAÇÃO DE UM CARTÃO
// ========================================

function criarCartaoTurma(turma) {

    const cartao =
        document.createElement("article");

    cartao.classList.add("cartao-turma");


    const titulo =
        document.createElement("h3");

    titulo.textContent = turma.disciplina;


    const periodo =
        document.createElement("p");

    periodo.classList.add(
        "informacao-turma"
    );

    periodo.textContent =
        "Período: " + turma.periodo;


    const codigo =
        document.createElement("p");

    codigo.classList.add(
        "informacao-turma"
    );

    codigo.textContent =
        "Código: " + turma.codigo;


    const quantidadeAlunos =
        document.createElement("p");

    quantidadeAlunos.classList.add(
        "informacao-turma"
    );

    quantidadeAlunos.textContent =
        "Alunos matriculados: " +
        turma.alunos.length;


    const botaoAcessar =
        document.createElement("button");

    botaoAcessar.type = "button";

    botaoAcessar.classList.add(
        "botao-acessar-turma"
    );

    botaoAcessar.textContent =
        "Acessar turma";


    botaoAcessar.addEventListener(
        "click",
        function () {

            abrirTurma(turma.id);
        }
    );


    cartao.appendChild(titulo);

    cartao.appendChild(periodo);

    cartao.appendChild(quantidadeAlunos);

    cartao.appendChild(botaoAcessar);


    return cartao;
}


// ========================================
// ABERTURA DE UMA TURMA
// ========================================

function abrirTurma(turmaId) {

    marcarMenuAtivo(menuTurmas);

    renderizarTabela(turmaId);
}


// ========================================
// MENSAGEM SEM TURMAS
// ========================================

function exibirMensagemSemTurmas(
    elementoLista
) {

    const mensagem =
        document.createElement("p");

    mensagem.classList.add(
        "mensagem-sem-turmas"
    );

    mensagem.textContent =
        "Nenhuma turma foi encontrada para este professor.";

    elementoLista.appendChild(mensagem);
}


// ========================================
// SAÍDA DO SISTEMA
// ========================================

function sairDoSistema() {

    const desejaSair =
        confirm(
            "Deseja realmente sair do sistema?"
        );


    if (desejaSair) {

        /*
            A chave oficial do usuário logado
            será definida pela Pessoa 1.
        */

        SGAStorage.logout();

        localStorage.removeItem(
            "turmaSelecionadaId"
        );

        window.location.href =
            "index.html";
    }
}