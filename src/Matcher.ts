export type Pair = [string, string]
export type Round = Pair[]
export type Rounds = Round[]
export type Matcher = (participants: string[]) => Rounds

export const matcher: Matcher = (participants: string[]) => {
    let rounds: Rounds = []

    if (!participants || participants.length < 2) {
        return rounds
    }

    let names = Array.from(participants)

    const isEven = (names.length % 2 === 0) ? true : false
    const numberOfRounds = isEven ? names.length - 1 : names.length

    for (let i = 0; i < numberOfRounds; i++) {
        rounds.push(generatePairsForRound(names, isEven))
        names = rotatePairs(names, isEven)
    }

    return rounds
}

function generatePairsForRound(names: string[], isEven: boolean) {
    const numberOfPairs = names.length / 2

    const topHalf = names.slice(0, numberOfPairs)
    const bottomHalf = names.slice(numberOfPairs, names.length).reverse()

    let round: Round = []
    topHalf.forEach((_, index) => {
        let pair: Pair = [
            topHalf[index],
            bottomHalf[index]
        ]
        round.push(pair)
    })

    if (!isEven) {
        round.push([bottomHalf[bottomHalf.length - 1], ''])
    }
    return round
}

function rotatePairs(names: string[], isEven: boolean) {
    if (isEven) {
        const next = names[names.length - 1]
        const head = names[0]
        names = [head, next, ...names.slice(1, -1)]
    } else {
        const next = names[names.length - 1]
        names = [next, ...names.slice(0, -1)]
    }

    return names
}

export default matcher

