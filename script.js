
const phrases = [
    'Traveling became almost extinct during the pandemic. This made him feel like an old-style rootbeer float smells. Garlic ice-cream was her favorite.',
    'The bird had a belief that it was really a groundhog. As he looked out the window, he saw a clown walk by. The glacier came alive as the climbers hiked closer.',
    'The gloves protect my feet from excess work. The wake behind the boat told of the past while the open sea for told life in the unknown future. He found his art never progressed when he literally used his sweat and tears.',
    "He decided to fake his disappearance to avoid jail. The fog was so dense even a laser decided it wasn't worth the effort. He knew it was going to be a bad day when he saw mountain lions roaming the streets.",
    'Malls are great places to shop; I can find everything I need under one roof. The white water rafting trip was suddenly halted by the unexpected brick wall. She moved forward only because she trusted that the ending she now was going through must be followed by a new beginning.',
    "Honestly, I didn't care much for the first season, so I didn't bother with the second. Tom got a small piece of pie. The secret code they created made no sense, even to them.",
    'The mysterious diary records the voice. I am counting my calories, yet I really want dessert. The paintbrush was angry at the color the artist chose to use.',
    'It was difficult for Mary to admit that most of her workout consisted of exercising poor judgment. He strives to keep the best lawn in the neighborhood. Tomatoes make great weapons when water balloons aren’t available.',
    'The light in his life was actually a fire burning all around him. She tilted her head back and let whip cream stream into her mouth while taking a bath. Bill ran from the giraffe toward the dolphin.',
    'Siri became confused when we reused to follow her directions. The water flowing down the river didn’t look that powerful from the car. Combines are no longer just for farms.',
    "He had a wall full of masks so she could wear a different face every day. The bullet pierced the window shattering it before missing Danny's head by mere millimeters. Best friends are like old tomatoes and shoelaces.",
    'He shaved the peach to prove a point. Greetings from the real universe. Not all people who wander are lost.'
];

let words = [];
let wordIndex = 0;

let startTime = Date.now;

const phraseElement = document.getElementById('phrase');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButtonElement = document.getElementById('start');
const lowestTimeElement = document.getElementById('lowest-time');

document.addEventListener('DOMContentLoaded', () =>{
    localStorage.setItem('lowestTime', 9999);
})

startButtonElement.addEventListener('click', () => {

    const phraseIndex = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[phraseIndex];
    words = phrase.split(' ');
    wordIndex = 0;

    const spanWords = words.map(function(word) { return `<span>${word} </span>` });
    phraseElement.innerHTML = spanWords.join('');
    phraseElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';

    typedValueElement.type = 'text';
    typedValueElement.value = '';
    typedValueElement.focus();

    startButtonElement.style.display = 'none';

    startTime = new Date().getTime();

});

typedValueElement.addEventListener('input', () => {

    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATUALTIONS! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;

        if ((elapsedTime / 1000) < localStorage.getItem('lowestTime')){
            localStorage.setItem('lowestTime', elapsedTime / 1000);
        }
        lowestTimeElement.innerText = `Current Sessions Lowest Time: ${localStorage.getItem('lowestTime')} seconds.`;

        typedValueElement.type = 'hidden';

        startButtonElement.style.display = '';
        startButtonElement.innerText = 'Play Again?'

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {

        typedValueElement.value = '';
        wordIndex++;

        for(const wordElement of phraseElement.childNodes){
            wordElement.className = '';
        }

        phraseElement.childNodes[wordIndex].className = 'highlight';

    } else if (currentWord.startsWith(typedValue)) {

        typedValueElement.className = 'form-control';

    } else {
        
        typedValueElement.className = 'form-control error';

    }

});