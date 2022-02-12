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

console.log(secretEnvelope);

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
//Deal cards to user
function dealUserCards(){
    let userCards = [];
    for(let c=0; c<5; c++){
        let index = Math.floor(Math.random()*cardsAvailable.length);
        userCards.push(cardsAvailable[index]);
        cardsAvailable.splice(index,1);
    }
    user.cards = userCards;
}
dealUserCards();
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

//Deal cards to computer
function dealComputerCards(){
    let computerCards = [];
    for(let d=0; d<5; d++){
        let index = Math.floor(Math.random()*cardsAvailable.length);
        computerCards.push(cardsAvailable[index]);
        cardsAvailable.splice(index,1);
    }
    computer.cards = computerCards;
}
dealComputerCards();
console.log(computer.cards);
console.log(cardsAvailable);
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
    if(!room){
        alert('Please enter the room you would like to go to');
    } else if(rooms.indexOf(room) === -1){
        alert('That is not a valid room. Please select Hall, Lounge, Dining Room, Kitchen, Ballroom, Conservatory, Billiards Room, Library, or Study');
    } else{
        let roll = rollDice();
        let distance = calculateDistance();
        if(user.distanceTraveled + roll >= distance){
            user.room = room;
            user.distanceTraveled = 0;
            alert(`You are now in the ${user.room}. Type in suspect and weapon, then click the suggestion button to see if your guess is correct.`)
        } else{
            alert('Not there yet! Click the move button to roll again.');
            user.distanceTraveled += roll
        }
    }
    //Simulate computer moving
    let computerRoll = rollDice();
    if(computer.distanceTraveled + computerRoll >= 18){
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
    if(document.getElementById('suspectedSuspect').value === '' || document.getElementById('suspectedWeapon').value === ''){
        alert('Please fill in the suspect and weapon fields before clicking the suggestion button.')
    } else if(document.getElementById('suspectedRoom').value !== user.room){
        alert('You must be in the room to suggest it was the scene of the murder');
    } else if(suspects.indexOf(document.getElementById('suspectedSuspect').value) === -1 || weapons.indexOf(document.getElementById('suspectedWeapon').value) === -1){
        alert('Please enter a valid suspect and/or weapon');
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
function addCards(){
    let cardsAvailableToComputer = cardsAvailable.concat(user.cards);
    let randomCardIndex = Math.floor(Math.random()*14);
    let randomCard = cardsAvailableToComputer[randomCardIndex];
    if(computer.cards.indexOf(randomCard) === -1){
        computer.cards.push(randomCard);
        console.log(computer.cards);
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
