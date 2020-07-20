let quizData;
let quizNum = 1;
let answerNum = 0;
const quizAllNum = 10;

const startQuiz = () => {

	fetch('https://opentdb.com/api.php?amount=10')
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
		quizData = myJson.results;
		questions(); //第1問目
	});
	
	const message = document.getElementById('message');
	message.textContent = '取得中';

	const contents = document.getElementById('contents');
	contents.textContent = '少々お待ちください';
	
	const startButton = document.getElementById('start-button');
	startButton.setAttribute('style', 'display:none;');
	
}

const questions = () => {


	const header = document.getElementById('header');
	const contents = document.getElementById('contents');
	const buttons = document.getElementById('buttons');
	
	
	//初期化
	for (let i = header.childNodes.length - 1; i >= 0; i--) {
		header.removeChild(header.childNodes[i]);
	}
	
	for (let i = contents.childNodes.length - 1; i >= 0; i--) {
		contents.removeChild(contents.childNodes[i]);
	}
	for (let i = buttons.childNodes.length - 1; i >= 0; i--) {
		buttons.removeChild(buttons.childNodes[i]);
	}

	if (quizNum > quizAllNum) {
		result();
		return;
	}
	
	
	//問題No.
	const partElementNode = document.createElement('h2');
	const partName = '問題' + String(quizNum);
	const partTextNode = document.createTextNode(partName);
	partElementNode.appendChild(partTextNode);
	header.appendChild(partElementNode);
	
	//ジャンル
	const genreElementNode = document.createElement('h2');
	const genreName = '[ジャンル]' + quizData[quizNum-1].category;
	const genreTextNode = document.createTextNode(genreName);
	genreElementNode.appendChild(genreTextNode);
	header.appendChild(genreElementNode);
	
	//難易度
	const difficultyLevelElementNode = document.createElement('h2');
	const difficultyLevelName = '[難易度]' + quizData[quizNum-1].difficulty;
	const difficultyLevelTextNode = document.createTextNode(difficultyLevelName);
	difficultyLevelElementNode.appendChild(difficultyLevelTextNode);
	header.appendChild(difficultyLevelElementNode);
	
	//クイズ
	const quizName = quizData[quizNum-1].question;
	contents.textContent = quizName;
	
	//選択肢
	const correctAnswer = quizData[quizNum-1].correct_answer;
	let choices = [];
	choices.push(correctAnswer);

	for (i = 0; i < quizData[quizNum-1].incorrect_answers.length; i++) {
		choices.push(quizData[quizNum-1].incorrect_answers[i]);
	}
	
	
	
	let choiceElementNode;
	let choiceTextNode;
	
	for (j = 0; j <= i; j++)  {
		choiceElementNode = document.createElement('button');
		
		if (choices[j] === correctAnswer) {
			choiceElementNode.setAttribute('onclick', 'answerNum++; questions();');
		} else {
			choiceElementNode.setAttribute('onclick', 'questions();');
		}
		choiceTextNode = document.createTextNode(choices[j]);
		choiceElementNode.appendChild(choiceTextNode);
		buttons.appendChild(choiceElementNode);
	}
	
	quizNum++;
} 

const result = () => {
	
	const messageElementNode = document.createElement('h2');
	const messageName = 'あなたの正答数は' + answerNum + 'です！！';
	const messageTextNode = document.createTextNode(messageName);
	messageElementNode.appendChild(messageTextNode);
	header.appendChild(messageElementNode);
	
	const contents = document.getElementById('contents');
	contents.textContent = '再度チャレンジしたい場合は以下をクリック！！';
	
	homeElementNode = document.createElement('button');
	homeElementNode.setAttribute('onclick', 'window.location.reload(true);');
	homeTextNode = document.createTextNode('ホームに戻る');
	homeElementNode.appendChild(homeTextNode);
	buttons.appendChild(homeElementNode);
}