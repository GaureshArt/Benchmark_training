const questionDiv = document.querySelector('.question');
const options = document.querySelectorAll('.option');
const resultDiv = document.querySelector('.result');
const submitBtn = document.querySelector('.submit')
const resetBtn = document.querySelector('.resetBtn')
const questionDisplaySection = document.querySelector('.questionDisplaySection')
const bestScoreDiv = document.querySelector('.bestScore');


const questionsData: IQuestion[] = [
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


interface IQuestion{
    question:string;
    choices:string[];
    correctAnswer:string;
}
interface IuserResponse{
    evaluateAnswer:(data:number)=>number;
    renderQuestion:()=>void;
    showResult:()=>void;
    reset:()=>void;
}
class Quiz implements IuserResponse {
    private questions:IQuestion[];
    private questionIndex:number;
    private totalScore:number;
    private bestScore:number;

    constructor(questionsData:IQuestion[]){
        this.questionIndex = -1;
        this.questions = questionsData;
        this.totalScore = 0;
        this.bestScore = 0;
        this.renderQuestion();
    }
    evaluateAnswer(userAnswerIndex:number):number{
        const correctAnswer:string = this.questions[this.questionIndex].correctAnswer;
        const userAnswer:string = this.questions[this.questionIndex].choices[userAnswerIndex];
        if(correctAnswer === userAnswer){
            this.totalScore++;
        }
        return this.questionIndex;
    }
    renderQuestion():void{
        this.questionIndex++;
        if(questionDiv){
            questionDiv.innerHTML = this.questions[this.questionIndex].question
            Array.from(options).map((op ,ind)=>{
                (op as HTMLElement).innerText = this.questions[this.questionIndex].choices[ind]
            })
        }
        
    }
    showResult():void{
        if(resultDiv)resultDiv.classList.toggle('hidden')
            this.bestScore = Math.max(this.totalScore,this.bestScore);
        if(bestScoreDiv)bestScoreDiv.innerHTML = `Best Score ${this.bestScore}`
        if(resultDiv)resultDiv.innerHTML = `Total Score: ${this.totalScore} 🥳🥳🎊🎉`
        if(questionDisplaySection)questionDisplaySection.classList.toggle('hidden')
        if(resetBtn)resetBtn.classList.toggle('hidden')

    }
    reset():void{
        this.questionIndex = -1;
        this.totalScore = 0;
    }
}

const player = new Quiz(questionsData);

const checkOptionSelection = ():number=>{
    const userSelection = document.querySelector('input[name="option"]:checked') as HTMLInputElement;
    if(!userSelection){
        alert('Please Select given option');
        return -1;
    }
    userSelection.checked  = false;
    return +userSelection.value;
}


submitBtn?.addEventListener('click',()=>{
    const index:number = checkOptionSelection();
    if(index!==-1){
        const questionIndex:number =    player.evaluateAnswer(index);
        console.log(questionIndex)
     if(questionIndex!==questionsData.length-1){
        player.renderQuestion()
     }
     else{
        player.showResult();
     }
    
    }
})


resetBtn?.addEventListener('click',()=>{
player.reset();
player.showResult();
player.renderQuestion();
})
