
// Busca os usuários cadastrados no localStorage ou cria a lista inicial
function obterUsuarios() {
    const usuariosSalvos = localStorage.getItem('professores');
    if (usuariosSalvos) {
        return JSON.parse(usuariosSalvos);
    }
    
    // Usuário padrão/mockado caso o sistema esteja vazio 
    const usuariosIniciais = [
        {
            id: 1,
            nome: "Professor Exemplo",
            email: "prof@to-oh.edu.br",
            senha: "123"
        }
    ];
    
    localStorage.setItem('professores', JSON.stringify(usuariosIniciais));
    return usuariosIniciais;
}


// PARTE 1: LOGIN
const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        const emailDigitado = document.getElementById('email').value.trim().toLowerCase();
        const senhaDigitada = document.getElementById('password').value;

        // Busca todos os professores salvos
        const listaUsuarios = obterUsuarios();

        // Procura na lista se existe alguém com esse email E com essa senha
        const usuarioEncontrado = listaUsuarios.find(
            u => u.email === emailDigitado && u.senha === senhaDigitada
        );

        // Verifica o resultado
        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            
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
    formCadastro.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nomeUsuario = document.getElementById('nome').value.trim();
        const sobrenomeUsuario = document.getElementById('sobrenome').value.trim();
        const usuarioEmail = document.getElementById('email').value.trim().toLowerCase();
        const senhaDigitada = document.getElementById('password').value;
        const confirmaSenha = document.getElementById('confirm-password').value;

        if (senhaDigitada !== confirmaSenha) {
            alert("As senhas não coincidem! Por favor, digite novamente.");
            return; 
        }

        const listaUsuarios = obterUsuarios();
        const usuarioExiste = listaUsuarios.some(u => u.email === usuarioEmail);
        
        if (usuarioExiste) {
            alert("Este e-mail já está cadastrado no sistema!");
            return; 
        }

        
        const novoProfessor = {
            id: Date.now(), 
            nome: `${nomeUsuario} ${sobrenomeUsuario}`,
            email: usuarioEmail,
            senha: senhaDigitada
        };

        listaUsuarios.push(novoProfessor);
        localStorage.setItem('professores', JSON.stringify(listaUsuarios));

        alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
        
        window.location.href = "index.html";
    });
}