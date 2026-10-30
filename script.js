// ===== 1. Логика открытия письма =====
let isLetterOpen = false;

function openLetter() {
    if (isLetterOpen) return;
    isLetterOpen = true;
    
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open');

    // Ждем, пока проиграется анимация конверта, и меняем экран
    setTimeout(() => {
        document.getElementById('envelope-screen').classList.remove('active');
        document.getElementById('letter-screen').classList.add('active');
        startTypewriter();
    }, 1200);
}

// ===== 2. Эффект печатной машинки =====
const letterText = "Я безумно сильно люблю тебя. Люблю тебя каждый день, каждый час, каждую минуту и каждую секунду.\n\nМне не представить мира без тебя, без твоих нежных ангельских глаз, твоего милого голоса и нежной улыбки.\n\nТы мой мир. Я безумно сильно люблю тебя и все, что с тобой связано. Ты настоящий лучик света в моей жизни. Ты самое прекрасное, что случалось в моей жизни.\n\n(by VTY)";

let charIndex = 0;

function startTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    const nextBtn = document.getElementById('next-btn');

    function type() {
        if (charIndex < letterText.length) {
            textElement.textContent += letterText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 40); // Скорость печати (40 мс)
        } else {
            nextBtn.classList.remove('hidden');
        }
    }
    type();
}

// ===== 3. Мини-тест =====
const questions = [
    {
        question: "Сколько во мне мужского?",
        options: ["Ноль", "Чуть-чуть найдется", "Во мне дохуя мужского"],
        correct: 0,
        feedback: " Хахах да да все так ❤️"
    },
    {
        question: "Что первое тебя зацепило во мне?",
        options: ["Моя улыбка", "Мои глаза", "Футболка маджестика"],
        correct: 2,
        feedback: " Ты идеальна 🥰"
    },
    {
        question: "Что первое меня зацепило в тебе",
        options: ["Рубашка и волосы", "Твой голос", "Твоя фигура"],
        correct: 0, // Любой ответ правильный
        feedback: "Какая ты все таки милая 💖"
    },

    {
        question: "Чего мы оба хотим исправить в нашей истории?",
        options: ["Держать друг друга в обьятиях возле столовой как можно дольше", "Познакомиться пораньше", "Не стесняться и показать интерес еще раньше"],
        correct: -1, // Любой ответ правильный
        feedback: "Все ответы верны, я хочу исправить это все"
    }
];

let currentQuestion = 0;

function startQuiz() {
    document.getElementById('letter-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('feedback').textContent = "";
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const q = questions[currentQuestion];
    
    // Блокируем кнопки после ответа
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    if (q.correct === -1 || selectedIndex === q.correct) {
        btnElement.classList.add('correct');
        document.getElementById('feedback').textContent = q.feedback;
    } else {
        btnElement.classList.add('wrong');
        document.getElementById('feedback').textContent = "Ошибочка, но я всё равно тебя обожаю! ❤️";
    }

    // Переход к следующему вопросу или финалу
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showFinalScreen();
        }
    }, 1500);
}

// ===== 4. Финал и Салют =====
function showFinalScreen() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('final-screen').classList.add('active');
}

function triggerConfetti() {
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c6', '#fff0f3'];
    
    // Создаем 100 сердечек
    for (let i = 0; i < 100; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '50vh';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        heart.style.transition = 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        
        document.body.appendChild(heart);

        // Анимация разлета
        setTimeout(() => {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 1) * 100; // Всегда вверх
            heart.style.transform = `translate(${x}vw, ${y}vh) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 10);

        // Удаляем элемент после завершения анимации
        setTimeout(() => heart.remove(), 1600);
    }
}

// ===== 5. Секретик =====
document.getElementById('secret-heart').onclick = function() {
    document.getElementById('secret-modal').classList.add('show');
};

function closeSecret() {
    document.getElementById('secret-modal').classList.remove('show');
}

// ===== 6. Фоновые сердечки =====
function createBackgroundHearts() {
    const container = document.getElementById('background-hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 7) + 's'; // от 7 до 12 секунд
        container.appendChild(heart);

        // Удаляем сердечко после того, как оно улетит
        setTimeout(() => heart.remove(), 12000);
    }, 600); // Каждые 0.6 секунды появляется новое
}

createBackgroundHearts();