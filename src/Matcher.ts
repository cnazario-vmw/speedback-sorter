type Pair = [string, string]
type Round = Pair[]
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
        let round = matchPairs(names, isEven)
        rounds.push(round)
        names = rotatePairs(names, isEven)
    }

    return rounds
}

function matchPairs(names: string[], isEven: boolean) {
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
        const next = names.pop() as string
        const head = names.shift() as string
        names = [head, next, ...names]
    } else {
        const next = names.pop() as string
        names = [next, ...names]
    }

    return names
}

export default matcher
