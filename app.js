//Create card deck using 4 arrays: Suspects, Weapons, Rooms, and Cards Available
let suspects = ['Colonel Mustard', 'Professor Plum', 'Mr. Green', 'Mrs. Peacock', 'Miss Scarlet', 'Mrs. White'];
let weapons = ['Knife', 'Candlestick', 'Revolver', 'Rope', 'Lead Pipe', 'Wrench', 'Poison'];
let rooms = ['Hall', 'Lounge', 'Dining Room', 'Kitchen', 'Ballroom', 'Conservatory', 'Billiards Room', 'Library', 'Study'];
let cardsAvailable = ['Colonel Mustard', 'Professor Plum', 'Mr. Green', 'Mrs. Peacock', 'Miss Scarlet', 'Mrs. White', 'Knife', 'Candlestick', 'Revolver', 'Rope', 'Lead Pipe', 'Wrench', 'Poison', 'Hall', 'Lounge', 'Dining Room', 'Kitchen', 'Ballroom', 'Conservatory', 'Billiards Room', 'Library', 'Study'];

//Take one card from each deck and place it in a secret envelope
let secretEnvelope = [];

let suspectIndex = Math.floor(Math.random()*6);
let selectedSuspect = suspects[suspectIndex];
secretEnvelope.push(selectedSuspect);

let weaponIndex = Math.floor(Math.random()*7);
let selectedWeapon = weapons[weaponIndex];
secretEnvelope.push(selectedWeapon);

let roomIndex = Math.floor(Math.random()*9);
let selectedRoom = rooms[roomIndex];
secretEnvelope.push(selectedRoom);

for(let s=0; s<cardsAvailable.length; s++){
    if(cardsAvailable[s] === selectedSuspect || cardsAvailable[s] === selectedWeapon || cardsAvailable[s] === selectedRoom){
        cardsAvailable.splice(s,1)
    }
}


//Create user object with cards, distance traveled, and room
const user = {
    cards: [],
    distanceTraveled: 0,
    room: null
}
const computer = {
    cards:[],
    distanceTraveled: 0
}

//Deal cards to both user and computer
function dealCards(player) {
    let deal = [];
    for(let x=0; x<5; x++) {
        let index = Math.floor(Math.random()*cardsAvailable.length);
        deal.push(cardsAvailable[index]);
        cardsAvailable.splice(index,1);
    }
    player.cards = deal
}
dealCards(user)
dealCards(computer)

//Automatically check off dealt cards on notebook
document.querySelector('.card1').textContent = `${user.cards[0]}`
document.querySelector('.card2').textContent = `${user.cards[1]}`
document.querySelector('.card3').textContent = `${user.cards[2]}`
document.querySelector('.card4').textContent = `${user.cards[3]}`
document.querySelector('.card5').textContent = `${user.cards[4]}`
//I looked up how to use javascript to check a box in HTML form. I found it at https://www.w3docs.com/snippets/javascript/how-to-check-and-uncheck-checkbox-with-javascript-and-jquery.html
function check(){
    for(let m=0; m<user.cards.length; m++){
        let box = document.getElementById(`${user.cards[m]}`);
        box.checked = true;
    }
}
check();

//Create function to simulate dice rolling
function rollDice(){
    let die1 = Math.ceil(Math.random()*6);
    let die2 = Math.ceil(Math.random()*6);
    return die1 + die2;
}

//Come up with distances between rooms
function calculateDistance(){
    let distanceNeeded;
    if(user.room === null){
        distanceNeeded = 13;
    } else if(user.room === 'Lounge' || user.room === 'Conservatory' || user.room === 'Kitchen' || user.room === 'Study'){
        distanceNeeded = 36;
    } else if(user.room === 'Dining Room' || user.room === 'Ballroom' || user.room === 'Billiards Room' || user.room === 'Library' || user.room === 'Hall'){
        distanceNeeded = 25;
    }
    return distanceNeeded;
}

//Add event listener to "Move To..." button to allow user to move
document.querySelector('#move').addEventListener('click', () => {
    //Credit goes to https://skillforge.com/how-to-get-user-input-in-javascript/ for showing me how to extract the value the user types in
    let room = document.getElementById('suspectedRoom').value;
    let roll = rollDice();
    let distance = calculateDistance();
    if(user.distanceTraveled + roll >= distance){
        user.room = room;
        user.distanceTraveled = 0;
        alert(`You are now in the ${user.room}. Select suspect and weapon, then click the suggestion button to see if your guess is correct.`)
    } else{
        alert('Not there yet! Click the move button to roll again.');
        user.distanceTraveled += roll
    }
    //Simulate computer moving
    let computerRoll = rollDice();
    let computerDistance = calculateComputerDistance();
    if(computer.distanceTraveled + computerRoll >= computerDistance){
        addCards();
        computer.distanceTraveled = 0;
    } else{
        computer.distanceTraveled += computerRoll;
    }
    computerAccusation();
})



//Add event listener to "Secret Passageway" button
document.querySelector('#secret').addEventListener('click', () => {
    if(user.room === 'Kitchen'){
        user.room = 'Study'
        document.getElementById('suspectedRoom').value = 'Study'
    } else if(user.room === 'Study'){
        user.room = 'Kitchen'
        document.getElementById('suspectedRoom').value = 'Kitchen'
    } else if(user.room === 'Lounge'){
        user.room = 'Conservatory'
        document.getElementById('suspectedRoom').value = 'Conservatory'
    } else if(user.room === 'Conservatory'){
        user.room = 'Lounge'
        document.getElementById('suspectedRoom').value = 'Lounge'
    } else{
        alert('There is no secret passageway in this room');
    }
})

//Add event listener to "Make a Suggestion" button
document.querySelector('#suggestion').addEventListener('click', () => {
    if(document.getElementById('suspectedRoom').value !== user.room){
        alert('You must be in the room to suggest it was the scene of the murder');
    } else{
        showCards();
    }
})

//Select and show user cards to refute his/her suggestion if possible
function showCards(){
    let suspectedSuspect = document.getElementById('suspectedSuspect').value;
    let suspectedWeapon = document.getElementById('suspectedWeapon').value;
    let suspectedRoom = user.room;
    if(secretEnvelope.indexOf(suspectedSuspect) !== -1 && secretEnvelope.indexOf(suspectedWeapon) !== -1 && secretEnvelope.indexOf(suspectedRoom) !== -1){
        alert('I cannot prove you wrong. Now might be a good time to click the accusation button');
    } else{
        let cardsToShow = [];
        if(secretEnvelope.indexOf(suspectedSuspect) === -1 && suspects.indexOf(suspectedSuspect) !== -1){
            cardsToShow.push(suspectedSuspect);
        }
        if(secretEnvelope.indexOf(suspectedWeapon) === -1 && weapons.indexOf(suspectedWeapon) !== -1){
            cardsToShow.push(suspectedWeapon);
        }
        if(secretEnvelope.indexOf(suspectedRoom) === -1 && rooms.indexOf(suspectedRoom) !== -1){
            cardsToShow.push(suspectedRoom);
        }
        alert(`I can prove you wrong. Check off these values in your notebook: ${cardsToShow}`)
    }
}

//Simulate computer crossing off cards on its notebook (not visible to user)
let cardsAvailableToComputer = cardsAvailable.concat(user.cards);
function addCards(){
    let randomCardIndex = Math.floor(Math.random()*cardsAvailableToComputer.length);
    let randomCard = cardsAvailableToComputer[randomCardIndex];
    if(computer.cards.indexOf(randomCard) === -1){
        computer.cards.push(randomCard);
        cardsAvailableToComputer.splice(randomCardIndex, 1);
        console.log(computer.cards);
        console.log(cardsAvailableToComputer);
    }
}

//Add event listener to "Make an Accusation" button
let wins = 0;
let losses = 0;


document.querySelector('#accusation').addEventListener('click', () => {
    let suspectedSuspect = document.getElementById('suspectedSuspect').value;
    let suspectedWeapon = document.getElementById('suspectedWeapon').value;
    let suspectedRoom = user.room;
    if(suspectedSuspect === selectedSuspect && suspectedWeapon === selectedWeapon && suspectedRoom === selectedRoom){
        alert('You win! Congratulations on helping put a dangerous criminal behind bars!');
        wins ++
        document.querySelector('#wins').textContent = `Wins: ${wins}`
    } else{
        alert('You got it wrong! You are out of the game.');
        losses ++
        document.querySelector('#losses').textContent = `Losses: ${losses}`
    }
})

//Simulate computer making accusation
function computerAccusation(){
    if(computer.cards.length === 19){
        alert('The computer beat you to it!');
        losses ++
        document.querySelector('#losses').textContent = `Losses: ${losses}`
    }
}
//Account for user selected challenge level
function calculateComputerDistance(){
    let level = document.querySelector('#level').value;
    let computerDistanceNeeded;
    switch(level){
        case 'easy':
            computerDistanceNeeded = 18;
        break;
        case 'medium':
            computerDistanceNeeded = 12;
        break;
        case 'hard':
            computerDistanceNeeded = 1;
        break;
    }
    return computerDistanceNeeded;
}
//Choose music based on difficulty level
function chooseMusic(){
    let level = document.querySelector('#level').value;
    let soundURL;
    switch(level){
        case 'easy':
            soundURL = './assets/music/soundscrate-another-late-night.mp3'
        break;
        case 'medium':
            soundURL = './assets/music/soundscrate-tread-carefully.mp3'
        break;
        case 'hard':
            soundURL = './assets/music/Bensound - Sound Of Silence - Countdown/Sound Of Silence - Countdown.mp3'
        break;
    }
    return soundURL;
}
//Credit goes to https://www.delftstack.com/howto/javascript/play-audio-javascript/#:~:text=Use%20.play%28%29%20to%20Play%20Audio%20Files%20in%20JavaScript.,Audio%28%27adf.wav%27%29%3B%20music.play%28%29%3B%20music.loop%20%3Dtrue%3B%20music.playbackRate%20%3D%202%3B%20music.pause%28%29%3Bqqazszdgfbgtyj for showing me how to use JS to play music
const music = new Audio(chooseMusic());

window.onload = () => {
    music.play();
    music.loop = true;
}
document.getElementById('level').addEventListener('change', () => {
    music.pause();
    music.src = chooseMusic();
    music.play();
})
