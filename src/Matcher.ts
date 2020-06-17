export type Pair = [string, string]
export type Round = Pair[]
export type Rounds = Round[]
export type Matcher = (participants: string[]) => Rounds

export const matcher: Matcher = (participants: string[]) => {
    let rounds: Rounds = []

    let names = Array.from(participants)

    for (let i = 0; i < getNumberOfRounds(names); i++) {
        rounds.push(generatePairsForRound(names))
        names = rotatePairs(names)
    }

    return rounds
}

const getNumberOfRounds = (names: string[]): number => {
    if (names.length < 2) {
        return 0
    }
    else if (isEven(names)) {
        return names.length - 1
    }

    return names.length
}

const isEven = (names: string[]): boolean => {
    return names.length % 2 === 0
}

function generatePairsForRound(names: string[]) {
    const numberOfPairs = names.length / 2

    const groupA = names.slice(0, numberOfPairs)
    const groupB = names.slice(numberOfPairs, names.length).reverse()

    let round: Round = []
    groupA.forEach((_, index) => {
        let pair: Pair = [
            groupA[index],
            groupB[index]
        ]
        round.push(pair)
    })

    if (!isEven(names)) {
        // The empty string is used to denote that someone will sit out each round because there is
        // an odd number of participants
        round.push([groupB[groupB.length - 1], ''])
    }
    return round
}

function rotatePairs(names: string[]) {
    if (isEven(names)) {
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

