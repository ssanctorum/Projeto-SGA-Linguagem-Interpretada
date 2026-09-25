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

atualizarCabecalho();