const API_KEY = c80413a76e434b82b58ec5f15bc415b8; // Obtenha em newsapi.org
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=br&category=';

const containerNoticias = document.getElementById('news-container');
const botoesFiltro = document.querySelectorAll('.filter-btn');

// 1. Função Assíncrona para buscar dados da API
async function buscarNoticias(categoria = 'general') {
    containerNoticias.innerHTML = "<p>Carregando notícias...</p>";
    
    try {
        const resposta = await fetch(`${BASE_URL}${categoria}&apiKey=${API_KEY}`);
        const dados = await resposta.json();

        if (dados.articles && dados.articles.length > 0) {
            renderizarNoticias(dados.articles);
        } else {
            containerNoticias.innerHTML = "<p>Nenhuma notícia encontrada para esta categoria.</p>";
        }
    } catch (erro) {
        console.error("Erro ao buscar notícias:", erro);
        containerNoticias.innerHTML = "<p>Erro ao carregar notícias. Verifique sua conexão ou chave de API.</p>";
    }
}

// 2. Função para renderizar o HTML (adaptada para os nomes da API)
function renderizarNoticias(artigos) {
    containerNoticias.innerHTML = ""; 

    artigos.forEach(artigo => {
        // A API às vezes envia artigos removidos ou sem imagem, filtramos aqui
        if (!artigo.title || artigo.title === "[Removed]") return;

        const noticiaCard = `
            <article class="card">
                <img src="${artigo.urlToImage || 'https://via.placeholder.com/300x180?text=Sem+Imagem'}" alt="Imagem da notícia">
                <div class="content">
                    <span class="badge">${artigo.source.name}</span>
                    <h2>${artigo.title}</h2>
                    <p>${artigo.description || 'Clique em ler mais para ver os detalhes desta reportagem.'}</p>
                    <a href="${artigo.url}" target="_blank" class="read-more">Ler mais</a>
                </div>
            </article>
        `;
        containerNoticias.innerHTML += noticiaCard;
    });
}

// 3. Filtros vinculados à API
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        const categoria = botao.getAttribute('data-category');
        // A NewsAPI usa categorias em inglês (technology, sports, business, etc)
        buscarNoticias(categoria);
    });
});

// Inicialização padrão
document.addEventListener('DOMContentLoaded', () => buscarNoticias('general'));