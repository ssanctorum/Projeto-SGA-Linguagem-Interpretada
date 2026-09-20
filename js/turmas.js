// ========================================
// DADOS TEMPORÁRIOS PARA TESTE
// ========================================

/*
    Estes dados estão temporariamente neste arquivo
    para que a Home possa ser testada enquanto o
    dados.js ainda está vazio.

    Depois, substituiremos esta lista pelos dados
    oficiais definidos pelo grupo.
*/

const turmasTemporarias = [
    {
        id: 1,
        disciplina: "Linguagem de Programação",
        periodo: "2026.2",
        codigo: "LP001",
        quantidadeAlunos: 30
    },
    {
        id: 2,
        disciplina: "Banco de Dados",
        periodo: "2026.2",
        codigo: "BD001",
        quantidadeAlunos: 25
    },
    {
        id: 3,
        disciplina: "Engenharia de Software",
        periodo: "2026.2",
        codigo: "ES001",
        quantidadeAlunos: 28
    }
];


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

    exibirProfessorTemporario();

    adicionarEventosDoMenu();

    renderizarTurmas();
});


// ========================================
// PROFESSOR TEMPORÁRIO
// ========================================

function exibirProfessorTemporario() {

    /*
        Este nome será substituído posteriormente
        pelo professor salvo durante o login.
    */

    const professorTemporario = {
        nome: "Professor",
        sobrenome: "Exemplo"
    };

    const nomeCompleto =
        professorTemporario.nome +
        " " +
        professorTemporario.sobrenome;

    nomeProfessor.textContent = nomeCompleto;

    avatarUsuario.textContent =
        criarIniciais(
            professorTemporario.nome,
            professorTemporario.sobrenome
        );
}


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

            exibirPerfilTemporario();
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


    if (turmasTemporarias.length === 0) {

        exibirMensagemSemTurmas(listaTurmas);

        return;
    }


    turmasTemporarias.forEach(
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
        turma.quantidadeAlunos;


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

    cartao.appendChild(codigo);

    cartao.appendChild(quantidadeAlunos);

    cartao.appendChild(botaoAcessar);


    return cartao;
}


// ========================================
// ABERTURA DE UMA TURMA
// ========================================

function abrirTurma(turmaId) {

    const turmaSelecionada =
        turmasTemporarias.find(
            function (turma) {

                return turma.id === turmaId;
            }
        );


    if (!turmaSelecionada) {

        alert("Turma não encontrada.");

        return;
    }


    /*
        Guarda temporariamente qual turma
        foi escolhida.

        A Pessoa 3 poderá usar essa informação
        para carregar a tabela de notas.
    */

    localStorage.setItem(
        "turmaSelecionadaId",
        turmaSelecionada.id
    );


    conteudoPrincipal.innerHTML = "";


    const secaoTurma =
        document.createElement("section");

    secaoTurma.classList.add(
        "cabecalho-conteudo"
    );


    const textoTurma =
        document.createElement("p");

    textoTurma.classList.add(
        "texto-boas-vindas"
    );

    textoTurma.textContent =
        "Turma selecionada";


    const tituloTurma =
        document.createElement("h2");

    tituloTurma.textContent =
        turmaSelecionada.disciplina;


    const informacoesTurma =
        document.createElement("p");

    informacoesTurma.textContent =
        "Período: " +
        turmaSelecionada.periodo +
        " | Código: " +
        turmaSelecionada.codigo;


    const mensagemIntegracao =
        document.createElement("p");

    mensagemIntegracao.classList.add(
        "mensagem-carregamento"
    );

    mensagemIntegracao.textContent =
        "A tabela de notas será exibida nesta área após a integração com notas.js.";


    const botaoVoltar =
        document.createElement("button");

    botaoVoltar.type = "button";

    botaoVoltar.classList.add(
        "botao-acessar-turma"
    );

    botaoVoltar.textContent =
        "Voltar para minhas turmas";


    botaoVoltar.addEventListener(
        "click",
        function () {

            marcarMenuAtivo(menuTurmas);

            renderizarTurmas();
        }
    );


    secaoTurma.appendChild(textoTurma);

    secaoTurma.appendChild(tituloTurma);

    secaoTurma.appendChild(
        informacoesTurma
    );


    conteudoPrincipal.appendChild(
        secaoTurma
    );

    conteudoPrincipal.appendChild(
        mensagemIntegracao
    );

    conteudoPrincipal.appendChild(
        botaoVoltar
    );
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
// PERFIL TEMPORÁRIO
// ========================================

function exibirPerfilTemporario() {

    conteudoPrincipal.innerHTML = "";


    const secaoPerfil =
        document.createElement("section");

    secaoPerfil.classList.add(
        "cabecalho-conteudo"
    );


    const textoPerfil =
        document.createElement("p");

    textoPerfil.classList.add(
        "texto-boas-vindas"
    );

    textoPerfil.textContent =
        "Dados do professor";


    const tituloPerfil =
        document.createElement("h2");

    tituloPerfil.textContent =
        "Meu perfil";


    const mensagemPerfil =
        document.createElement("p");

    mensagemPerfil.classList.add(
        "mensagem-carregamento"
    );

    mensagemPerfil.textContent =
        "O perfil será exibido nesta área após a integração com perfil.js.";


    secaoPerfil.appendChild(textoPerfil);

    secaoPerfil.appendChild(tituloPerfil);


    conteudoPrincipal.appendChild(
        secaoPerfil
    );

    conteudoPrincipal.appendChild(
        mensagemPerfil
    );
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

        localStorage.removeItem(
            "usuarioLogadoId"
        );

        localStorage.removeItem(
            "turmaSelecionadaId"
        );

        window.location.href =
            "index.html";
    }
}