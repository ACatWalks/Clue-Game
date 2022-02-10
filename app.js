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
const computer ={
    cards:[],
    distanceTraveled: 0,
    room: null
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
console.log(user.cards);
//Automatically check off dealt cards on notebook

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
console.log(rollDice())
//Come up with distances between rooms

//Add event listener to "Move To..." button to allow user to move

//Simulate computer moving

//Add event listener to "Secret Passageway" button

//Add event listener to "Make a Suggestion" button

//Select and show user cards to refute his/her suggestion if possible

//Simulate computer crossing off cards on its notebook (not visible to user)

//Add event listener to "Make an Accusation" button

//Simulate computer making accusation