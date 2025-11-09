const credenciais = sessionStorage.getItem("adminAuth");
const authHeader = { 'Authorization': 'Basic ' + credenciais };
const feedContainer = document.getElementById('feed-container'); 
const filtroCategoria = document.getElementById('filtroCategoria');
const btnFiltrar = document.getElementById('btnFiltrar');

if (!credenciais) {
    alert("Você não está logado! Redirecionando para o login.");
    window.location.href = "index.html";
}

function buscarRelatos(categoriaId = null) {
    let url = 'http://localhost:8081/api/relatos';
    
    if (categoriaId) {
        url += '?categoriaId=' + categoriaId;
    }

    fetch(url, {
        method: 'GET',
        headers: authHeader
    })
    .then(response => {
        if (response.status === 401) throw new Error('Login ou senha incorretos.');
        if (!response.ok) throw new Error('Falha ao buscar relatos.');
        return response.json();
    })
    .then(relatos => {
        feedContainer.innerHTML = '<h2>Feed de Relatos</h2>';
        
        relatos.forEach(relato => {
            const dataFormatada = new Date(relato.dataCriacao).toLocaleString('pt-BR');
            const relatoElement = document.createElement('div');
            relatoElement.className = 'relato-item';
            relatoElement.innerHTML = `
                <div class="relato-header">
                    <h3>${relato.titulo} (ID: ${relato.id})</h3>
                    <span><strong>Status:</strong> ${relato.status}</span>
                </div>
                <p><strong>Local:</strong> ${relato.localizacao}</p>
                <p><strong>Descrição:</strong> ${relato.descricao}</p>
                <p><strong>Coordenadas:</strong> ${relato.latitude}, ${relato.longitude}</p>
                <p><strong>Data:</strong> ${dataFormatada}</p>
                <div class="relato-acoes">
                    <button onclick="atualizarStatus(${relato.id}, 'Em Andamento')">Marcar "Em Andamento"</button>
                    <button onclick="atualizarStatus(${relato.id}, 'Concluído')">Marcar "Concluído"</button>
                    <button onclick="atualizarStatus(${relato.id}, 'Aberto')">Marcar "Aberto"</button>
                </div>
            `;
            feedContainer.appendChild(relatoElement);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar relatos:', error);
        alert(error.message);
        sessionStorage.removeItem("adminAuth");
        window.location.href = "index.html";
    });
}

function atualizarStatus(relatoId, novoStatus) {
    fetch(`http://localhost:8081/api/relatos/${relatoId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify({
            status: novoStatus 
        })
    })
    .then(response => {
        if (response.status === 401) throw new Error('Login ou senha incorretos.');
        if (!response.ok) throw new Error('Falha ao atualizar status.');
        return response.json();
    })
    .then(relatoAtualizado => {
        alert(`Status do relato ${relatoAtualizado.id} mudado para ${relatoAtualizado.status}`);
        
        const catIdFiltro = filtroCategoria.value;
        buscarRelatos(catIdFiltro ? catIdFiltro : null);
    })
    .catch(error => {
        console.error('Erro ao atualizar status:', error);
        alert(error.message);
    });
}

btnFiltrar.addEventListener('click', () => {
    const catId = filtroCategoria.value;
    buscarRelatos(catId ? catId : null);
});

buscarRelatos();