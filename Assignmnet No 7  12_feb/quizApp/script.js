"use strict";
const questionDiv = document.querySelector('.question');
const options = document.querySelectorAll('.option');
const resultDiv = document.querySelector('.result');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.resetBtn');
const questionDisplaySection = document.querySelector('.questionDisplaySection');
const bestScoreDiv = document.querySelector('.bestScore');
const questionsData = [
    {
        question: "What is the file extension for TypeScript files?",
        choices: [".ts", ".js", ".tsx", ".tjs"],
        correctAnswer: ".ts"
    },
    {
        question: "Which keyword is used to define a variable in TypeScript?",
        choices: ["let", "var", "const", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "How do you specify a number type in TypeScript?",
        choices: ["number", "int", "float", "Num"],
        correctAnswer: "number"
    },
    {
        question: "What will `let x: any = 5; x = 'Hello';` do?",
        choices: [
            "Give an error",
            "Work fine",
            "Convert 'Hello' to a number",
            "Ignore the reassignment"
        ],
        correctAnswer: "Work fine"
    },
    {
        question: "What will `const num: number = '10';` do?",
        choices: [
            "Give an error",
            "Convert '10' to a number",
            "Assign '10' without error",
            "Print 10"
        ],
        correctAnswer: "Give an error"
    }
];
class Quiz {
    constructor(questionsData) {
        this.questionIndex = -1;
        this.questions = questionsData;
        this.totalScore = 0;
        this.bestScore = 0;
        this.renderQuestion();
    }
    evaluateAnswer(userAnswerIndex) {
        const correctAnswer = this.questions[this.questionIndex].correctAnswer;
        const userAnswer = this.questions[this.questionIndex].choices[userAnswerIndex];
        if (correctAnswer === userAnswer) {
            this.totalScore++;
        }
        return this.questionIndex;
    }
    renderQuestion() {
        this.questionIndex++;
        if (questionDiv) {
            questionDiv.innerHTML = this.questions[this.questionIndex].question;
            Array.from(options).map((op, ind) => {
                op.innerText = this.questions[this.questionIndex].choices[ind];
            });
        }
    }
    showResult() {
        if (resultDiv)
            resultDiv.classList.toggle('hidden');
        this.bestScore = Math.max(this.totalScore, this.bestScore);
        if (bestScoreDiv)
            bestScoreDiv.innerHTML = `Best Score ${this.bestScore}`;
        if (resultDiv)
            resultDiv.innerHTML = `Total Score: ${this.totalScore} 🥳🥳🎊🎉`;
        if (questionDisplaySection)
            questionDisplaySection.classList.toggle('hidden');
        if (resetBtn)
            resetBtn.classList.toggle('hidden');
    }
    reset() {
        this.questionIndex = -1;
        this.totalScore = 0;
    }
}
const player = new Quiz(questionsData);
const checkOptionSelection = () => {
    const userSelection = document.querySelector('input[name="option"]:checked');
    if (!userSelection) {
        alert('Please Select given option');
        return -1;
    }
    userSelection.checked = false;
    return +userSelection.value;
};
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener('click', () => {
    const index = checkOptionSelection();
    if (index !== -1) {
        const questionIndex = player.evaluateAnswer(index);
        console.log(questionIndex);
        if (questionIndex !== questionsData.length - 1) {
            player.renderQuestion();
        }
        else {
            player.showResult();
        }
    }
});
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', () => {
    player.reset();
    player.showResult();
    player.renderQuestion();
});
