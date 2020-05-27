import matcher, {Rounds} from './Matcher'

describe('Matcher', () => {
    it('has 0 rounds when there are no participants', () => {
        expect(matcher([])).toEqual([])
    })

    it('has 0 rounds when there is 1 participant', () => {
        expect(matcher(['Charlie'])).toEqual([])
    })

    it('has 1 round and 1 pair when there are 2 participants', () => {
        const participants = [
            'Charlie',
            'Simon'
        ]
        const expectedRounds = [
            [
                ['Charlie', 'Simon']
            ]
        ]

        const actualRounds = matcher(participants)

        expect(actualRounds).toEqual(expectedRounds)
    })

    it ('has 3 rounds and two pairs when there are 4 participants', () => {
        const participants = [
            'Charlie',
            'Simon',
            'Samuel',
            'Jennifer'
        ]
        const expectedRounds = [
            [
                ['Charlie', 'Jennifer'],
                ['Simon', 'Samuel'],
            ],
            [
                ['Charlie', 'Samuel'],
                ['Jennifer', 'Simon']
            ],
            [
                ['Charlie', 'Simon'],
                ['Samuel', 'Jennifer']
            ]
        ]

        const actualRounds = matcher(participants)

        expect(actualRounds).toEqual(expectedRounds)
    })

    it('has 5 rounds and two pairs when there are 5 participants', function () {
        const participants = [
            'Charlie',
            'Simon',
            'Samuel',
            'Jennifer',
            'Bob'
        ]
        const expectedRounds = [
            [
                ['Charlie', 'Bob'],
                ['Simon', 'Jennifer'],
                ['Samuel', '']
            ],
            [
                ['Bob', 'Jennifer'],
                ['Charlie', 'Samuel'],
                ['Simon', '']
            ],
            [
                ['Jennifer', 'Samuel'],
                ['Bob', 'Simon'],
                ['Charlie', '']
            ],
            [
                ['Samuel', 'Simon'],
                ['Jennifer', 'Charlie'],
                ['Bob', '']
            ],
            [
                ['Simon', 'Charlie'],
                ['Samuel', 'Bob'],
                ['Jennifer', '']
            ]
        ]

        const actualRounds = matcher(participants)

        expect(actualRounds).toEqual(expectedRounds)
    })
})
