import matcher, {Pair, Round, Rounds} from './Matcher'
import 'jest-extended'

const extractAndSortAllPairs = (rounds: Rounds) => {
    let allPairs: Pair[] = []

    rounds.forEach(round => {
        round.forEach(pair => {
            allPairs.push(pair.sort())
        })
    })

    return allPairs
}

const extractAndSortAllParticipants = (round: Round) => {
    let allParticipants: string[] = []

    round.forEach(pair => {
        allParticipants.push(pair[0])
        allParticipants.push(pair[1])
    })

    return allParticipants.sort()
}

describe('Matcher', () => {
    describe('when there are less than 2 participants', () => {
        it('creates 0 rounds when there are no participants', () => {
            expect(matcher([])).toEqual([])
        })

        it('creates 0 rounds when there is 1 participant', () => {
            expect(matcher(['Charlie'])).toEqual([])
        })
    })

    describe('when there are 2 participants', () => {
        let participants = ['Charlie', 'Simon']

        it('creates 1 round', () => {
            expect(matcher(participants)).toBeArrayOfSize(1)
        })

        it('creates 1 pair', () => {
            const uniquePairs = extractAndSortAllPairs(matcher(participants))

            expect(uniquePairs).toIncludeAllMembers([['Charlie', 'Simon']])
        })
    })

    describe('when there are 4 participants', () => {
        let participants = ['Charlie', 'Jennifer', 'Simon', 'Emma']

        it('creates 3 rounds', () => {
            expect(matcher(participants)).toBeArrayOfSize(3)
        })

        it('creates 6 unique pairs', () => {
            const uniquePairs = extractAndSortAllPairs(matcher(participants))

            expect(uniquePairs).toIncludeAllMembers([
                ['Charlie', 'Jennifer'],
                ['Charlie', 'Simon'],
                ['Charlie', 'Emma'],
                ['Jennifer', 'Simon'],
                ['Emma', 'Jennifer'],
                ['Emma', 'Simon']
            ])
        })
    })

    describe('when there are 5 participants', () => {
        const participants = ['Charlie', 'Jennifer', 'Simon', 'Emma', 'Bob']

        it('creates 5 rounds', () => {
            expect(matcher(participants)).toBeArrayOfSize(5)
        })

        it('creates 15 unique pairs', () => {
            const uniquePairs = extractAndSortAllPairs(matcher(participants))

            expect(uniquePairs).toIncludeAllMembers([
                ['Charlie', 'Jennifer'],
                ['Charlie', 'Simon'],
                ['Charlie', 'Emma'],
                ['Bob', 'Charlie'],
                ['', 'Charlie'],
                ['Jennifer', 'Simon'],
                ['Emma', 'Jennifer'],
                ['Bob', 'Jennifer'],
                ['', 'Jennifer'],
                ['Emma', 'Simon'],
                ['Bob', 'Simon'],
                ['', 'Simon'],
                ['Bob', 'Emma'],
                ['', 'Emma'],
                ['', 'Bob']
            ])
        })

        it('should only have 1 participant in each round', () => {
            const rounds = matcher(participants)

            rounds.forEach(round => {
                let roundParticipants = extractAndSortAllParticipants(round)
                roundParticipants.shift()
                expect(roundParticipants).toEqual(participants.sort())
            })
        })
    })
})
