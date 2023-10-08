interface Choice {
    letter: string
    title: string
    hint: string
    narration: string
    correct: boolean
}

interface Scene {
    title: string
    titleNarration: string
    sceneNumber: number
    introductionText: string
    introductionNarration: string
    choices: Choice[]
    choicesNarration: string
    correctAnswerText: string
    correctAnswerNarration: string
    video: string
    music: string
    collaborate: boolean
    startImage: string
    endImage: string
}

export type { Choice, Scene }
