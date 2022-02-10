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
console.log(cardsAvailable);

//Create user object with cards, distance traveled, and room
const user = {
    cards: [],
    distanceTraveled: 0,
    room: null
}

//Deal cards to user

//Automatically check off dealt cards on notebook

//Deal cards to computer

//Create function to simulate dice rolling

//Come up with distances between rooms

//Add event listener to "Move To..." button to allow user to move

//Simulate computer moving

//Keep track of whose turn it is

//Add event listener to "Secret Passageway" button

//Add event listener to "Make a Suggestion" button

//Select and show user cards to refute his/her suggestion if possible

//Simulate computer crossing off cards on its notebook (not visible to user)

//Add event listener to "Make an Accusation" button

//Simulate computer making accusation