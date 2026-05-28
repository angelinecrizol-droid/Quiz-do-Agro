const perguntas = ['pergunta-1', 'pergunta-2', 'pergunta-3', 'pergunta-4'];
const pontuacoes = {
    tech: 0,
    raiz: 0,
    sust: 0,
    gestor: 0,
};
let indiceAtual = 0;

function comecarQuiz() {
    document.getElementById('tela-inicio').classList.add('escondido');
    indiceAtual = 0;
    mostrarPergunta(indiceAtual);
}

function mostrarPergunta(indice) {
    perguntas.forEach((id, index) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.classList.toggle('escondido', index !== indice);
        }
    });
}

function resposta(tipo) {
    if (!pontuacoes.hasOwnProperty(tipo)) return;
    pontuacoes[tipo] += 1;

    const perguntaAtual = document.getElementById(perguntas[indiceAtual]);
    if (perguntaAtual) {
        perguntaAtual.classList.add('escondido');
    }

    indiceAtual += 1;
    if (indiceAtual < perguntas.length) {
        mostrarPergunta(indiceAtual);
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const resultado = document.getElementById('resultado');
    const tipoAgricultor = document.getElementById('tipo-agricultor');
    const recomendacoes = document.getElementById('recomendacoes');

    const maiorPontuacao = Math.max(...Object.values(pontuacoes));
    const categorias = Object.keys(pontuacoes).filter(chave => pontuacoes[chave] === maiorPontuacao);
    const escolha = categorias[0] || 'versatil';

    let titulo = '';
    let texto = '';

    switch (escolha) {
        case 'tech':
            titulo = 'Agricultor Tecnológico🤖';
            texto = '<p>Você adora usar tecnologia para melhorar sua produção e tomar decisões mais precisas.</p>';
            break;
        case 'raiz':
            titulo = 'Agricultor de Raiz🌾';
            texto = '<p>Você valoriza métodos tradicionais e o cuidado com o solo e a natureza.</p>';
            break;
        case 'sust':
            titulo = 'Agricultor Sustentável🌱';
            texto = '<p>Você busca soluções que equilibram produção e preservação ambiental.</p>';
            break;
        case 'gestor':
            titulo = 'Gestor Agrícola💼';
            texto = '<p>Você prefere planejar, analisar e seguir uma estratégia inteligente para a fazenda.</p>';
            break;
        default:
            titulo = 'Agricultor Versátil🔄';
            texto = '<p>Você tem uma abordagem equilibrada e multifacetada na agricultura.</p>';
    }

    tipoAgricultor.innerHTML = titulo;
    recomendacoes.innerHTML = `
        <div class="caixa-recomendacoes">
            ${texto}
            <h3>Recomendações</h3>
            <ul>
                <li>Continue desenvolvendo seu estilo e adaptando-se às condições locais.</li>
                <li>Use informação e tecnologia para melhorar sua tomada de decisões.</li>
                <li>Considere práticas sustentáveis que protejam seu solo e água.</li>
            </ul>
        </div>
    `;
    resultado.classList.remove('escondido');
}

function abrirMenu() {
    document.getElementById('caixa-opcoes').classList.toggle('escondido');
}

function aumentarLetra() {
    document.body.classList.add('fonte-grande');
}

function diminuirLetra() {
    document.body.classList.remove('fonte-grande');
}

function alternarModoEscuro() {
    document.body.classList.toggle('modo-escuro');
}

function alternarModoClaro() {
    document.body.classList.remove('modo-escuro');
}

function lerTexto() {
    const texto = document.querySelector('.caixa-quiz').innerText;
    if ('speechSynthesis' in window) {
        const mensagem = new SpeechSynthesisUtterance(texto);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(mensagem);
    } else {
        alert('Leitor de texto não está disponível neste navegador.');
    }
}
