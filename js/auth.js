
// LOGIN
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        const usuarioDigitado = document.getElementById('email').value;
        const senhaDigitada = document.getElementById('password').value;

        console.log("LOGIN - O usuário digitou:", usuarioDigitado);
        console.log("LOGIN - A senha digitada foi:", senhaDigitada);
    });
}

// CADASTRO 
const formCadastro = document.getElementById('form-cadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nomeUsuario = document.getElementById('nome').value;
        const sobrenomeUsuario = document.getElementById('sobrenome').value;
        const usuarioEmail = document.getElementById('email').value;
        const senhaDigitada = document.getElementById('password').value;

        console.log("CADASTRO - O nome digitado:", nomeUsuario);
        console.log("CADASTRO - O sobrenome digitado:", sobrenomeUsuario);
        console.log("CADASTRO - O email digitado:", usuarioEmail);
        console.log("CADASTRO - A senha digitada foi:", senhaDigitada);
    });
}