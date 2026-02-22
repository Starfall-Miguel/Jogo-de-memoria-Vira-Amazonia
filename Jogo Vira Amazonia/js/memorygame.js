const grid = document.querySelector('.grid');

// Variáveis globais para controle do jogo
let timerInterval;
let seconds = 0;
let gameActive = true;
let firstCard = '';
let secondCard = '';

// Informações detalhadas sobre cada animal
const animalDetails = {
    'peixe-boi.png': {
        name: 'Peixe-boi',
        description: 'O peixe-boi-da-amazônia é um mamífero aquático herbívoro que pode chegar a 3 metros de comprimento e 500 kg. É uma espécie vulnerável devido à caça e perda de habitat.',
        image: '../Imagens/peixe-boi.png.png'
    },
    'onca.png': {
        name: 'Onça-pintada',
        description: 'Maior felino das Américas, a onça-pintada é um predador de topo de cadeia alimentar. Pode chegar a 2,7 metros de comprimento e 150 kg. É símbolo da biodiversidade amazônica.',
        image: '../Imagens/onca.png.png'
    },
    'macaco-prego.png': {
        name: 'Macaco-prego',
        description: 'Primata inteligente conhecido por usar ferramentas. Vive em grupos sociais complexos e se alimenta de frutas, sementes e pequenos animais. É comum em várias regiões da Amazônia.',
        image: '../Imagens/macaco-prego.png'
    },
    'piranha-vermelha.png': {
        name: 'Piranha-vermelha',
        description: 'Peixe carnívoro conhecido por seus dentes afiados e comportamento de caça em grupo. Apesar da fama, raramente ataca humanos e é importante para o equilíbrio do ecossistema.',
        image: '../Imagens/piranha-vermelha.png'
    },
    'tucano.png': {
        name: 'Tucano',
        description: 'Ave conhecida por seu bico grande e colorido. Alimenta-se principalmente de frutas, mas também consome insetos e pequenos vertebrados. Seu bico oco é leve mas resistente.',
        image: '../Imagens/tucano.png'
    },
    'arara-vermelha.png': {
        name: 'Arara-vermelha',
        description: 'Uma das aves mais emblemáticas da Amazônia, conhecida por suas cores vibrantes e vocalização alta. Pode viver mais de 50 anos e forma casais para a vida toda.',
        image: '../Imagens/arara-vermelha.png'
    },
    'tartaruga.png': {
        name: 'Tartaruga-da-amazônia',
        description: 'Maior tartaruga de água doce da América do Sul. Pode chegar a 90 cm e 65 kg. Desova nas praias dos rios e é importante para a cultura dos povos ribeirinhos.',
        image: '../Imagens/tartaruga.png'
    },
    'preguica.png': {
        name: 'Preguiça',
        description: 'Mamífero arbóreo que passa a maior parte do tempo pendurado nas árvores. Move-se lentamente e desce ao solo apenas uma vez por semana para defecar.',
        image: '../Imagens/preguica.png'
    },
    'capivara.png': {
        name: 'Capivara',
        description: 'Maior roedor do mundo, podendo atingir 1,3 metro e 80 kg. É semiaquática e vive em grupos familiares. Encontrada em áreas alagadas da Amazônia.',
        image: '../Imagens/capivara.png'
    },
    'lontra': {
        name: 'Lontra',
        description: 'Mamífero aquático ágil e brincalhão. Excelente nadadora, alimenta-se principalmente de peixes. Vive em rios e lagos da floresta amazônica.',
        image: '../Imagens/lontra.png'
    },
    'boto': {
        name: 'Boto-cor-de-rosa',
        description: 'Conhecido como "boto-rosa", é o maior golfinho de água doce do mundo. Pode chegar a 2,5 metros e 180 kg. Tem grande importância na cultura e folclore amazônicos.',
        image: '../Imagens/boto.png'
    },
    'perereca': {
        name: 'Perereca',
        description: 'Anfíbio de hábitos noturnos conhecido por suas ventosas nas pontas dos dedos que permitem escalar superfícies verticais. Importante para o controle de insetos.',
        image: '../Imagens/perereca.png'
    }
};

const characters = [
    'peixe-boi.png',
    'onca.png',
    'macaco-prego.png',
    'piranha-vermelha.png',
    'tucano.png',
    'arara-vermelha.png',
    'tartaruga.png',
    'preguica.png',
    'capivara.png',
    'lontra',
    'boto',
    'perereca',
];

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar temporizador
    startTimer();
    
    // Configurar botão de reiniciar (que já existe no HTML)
    setupRestartButton();
    
    // Recuperar e exibir o nome do usuário
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('login__input').textContent = username;
    }
});

// Função do temporizador
function startTimer() {
    const timerElement = document.querySelector('.timer');
    seconds = 0;
    gameActive = true;
    
    clearInterval(timerInterval);
    
    function updateTimer() {
        if (!gameActive) return;
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    timerInterval = setInterval(updateTimer, 1000);
}

// Função para configurar o botão de reiniciar que já existe
function setupRestartButton() {
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', restartGame);
}

// Função para reiniciar o jogo
function restartGame() {
    // Limpa o grid
    grid.innerHTML = '';
    
    // Reinicia variáveis do jogo
    firstCard = '';
    secondCard = '';
    
    // Esconde informações da carta
    hideCardInfo();
    
    // Reinicia o temporizador
    startTimer();
    
    // Recarrega as cartas
    loadGame();
}

// Função para exibir informações da carta
function showCardInfo(character) {
    const animalInfo = animalDetails[character];
    if (animalInfo) {
        document.getElementById('animal-image').src = animalInfo.image;
        document.getElementById('animal-name').textContent = animalInfo.name;
        document.getElementById('animal-description').textContent = animalInfo.description;
        
        const cardInfo = document.querySelector('.card-info');
        cardInfo.classList.add('active');
    }
}

// Função para esconder informações da carta
function hideCardInfo() {
    const cardInfo = document.querySelector('.card-info');
    cardInfo.classList.remove('active');
}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 24) {
        gameActive = false; // Congela o temporizador
        setTimeout(() => {
            alert(`Parabéns, você encontrou todos os pares!\nTempo: ${document.querySelector('.timer').textContent}`);
        }, 500);
    }
}

const checkCards = () => { 
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        // Exibe informações da carta encontrada
        showCardInfo(firstCharacter);

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 400);
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') { 
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    const duplicatedCharacters = [...characters, ...characters];
    const shuffledCharacters = duplicatedCharacters.sort(() => Math.random() - 0.5);

    shuffledCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

// Iniciar o jogo
loadGame();