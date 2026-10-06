// Garante que a lista de professores comece com o mock, se ainda não existir
function iniciarProfessores() {
    if (SGAStorage.listarProfessores().length === 0) {
        SGAStorage.salvarProfessores(professores);
    }
}

iniciarProfessores();


// PARTE 1: LOGIN
const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const emailDigitado = document.getElementById('email').value.trim().toLowerCase();
        const senhaDigitada = document.getElementById('password').value;

        const usuarioEncontrado = SGAStorage.buscarProfessorPorEmail(emailDigitado);

        if (usuarioEncontrado && usuarioEncontrado.senha === senhaDigitada) {
            SGAStorage.definirLogado(usuarioEncontrado.email);

            alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);

            window.location.href = "home.html";
        } else {
            alert("E-mail ou senha incorretos! Verifique os seus dados e tente novamente.");
        }
    });
}


// PARTE 2: CADASTRO
const formCadastro = document.getElementById('form-cadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nomeUsuario = document.getElementById('nome').value.trim();
        const sobrenomeUsuario = document.getElementById('sobrenome').value.trim();
        const usuarioEmail = document.getElementById('email').value.trim().toLowerCase();
        const disciplinaUsuario = document.getElementById('disciplina').value.trim();
        const senhaDigitada = document.getElementById('password').value;
        const confirmaSenha = document.getElementById('confirm-password').value;

        if (senhaDigitada !== confirmaSenha) {
            alert("As senhas não coincidem! Por favor, digite novamente.");
            return;
        }

        if (SGAStorage.buscarProfessorPorEmail(usuarioEmail)) {
            alert("Este e-mail já está cadastrado no sistema!");
            return;
        }

        const listaAtual = SGAStorage.listarProfessores();

        const novoProfessor = {
            id: Date.now(),
            nome: `${nomeUsuario} ${sobrenomeUsuario}`,
            email: usuarioEmail,
            senha: senhaDigitada,
            disciplinaPrincipal: disciplinaUsuario
        };

        listaAtual.push(novoProfessor);
        SGAStorage.salvarProfessores(listaAtual);

        alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");

        window.location.href = "index.html";
    });
}