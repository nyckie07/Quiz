const $instructions = document.querySelector(".controls-container2");

const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");

let currentQuestionIndex = 0;
let totalCorrect = 0; 

const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
  const $instructionElements = document.querySelectorAll(
    ".controls-container2, h2" 
  );

  $instructionElements.forEach((element) => {
    element.classList.add("hide");
  });

  document.querySelector(".controls-container").classList.add("hide");

  $questionsContainer.classList.remove("hide");

  displayNextQuestion();
}

function displayNextQuestion() {
  resetState(); 

  if (questions.length === currentQuestionIndex) {
    return finishGame(); 
  }

  const currentQuestion = questions[currentQuestionIndex];

  $questionText.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text; 

    if (answer.correct) {
      newAnswer.dataset.correct = "true";
    }

    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");

  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct"); 
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect"); 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++; 
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestions); 

  let message = ""; 

  switch (true) {
    case performance >= 90:
      message = "Excelente :)";
      break;
    case performance >= 70:
      message = "Muito bom :)";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick="window.location.reload()" 
      class="button"
    >
      Refazer teste
    </button>
  `;
}


function redirect() {
  window.location.href = "https://nyckie07.github.io/IFsecurity/";
}


const questions = [
  // nível de dificuldade facil 
  {
    question: "O que é cibersegurança?",
    answers: [
      { text: "Proteção de sistemas, redes e dados contra ameaças cibernéticas.", correct: true },
      { text: "Um sistema operacional para computadores.", correct: false },
      { text: "Uma linguagem de programação.", correct: false },
      { text: "Uma técnica de edição de fotos.", correct: false }
    ]
  },
  {
    question: "O que é um firewall?",
    answers: [
      { text: "Um dispositivo que protege contra incêndios florestais.", correct: false },
      { text: "Uma barreira física que impede a entrada de vírus em um sistema.", correct: false },
      { text: "Controla o tráfego de rede e protege contra ameaças externas.", correct: true },
      { text: "Um dispositivo para aquecer escritórios nos dias frios.", correct: false } 
    ]
  },
  {
    question: "O que a autenticação multifatorial (MFA) envolve?",
    answers: [
      { text: "Usar múltiplos métodos de autenticação, como senha e código enviado por SMS.", correct: true },
      { text: "Usar senha e aplicativo de autenticação móvel.", correct: false },
      { text: "Usar senha e resposta a uma pergunta de segurança.", correct: false },
      { text: "Usar múltiplos métodos de autenticação, como senha e reconhecimento facial.", correct: false }
    ]
  }
  ,

  // nível de dificuldade medio 
  {
    question: "Quais são três estratégias específicas de proteção contra ameaças cibernéticas?",
    answers: [
      { text: "Firewalls, detecção de intrusão e autenticação de dois fatores (2FA).", correct: true },
      { text: "Atualizações regulares de software, backups de dados e políticas de acesso restrito.", correct: false },
      { text: "Criptografia de dados, análise de vulnerabilidades e treinamento em segurança.", correct: false },
      { text: "Antivírus, firewalls de hardware e autenticação biométrica.", correct: false }
    ]
  },
  {
    question: "Quais são os dois tipos de malware menos conhecidos?",
    answers: [
      { text: "Vírus e trojans.", correct: false },
      { text: "Spyware e adware.", correct: false },
      { text: "Ransomware e worms.", correct: false },
      { text: "Keyloggers e rootkits.", correct: true }
    ]
  },
  {
    question: "O que um engenheiro social tenta fazer em cibersegurança?",
    answers: [
      { text: "Desenvolver softwares para proteger contra ameaças cibernéticas.", correct: false },
      { text: "Invadir sistemas de computadores usando técnicas avançadas.", correct: false },
      { text: "Manipular psicologicamente indivíduos para obter informações confidenciais.", correct: true },
      { text: "Criar algoritmos de criptografia para proteger dados sensíveis.", correct: false }
    ]
  },

  //  nível de dificuldade dificil 
  {
    "question": "Qual é a diferença entre um vírus e um worm de computador?",
    "answers": [
      { text: "Vírus se espalha por redes; worm se anexa a arquivos para se replicar.", correct: false },
      { text: "Vírus pode ser inofensivo; worm é sempre malicioso.", correct: false },
      { text: "Vírus se anexa a arquivos; worm se espalha por redes.", correct: true },
      { text: "Vírus usa engenharia social; worm usa vulnerabilidades de rede.", correct: false }

    ]
  },

  {
    "question": "O que faz um Especialista em Segurança de TI?",
    "answers": [
      { "text": "Protege sistemas e dados, previne ataques, monitora ameaças e responde a incidentes.", "correct": true },
      { "text": "Desenvolve hardware para garantir segurança em redes e computadores.", "correct": false },
      { "text": "Projeta estratégias para melhorar o desempenho de sistemas de TI.", "correct": false },
      { "text": "Realiza testes para garantir a segurança e a compatibilidade do software.", "correct": false }
    ]
  },
  
  {
    "question": "Qual ferramenta de segurança é usada para proteger sua privacidade na internet por meio de criptografia?",
    "answers": [
      { "text": "Antivírus", "correct": false },
      { "text": "Firewall", "correct": false },
      { "text": "Gerenciador de Senhas", "correct": false },
      { "text": "VPN", "correct": true }
    ]
  },
  {
    "question": "Quais são algumas práticas recomendadas para segurança de dados e sistemas?",
    "answers": [
      { text: "Use senhas fortes, atualize software, evite links maliciosos.", correct: true },
      { text: "Compartilhe senhas, desative atualizações automáticas, clique em links conhecidos.", correct: false },
      { text: "Senhas simples, evite backups, clique em links confiáveis.", correct: false },
      { text: "Backups regulares, 2FA, não compartilhe informações confidenciais por e-mail.", correct: false }
      
    ]
  }  
]
