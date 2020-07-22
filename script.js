let quizData;
let quizNum = 1;
let answerNum = 0;
const quizAllNum = 10;

const startQuiz = () => {
	fetch('https://opentdb.com/api.php?amount=10')
		.then((response) => {
			return response.json();
		})
		.then((myJson) => {
			quizData = myJson.results;
			questions(); //第1問目
		}
	);
	
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
	header.querySelectorAll('*').forEach(n => n.remove());
	contents.querySelectorAll('*').forEach(n => n.remove());
	buttons.querySelectorAll('*').forEach(n => n.remove());

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
	contents.textContent = quizData[quizNum-1].question;
	
	//選択肢
	const correctAnswer = quizData[quizNum-1].correct_answer;
	let choices = [];
	choices.push(correctAnswer);	//正解を取り出す

	for (let i = 0; i < quizData[quizNum-1].incorrect_answers.length; i++) {
		choices.push(quizData[quizNum-1].incorrect_answers[i]);	//不正解を取り出す
	}
	
	//クイズ作成
	let choiceElementNode;
	let choiceTextNode;
	let randomArrayElements = randomArrayElementNo(choices.length);	//配列の要素Noで構成された乱数を取得
	
	for (let i = 0; i < randomArrayElements.length; i++)  {
		choiceElementNode = document.createElement('button');
		
		if (choices[randomArrayElements[i]] === correctAnswer) {
			choiceElementNode.setAttribute('onclick', 'answerNum++; questions();');
		} else {
			choiceElementNode.setAttribute('onclick', 'questions();');
		}
		choiceTextNode = document.createTextNode(choices[randomArrayElements[i]]);
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
	
	const header = document.getElementById('header');
	header.appendChild(messageElementNode);
	
	const contents = document.getElementById('contents');
	contents.textContent = '再度チャレンジしたい場合は以下をクリック！！';
	
	const homeElementNode = document.createElement('button');
	homeElementNode.setAttribute('onclick', 'window.location.reload(true);');
	const homeTextNode = document.createTextNode('ホームに戻る');
	homeElementNode.appendChild(homeTextNode);
	
	const buttons = document.getElementById('buttons');
	buttons.appendChild(homeElementNode);
}

const randomArrayElementNo = (choicesLength) => {	//取り出す要素Noを無作為に決定
	let randomArrayNo;
	let returnArray = [];
	let uncheckArrayElementNo = []
	
	for (let i = 0; i < choicesLength; i++) {	//要素Noで構成した配列を作成
		uncheckArrayElementNo[i] = i;
	}
	
	for (let i = uncheckArrayElementNo.length - 1; i >= 0; i--) {
		randomArrayNo = Math.floor( Math.random() * uncheckArrayElementNo.length);
		returnArray.push(uncheckArrayElementNo[randomArrayNo]);
		uncheckArrayElementNo.splice(randomArrayNo, 1);	//取り出したものは削除して詰める
	}
	
	return returnArray;
}