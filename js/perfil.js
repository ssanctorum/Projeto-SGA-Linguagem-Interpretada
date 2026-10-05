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

    const avatar = document.getElementById("avatar-usuario");
    const foto = SGAStorage.obterFoto(professor.email);

    if (foto) {
        avatar.style.backgroundImage = "url(" + foto + ")";
        avatar.style.backgroundSize = "cover";
        avatar.textContent = "";
    } else {
        avatar.style.backgroundImage = "";
        avatar.textContent = iniciaisDoNome(professor.nome);
    }
}

function renderizarPerfil() {
    const professor = SGAStorage.obterLogado();
    if (!professor) {
        return;
    }

    const conteudo = document.getElementById("conteudo-principal");
    const foto = SGAStorage.obterFoto(professor.email);

    conteudo.innerHTML = `
        <section class="cabecalho-conteudo">
            <p class="texto-boas-vindas">Dados do professor</p>
            <h2>Meu perfil</h2>
        </section>

        <section class="secao-perfil-foto">
            <div class="avatar-perfil" id="avatar-perfil-preview"
                 style="${foto ? `background-image: url(${foto})` : ""}">
                ${foto ? "" : iniciaisDoNome(professor.nome)}
            </div>

            <div class="info-foto">
                <p><strong>Foto do perfil</strong></p>
                <p class="legenda-foto">PNG ou JPG, até 2 MB.</p>
                <div class="acoes-foto">
                    <label class="botao-alterar-foto" for="perfil-foto">Alterar foto</label>
                    <button type="button" class="botao-remover-foto" id="perfil-remover-foto">Remover</button>
                    <input type="file" id="perfil-foto" class="input-foto-oculto" accept="image/png, image/jpeg">
                </div>
            </div>
        </section>

        <form id="form-perfil" class="form-perfil-dados">
            <label for="perfil-nome">Nome completo</label>
            <input type="text" id="perfil-nome" value="${professor.nome}">

            <label for="perfil-email">E-mail institucional</label>
            <input type="email" id="perfil-email" value="${professor.email}">

            <label for="perfil-disciplina">Disciplina principal</label>
            <input type="text" id="perfil-disciplina" value="${professor.disciplinaPrincipal}">

            <button type="submit">Salvar</button>
        </form>
    `;

    document.getElementById("form-perfil").addEventListener("submit", function (evento) {
        evento.preventDefault();

        const novoNome = document.getElementById("perfil-nome").value;
        const novoEmail = document.getElementById("perfil-email").value;
        const novaDisciplina = document.getElementById("perfil-disciplina").value;

        if (novoNome.trim() === "" || novaDisciplina.trim() === "") {
            alert("Preencha nome e disciplina.");
            return;
        }

        SGAStorage.atualizarProfessor(professor.email, {
            nome: novoNome,
            email: novoEmail,
            disciplinaPrincipal: novaDisciplina
        });

        if (novoEmail.toLowerCase() !== professor.email.toLowerCase()) {
            SGAStorage.definirLogado(novoEmail);
        }

        atualizarCabecalho();
    });

    document.getElementById("perfil-foto").addEventListener("change", function (evento) {
        const arquivo = evento.target.files[0];

        if (!arquivo) {
            return;
        }

        const tiposPermitidos = ["image/png", "image/jpeg"];
        if (!tiposPermitidos.includes(arquivo.type)) {
            alert("Envie apenas imagens PNG ou JPG.");
            return;
        }

        const tamanhoMaximo = 2 * 1024 * 1024;
        if (arquivo.size > tamanhoMaximo) {
            alert("A imagem deve ter no máximo 2 MB.");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function () {
            const sucesso = SGAStorage.salvarFoto(professor.email, leitor.result);

            if (!sucesso) {
                alert("Não foi possível salvar a foto. Tente uma imagem menor.");
                return;
            }

            atualizarCabecalho();
            renderizarPerfil();
        };

        leitor.readAsDataURL(arquivo);
    });

    document.getElementById("perfil-remover-foto").addEventListener("click", function () {
        SGAStorage.removerFoto(professor.email);
        atualizarCabecalho();
        renderizarPerfil();
    });
}

atualizarCabecalho();