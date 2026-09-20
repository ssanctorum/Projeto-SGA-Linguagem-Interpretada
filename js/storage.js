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

    return { ler, gravar, listarProfessores, salvarProfessores, buscarProfessorPorEmail };
})()