function iniciaisDoNome(nome) {
    const palavras = nome.split(" ");
    const primeira = palavras[0][0];
    const ultima = palavras[palavras.length - 1][0];
    return (primeira + ultima).toUpperCase();
}

function atualizarCabecalho() {
    const professor = SGAStorage.obterLogado();
    if (!professor) {
        return;
    }

    document.getElementById("nome-professor").textContent = professor.nome;
    document.getElementById("avatar-usuario").textContent = iniciaisDoNome(professor.nome);
}

function renderizarPerfil() {
    const professor = SGAStorage.obterLogado();
    if (!professor) {
        return;
    }

    const conteudo = document.getElementById("conteudo-principal");

    conteudo.innerHTML = `
        <section class="cabecalho-conteudo">
            <p class="texto-boas-vindas">Dados do professor</p>
            <h2>Meu perfil</h2>
        </section>

        <form id="form-perfil">
            <label for="perfil-nome">Nome completo</label>
            <input type="text" id="perfil-nome" value="${professor.nome}">

            <label for="perfil-email">E-mail institucional</label>
            <input type="email" id="perfil-email" value="${professor.email}">

            <label for="perfil-disciplina">Disciplina principal</label>
            <input type="text" id="perfil-disciplina" value="${professor.disciplinaPrincipal}">

            <button type="submit">Salvar</button>
        </form>
    `;
}

atualizarCabecalho();
renderizarPerfil();