const e = document.getElementById("options");
const result = document.getElementById("result");
const multipleOptionSelect = document.getElementById('multiple-options');
const yourGun = document.getElementById('your-gun');

const gunInput = document.getElementById("gun-input")

const selectyourGunButton = document.getElementById('select-button');
const multipleGameButton = document.getElementById('multiple-game-button');
const startButton = document.getElementById('start-button');
const guns = []

let gunsInTheGame = []
let player = ''
let playerScore = 0

const data = {
    "scissors": {
        enemy: 'rock'
    },
    "rock": {
        enemy: 'paper'
    },
    "paper": {
        enemy: 'scissors'
    },
}

function computerWin() {
    result.innerText = 'Bilgisayarin secimi ' + data[e.value].enemy + ' kaybettiniz'
}

function randomGame() {
    const randomElement = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
    if (randomElement === e.enemy) {
        result.innerText = 'bilgisayar ' + randomElement + ' oynadi, berabere kaldin'
    } else if (randomElement === data[e.value].enemy) {
        console.log('kaybettin')
        result.innerText = 'bilgisayar ' + randomElement + ' oynadi, kaybettin'
    } else {
        result.innerText = 'bilgisayar ' + randomElement + ' oynadi, kazandin'
    }
}

function readFile(filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .catch(error => console.log(error));
}

function getPlayerScoreFromFileContent(content, player) {
    const splitedData = content.split(",")
    const score = splitedData.find((i) => i.includes(player))
    return score.split('=')[1].length > 0 ? Number(score.split('=')[1]) : 0
}

function loadOptionData(list) {
    list.forEach((o) => {
        multipleOptionSelect.add(new Option(o, o));
    })
    multipleOptionSelect.style.display = 'block';
    selectyourGunButton.style.display = 'block';
}

function getlistFromInput() {
    return gunInput.value.split(',')
}

async function openMultipleGame() {
    player = prompt("Please enter your name");
    const inputValues = getlistFromInput()
    let fileContent = await readFile("./rating.txt")
    loadOptionData(inputValues)
    multipleGameButton.style.display = 'none';
    playerScore = getPlayerScoreFromFileContent(fileContent, player)
}

function selectyourGun() {
    const selectedGuns = [...multipleOptionSelect.options]
        .filter(option => option.selected)
        .map(option => option.value);
    selectedGuns.forEach((o) => {
        yourGun.add(new Option(o, o));
    })
    gunsInTheGame = selectedGuns
    selectedYourGun = yourGun.value
    yourGun.style.display = 'block';
    selectyourGunButton.style.display = 'none';
    startButton.style.display = 'block';
}

function startGame() {
    let winList = []
    const randomGun = gunsInTheGame[Math.floor(Math.random() * gunsInTheGame.length)]
    const gunIndex = gunsInTheGame.findIndex((i) => i === yourGun.value)
    for (let i = 0; i < (gunsInTheGame.length - 1) / 2; i++) {
        winList.push(gunsInTheGame[(gunIndex + i + 1) % gunsInTheGame.length])
    }
    if (winList.includes(randomGun)) {
        alert(`${player} => Sorry, but the computer chose ${randomGun}. Your score ${playerScore}`)
    }
    else if (randomGun === yourGun.value) {
        playerScore += 50
        alert(`${player} => The computer chose ${randomGun}. scoreless. Your score ${playerScore}`)
    }
    else {
        playerScore += 100
        alert(`${player} => Well done. The computer chose ${randomGun} and failed.  Your score ${playerScore}`)
    }
}
