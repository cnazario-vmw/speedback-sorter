import React from 'react'
import {render, fireEvent, RenderResult} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App, {Matcher} from './App'

describe('Speedback Sorter Application', () => {
    describe('Starting a new speedback', () => {
        let component: RenderResult;
        let participantInput: HTMLInputElement;

        beforeEach(function () {
            component = render(<App matcher={noPairMatcherStub}/>)
        })

        it('has no participants', () => {
            participantInput = component.getByLabelText('Participant') as HTMLInputElement

            expect(participantInput.value).toBe('')
            expect(component.getByTestId('participants').textContent).toBe('')
        })

        it('allows a participant to be added', () => {
            participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')

            expect(participantInput.value).toBe('')
            expect(component.getByTestId('participants').textContent).toContain('Charlie')
        })

        it('has no rounds', () => {
            expect(() => {
                component.getByText('Round 1')
            }).toThrow()
        })
    })

    describe('A speedback with one pair', () => {
        let component: RenderResult
        let participantInput: HTMLInputElement

        beforeEach(function () {
            component = render(<App matcher={onePairMatcherStub}/>)
        })

        it('has two participants', () => {
            participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')
            enterParticipantName(participantInput, 'Simon')

            expect(participantInput.value).toBe('')
            expect(component.getByTestId('participants').textContent).toContain('Charlie')
            expect(component.getByTestId('participants').textContent).toContain('Simon')
        })

        it('has one round', () => {
            expect(component.getByText('Round 1')).toBeInTheDocument()
        })

        it('has one pair', () => {
            expect(component.getByText('Charlie and Simon')).toBeInTheDocument()
        })
    })

    describe('A speedback with multiple pairs', () => {
        let component: RenderResult
        let participantInput: HTMLInputElement

        beforeEach(function () {
            component = render(<App matcher={multiPairMatcherStub} />)
        })

        it('has 4 participants', () => {
            participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')
            enterParticipantName(participantInput, 'Simon')
            enterParticipantName(participantInput, 'Samuel')
            enterParticipantName(participantInput, 'Jennifer')

            expect(component.getByTestId('participants').textContent).toContain('Charlie')
            expect(component.getByTestId('participants').textContent).toContain('Simon')
            expect(component.getByTestId('participants').textContent).toContain('Samuel')
            expect(component.getByTestId('participants').textContent).toContain('Jennifer')
        })

        it('has three rounds', () => {
            expect(component.getByText('Round 1')).toBeInTheDocument()
            expect(component.getByText('Round 2')).toBeInTheDocument()
            expect(component.getByText('Round 3')).toBeInTheDocument()
        })

        it('has 6 distinct pairs', () => {
            expect(component.getByText('Charlie and Simon')).toBeInTheDocument()
            expect(component.getByText('Samuel and Jennifer')).toBeInTheDocument()
            expect(component.getByText('Charlie and Samuel')).toBeInTheDocument()
            expect(component.getByText('Simon and Jennifer')).toBeInTheDocument()
            expect(component.getByText('Charlie and Jennifer')).toBeInTheDocument()
            expect(component.getByText('Simon and Samuel')).toBeInTheDocument()
        })
    })
})

const enterParticipantName = (participantInput: HTMLInputElement, name: string) => {
    fireEvent.change(participantInput, {
        target: {value: name}
    })
    fireEvent.keyDown(participantInput, {key: 'Enter', code: 'Enter'})
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

