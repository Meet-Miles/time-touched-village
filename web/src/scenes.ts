import { Scene } from "./types/scene"

export const scenes: Scene[] = [
    {
        title: "Welcome Adventurers!",
        titleNarration: "/audio/mission-1/title.mp3",
        sceneNumber: 1,
        introductionText:
            "Hey, dino-friends! Welcome to our own prehistoric land. But wait—something's missing. What should we add first to make this place feel more like a real habitat?",
        introductionNarration: "/audio/mission-1/intro.mp3",
        choicesNarration: "/audio/mission-1/choices.mp3",
        choices: [
            {
                letter: "A",
                title: "Make a river",
                hint: "Water is essential for starting life!",
                narration: "/audio/mission-1/hint-a.mp3",
                correct: true,
            },
            {
                letter: "B",
                title: "Plant a forest",
                hint: "Forests are great, but they need water to grow! Try again.",
                narration: "/audio/mission-1/hint-b.mp3",
                correct: false,
            },
            {
                letter: "C",
                title: "Add dinosaurs",
                hint: "Whoa, slow down! Dinosaurs need water and food, and we don't have either yet!",
                narration: "/audio/mission-1/hint-c.mp3",
                correct: false,
            },
        ],
        correctAnswerText:
            "Great job! Rivers are the lifeblood of any ecosystem. Now we have a foundation for our prehistoric world!",
        correctAnswerNarration: "/audio/mission-1/correct.mp3",
        video: "/video/mission-1.mp4",
        music: "/audio/mission-1/music.mp3",
        collaborate: false,
        startImage: "/images/mission-1/start.png",
        endImage: "/images/mission-1/end.png",
    },
    {
        title: "The River's Flowing",
        titleNarration: "/audio/mission-2/title.mp3",
        sceneNumber: 2,
        introductionText:
            "Wow! Our river looks sooo cool! It's like the lifeblood of our new dino home. What should we add next?",
        introductionNarration: "/audio/mission-2/intro.mp3",
        choicesNarration: "/audio/mission-2/choices.mp3",
        choices: [
            {
                letter: "A",
                title: "Add trees around the river",
                hint: "Fertile land around water results in plants, that are also a food source.",
                narration: "/audio/mission-2/hint-a.mp3",
                correct: true,
            },
            {
                letter: "B",
                title: "Add fish in the river",
                hint: "Fish are fun, but let's think about what the larger environment needs first.",
                narration: "/audio/mission-2/hint-b.mp3",
                correct: false,
            },
            {
                letter: "C",
                title: "Build a waterfall",
                hint: "A waterfall is exciting but not essential. Let's focus on the basics!",
                narration: "/audio/mission-2/hint-c.mp3",
                correct: false,
            },
        ],
        correctAnswerText:
            "Excellent! Trees provide shade, shelter, and are also a food source for some creatures. Our ecosystem is coming to life!",
        correctAnswerNarration: "/audio/mission-2/correct.mp3",
        video: "/video/mission-2.mp4",
        music: "/audio/mission-2/music.mp3",
        collaborate: false,
        startImage: "/images/mission-2/start.png",
        endImage: "/images/mission-2/end.png",
    },
    {
        title: "Green Galore",
        titleNarration: "/audio/mission-3/title.mp3",
        sceneNumber: 3,
        introductionText:
            "Look at those trees! They seem so happy by the river! Now, what else can make this place even cooler?",
        introductionNarration: "/audio/mission-3/intro.mp3",
        choicesNarration: "/audio/mission-3/choices.mp3",
        choices: [
            {
                letter: "A",
                title: "Bring in Triceratops",
                hint: "It's a dino world after all.",
                narration: "/audio/mission-3/hint-a.mp3",
                correct: true,
            },
            {
                letter: "B",
                title: "Add some flowers",
                hint: "Flowers are pretty, but not essential. It's time to add some dinosaurs!",
                narration: "/audio/mission-3/hint-b.mp3",
                correct: false,
            },
            {
                letter: "C",
                title: "Introduce a flock of birds",
                hint: "There are plenty of birds. Time for some dino action!",
                narration: "/audio/mission-3/hint-c.mp3",
                correct: false,
            },
        ],
        correctAnswerText:
            "Awesome! With the Triceratops joining our village, it's starting to feel like a real dinosaur world!",
        correctAnswerNarration: "/audio/mission-3/correct.mp3",
        video: "/video/mission-3.mp4",
        music: "/audio/mission-3/music.mp3",
        collaborate: true,
        startImage: "/images/mission-3/start.png",
        endImage: "/images/mission-3/end.png",
    },
    {
        title: "Dino Snacks",
        titleNarration: "/audio/mission-4/title.mp3",
        sceneNumber: 4,
        introductionText:
            "Okay, time for dinner! Our Triceratops is here, but it looks hungry. What should we feed it?",
        introductionNarration: "/audio/mission-4/intro.mp3",
        choicesNarration: "/audio/mission-4/choices.mp3",
        choices: [
            {
                letter: "A",
                title: "Fruits and flowers",
                hint: "Fruits and flowers are lovely, but not a Triceratops' favorite. Try again!",
                narration: "/audio/mission-4/hint-a.mp3",
                correct: false,
            },
            {
                letter: "B",
                title: "Add another kind of plant-eating dino",
                hint: "Adding another herbivore might make it crowded. Think about what Triceratops like to munch on!",
                narration: "/audio/mission-4/hint-b.mp3",
                correct: false,
            },
            {
                letter: "C",
                title: "Plant prehistoric plants",
                hint: "Triceratops are vegetarians, but don't eat fruit.",
                narration: "/audio/mission-4/hint-c.mp3",
                correct: true,
            },
        ],
        correctAnswerText:
            "Fantastic! Prehistoric plants are a Triceratops' favorite. Looks like dinner is served!",
        correctAnswerNarration: "/audio/mission-4/correct.mp3",
        video: "/video/mission-4.mp4",
        music: "/audio/mission-4/music.mp3",
        collaborate: false,
        startImage: "/images/mission-4/start.png",
        endImage: "/images/mission-4/end.png",
    },
    {
        title: "Dino Family",
        titleNarration: "/audio/mission-5/title.mp3",
        sceneNumber: 5,
        introductionText:
            "Yay! Our Triceratops friends are well-fed! How many Triceratops should join us in this adventure?",
        introductionNarration: "/audio/mission-5/intro.mp3",
        choicesNarration: "/audio/mission-5/choices.mp3",
        choices: [
            {
                letter: "A",
                title: "Just one",
                hint: "Just one? Triceratops like company! Try again.",
                narration: "/audio/mission-5/hint-a.mp3",
                correct: false,
            },
            {
                letter: "B",
                title: "A whole family",
                hint: "Remember, we found a family of 5!",
                narration: "/audio/mission-5/hint-b.mp3",
                correct: true,
            },
            {
                letter: "C",
                title: "A herd with other species",
                hint: "Let's not get too crowded! A family of Triceratops is just right.",
                narration: "/audio/mission-5/hint-c.mp3",
                correct: false,
            },
        ],
        correctAnswerText:
            "Excellent choice! A family of Triceratops will ensure that our dinosaurs are social and happy!",
        correctAnswerNarration: "/audio/mission-5/correct.mp3",
        video: "/video/mission-5.mp4",
        music: "/audio/mission-5/music.mp3",
        collaborate: false,
        startImage: "/images/mission-5/start.png",
        endImage: "/images/mission-5/end.png",
    },
    {
        title: "Aesthetics and Shelter",
        titleNarration: "/audio/mission-6/title.mp3",
        sceneNumber: 6,
        introductionText:
            "Our Triceratops family looks so happy! How can we make their environment even more inviting?",
        introductionNarration: "/audio/mission-6/intro.mp3",
        choicesNarration: "/audio/mission-6/choices.mp3",
        choices: [
            {
                letter: "A",
                title: "Add some decorative rocks",
                hint: "Triceratops could use rocks to rest and get shelter!",
                narration: "/audio/mission-6/hint-a.mp3",
                correct: true,
            },
            {
                letter: "B",
                title: "Plant more trees",
                hint: "We already have enough trees, let's try something new!",
                narration: "/audio/mission-6/hint-b.mp3",
                correct: false,
            },
            {
                letter: "C",
                title: "Add flowers",
                hint: "Flowers are beautiful but let's consider the Triceratops' needs first!",
                narration: "/audio/mission-6/hint-c.mp3",
                correct: false,
            },
        ],
        correctAnswerText:
            "Beautiful! Adding rocks not only enhances the landscape but also provides additional shelter for our Triceratops family!",
        correctAnswerNarration: "/audio/mission-6/correct.mp3",
        video: "/video/mission-6.mp4",
        music: "/audio/mission-6/music.mp3",
        collaborate: false,
        startImage: "/images/mission-6/start.png",
        endImage: "/images/mission-6/end.png",
    },
    {
        title: "T-Rex Alert! Family Council Time",
        titleNarration: "/audio/mission-7/title.mp3",
        sceneNumber: 7,
        introductionText:
            "Emergency, emergency! A T-Rex is coming and he's not here for a playdate! This is a big decision, so talk it over with your family.",
        introductionNarration: "/audio/mission-7/intro.mp3",
        choicesNarration: "/audio/mission-7/choices.mp3",
        choices: [
            {
                letter: "A",
                title: "Add more rocks",
                hint: "What did we just add already?",
                narration: "/audio/mission-7/hint-a.mp3",
                correct: true,
            },
            {
                letter: "B",
                title: "Introduce another predator",
                hint: "Another predator? That could make things worse!",
                narration: "/audio/mission-7/hint-b.mp3",
                correct: false,
            },
            {
                letter: "C",
                title: "Make a trap",
                hint: "A trap could be dangerous for our Triceratops too. Let's find a safer way!",
                narration: "/audio/mission-7/hint-c.mp3",
                correct: false,
            },
        ],
        correctAnswerText:
            "Bravo! Adding more rocks kept everyone safe, including our Triceratops family. You've successfully navigated this prehistoric adventure!",
        correctAnswerNarration: "/audio/mission-7/correct.mp3",
        video: "/video/mission-7.mp4",
        music: "/audio/mission-7/music.mp3",
        collaborate: true,
        startImage: "/images/mission-7/start.png",
        endImage: "/images/mission-7/end.png",
    },
]
