const SGAStorage = (() => {

    const CHAVE_PROFESSORES = "sga_professores";
    const CHAVE_LOGADO = "sga_usuario_logado";
    const CHAVE_NOTAS = "sga_notas";
    const PREFIXO_FOTO = "sga_foto_";

    function ler(chave, valorPadrao) {
        const texto = localStorage.getItem(chave);
        if (texto === null) {
            return valorPadrao;
        }

        try {
            return JSON.parse(texto);
        } catch (erro) {
            console.error("Dado corrompido na chave:", chave, erro);
            return valorPadrao;
        }
    }

    function gravar(chave, valor) {
        try {
            localStorage.setItem(chave, JSON.stringify(valor));
            return true;
        } catch (erro) {
            console.error("Erro ao gravar a chave:", chave, erro);
            return false;
        }
    }
    
    function listarProfessores() {
        return ler(CHAVE_PROFESSORES, []);
    }

    function salvarProfessores(lista) {
        return gravar(CHAVE_PROFESSORES, lista);
    }

    function buscarProfessorPorEmail(email) {
        const lista = listarProfessores();
        return lista.find(p => p.email.toLowerCase() === email.toLowerCase());
    }

    function atualizarProfessor(emailAtual, dados) {
        const lista = listarProfessores();
        const posicao = lista.findIndex(p => p.email.toLowerCase() === emailAtual.toLowerCase());

        if (posicao === -1) {
            return false;
        }

        lista[posicao] = { ...lista[posicao], ...dados };
        return salvarProfessores(lista);
    }

        function definirLogado(email) {
        return gravar(CHAVE_LOGADO, email);
    }

    function obterLogado() {
        const email = ler(CHAVE_LOGADO, null);
        if (email === null) {
            return null;
        }
        return buscarProfessorPorEmail(email) || null;
    }

    function logout() {
        localStorage.removeItem(CHAVE_LOGADO);
    }

    function chaveFoto(email) {
        return PREFIXO_FOTO + email.toLowerCase();
    }

    function salvarFoto(email, base64) {
        return gravar(chaveFoto(email), base64);
    }

    function obterFoto(email) {
        return ler(chaveFoto(email), null);
    }

    function removerFoto(email) {
        localStorage.removeItem(chaveFoto(email));
    }

        function salvarNotasAluno(turmaId, matricula, notas) {
        const todas = ler(CHAVE_NOTAS, {});

        if (!todas[turmaId]) {
            todas[turmaId] = {};
        }

        todas[turmaId][matricula] = { ...todas[turmaId][matricula], ...notas };
        return gravar(CHAVE_NOTAS, todas);
    }

    function obterAlunosDaTurma(turma) {
        const todas = ler(CHAVE_NOTAS, {});
        const editadas = todas[turma.id] || {};

        return turma.alunos.map(aluno => ({ ...aluno, ...editadas[aluno.matricula] }));
    }
    return { ler, gravar, listarProfessores, salvarProfessores, buscarProfessorPorEmail, atualizarProfessor, definirLogado, obterLogado, logout, chaveFoto, salvarFoto, obterFoto, removerFoto, salvarNotasAluno, obterAlunosDaTurma };
})()