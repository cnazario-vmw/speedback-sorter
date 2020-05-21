import React from 'react'
import {cleanup, fireEvent, render, RenderResult} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App, {Matcher} from './App'

describe('Speedback Admin', () => {
    let component: RenderResult
    let participantInput: HTMLInputElement

    beforeEach(() => {
        component = render(<App matcher={matcherStubFactory}/>)
        participantInput = component.getByLabelText('Participant') as HTMLInputElement
    });

    it('has no participants when started', () => {
        expect(participantInput.value).toBe('')
        expect(component.getByTestId('participants').textContent).toBe('')
    })

    it('allows participants to be added', () => {
        enterParticipantName(participantInput, 'Charlie')
        enterParticipantName(participantInput, 'Simon')

        expect(participantInput.value).toBe('')
        expect(component.getByTestId('participants').textContent).toContain('Charlie')
        expect(component.getByTestId('participants').textContent).toContain('Simon')
    })

    it('has no rounds with only 1 participant', () => {
        enterParticipantName(participantInput, 'Charlie')

        expect(() => {
            component.getByText('Round 1')
        }).toThrow()
    })

    it('calls the matcher when a new name is entered', () => {
        cleanup() // doing this to avoid errors with duplicate rendering

        const matcherSpy = jest.fn(() => [])

        const component = render(<App matcher={matcherSpy}/>)
        const participantInput = component.getByLabelText('Participant') as HTMLInputElement
        enterParticipantName(participantInput, 'Charlie')

        expect(matcherSpy).toHaveBeenCalledTimes(1)
        expect(matcherSpy).toHaveBeenCalledWith(['Charlie'])
    })

    it('has 1 round when there are 2 participants', () => {
        enterParticipantName(participantInput, 'Charlie')
        enterParticipantName(participantInput, 'Simon')

        expect(component.getByText('Round 1')).toBeInTheDocument()
        expect(component.getByText('Charlie and Simon')).toBeInTheDocument()
    })

    it('has 3 rounds when there are 4 participants', () => {
        enterParticipantName(participantInput, 'Charlie')
        enterParticipantName(participantInput, 'Simon')
        enterParticipantName(participantInput, 'Jennifer')
        enterParticipantName(participantInput, 'Samuel')

        expect(component.getByText('Round 1')).toBeInTheDocument()
        expect(component.getByText('Round 2')).toBeInTheDocument()
        expect(component.getByText('Round 3')).toBeInTheDocument()
        expect(component.getByText('Charlie and Simon')).toBeInTheDocument()
        expect(component.getByText('Samuel and Jennifer')).toBeInTheDocument()
        expect(component.getByText('Charlie and Samuel')).toBeInTheDocument()
        expect(component.getByText('Simon and Jennifer')).toBeInTheDocument()
        expect(component.getByText('Charlie and Jennifer')).toBeInTheDocument()
        expect(component.getByText('Simon and Samuel')).toBeInTheDocument()
    })

})

const enterParticipantName = (participantInput: HTMLInputElement, name: string) => {
    fireEvent.change(participantInput, {
        target: {value: name}
    })
    fireEvent.keyDown(participantInput, {key: 'Enter', code: 'Enter'})
}

const matcherStubFactory: Matcher = (participants: string[]) => {
    return (participants.length < 2) ? noPairMatcherStub(participants)
        : (participants.length == 2) ? onePairMatcherStub(participants)
        : multiPairMatcherStub(participants)
}

const noPairMatcherStub: Matcher = () => {
    return []
}

const onePairMatcherStub: Matcher = () => {
    return [
        [
            ['Charlie', 'Simon']
        ]
    ]
}

const multiPairMatcherStub: Matcher = () => {
    return [
        [
            ['Charlie', 'Simon'],
            ['Samuel', 'Jennifer']
        ],
        [
            ['Charlie', 'Samuel'],
            ['Simon', 'Jennifer']
        ],
        [
            ['Charlie', 'Jennifer'],
            ['Simon', 'Samuel']
        ]
    ]
}

