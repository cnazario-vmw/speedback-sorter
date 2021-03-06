import React from 'react'
import {fireEvent, render, RenderResult} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './SpeedbackAdmin'
import SpeedbackAdmin from './SpeedbackAdmin'

describe('Speedback Admin', () => {
    describe('when first started', () => {
        let component: RenderResult
        let participantInput: HTMLInputElement
        let matcherSpy: jest.Mock

        beforeEach(() => {
            matcherSpy = jest.fn(() => [])
            component = render(<App matcher={matcherSpy}/>)
            participantInput = component.getByLabelText('Participant') as HTMLInputElement
        });

        it('has no participants', () => {
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

            expect(component.queryByText('Round 1')).toBeNull()
        })

        it('calls the matcher after a name is entered', () => {
            enterParticipantName(participantInput, 'Charlie')

            expect(matcherSpy).toHaveBeenCalledTimes(1)
            expect(matcherSpy).toHaveBeenCalledWith(['Charlie'])
        })
    })

    describe('when there are 2 participants', () => {
        it('has 1 round', () => {
            const component = render(
                <App matcher={() => [
                    [
                        ['Charlie', 'Simon']
                    ]
                ]}/>
            )
            const participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')
            enterParticipantName(participantInput, 'Simon')

            expect(component.getByText('Round 1')).toBeInTheDocument()
            expect(component.getByText('Charlie and Simon')).toBeInTheDocument()
        })
    })

    describe('when there are 4 participants', () => {
        it('has 3 rounds', () => {
            const component = render(
                <App matcher={() => [
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
                ]}/>
            )
            const participantInput = component.getByLabelText('Participant') as HTMLInputElement

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

    describe('when there are an odd number of participants', () => {
        it('should have someone sitting out in the round', () => {
            const component = render(
                <App matcher={() => [
                    [
                        ['Charlie', 'Simon'],
                        ['Bob', '']
                    ],
                    [
                        ['Charlie', 'Bob'],
                        ['Simon', '']
                    ],
                    [
                        ['Simon', 'Bob'],
                        ['Charlie', '']
                    ]
                ]}/>
            )
            const participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')
            enterParticipantName(participantInput, 'Simon')
            enterParticipantName(participantInput, 'Bob')

            expect(component.getByText('Charlie sits out')).toBeInTheDocument()
            expect(component.getByText('Simon sits out')).toBeInTheDocument()
            expect(component.getByText('Bob sits out')).toBeInTheDocument()
        })
    })

    describe('when a duplicate name is entered', () => {
        let component: RenderResult
        let participantInput: HTMLInputElement

        beforeEach(() => {
            component = render(<SpeedbackAdmin matcher={() => []}/>)
            participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')
            enterParticipantName(participantInput, 'Charlie')
        })

        it('should not be added to the list of participants', function () {
            expect(component.getAllByText('Charlie').length).toEqual(1)
        })

        it('should display a error that the name has already been entered', () => {
            expect(component.getByText('Name has already been added')).toBeInTheDocument()
        })

        it('removes the error when the next name is added', function () {
            enterParticipantName(participantInput, 'Simon')

            expect(component.queryByText('Name has already been added')).not.toBeInTheDocument()
        })

        it('should be ignored if it only differs in casing', function () {
            enterParticipantName(participantInput, 'Simon')
            enterParticipantName(participantInput, 'simon')

            expect(component.getAllByText(/simon/i).length).toEqual(1)
        })
    })

    describe('when the clear button is clicked', () => {
        it('empties the list of participants', () => {
            const component = render(<SpeedbackAdmin matcher={() => []}/>)
            const participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')

            fireEvent.click(component.getByText('Clear'))

            expect(component.queryByText('Charlie')).not.toBeInTheDocument()
        })

        it('empties the list of rounds', () => {
            const component = render(
                <SpeedbackAdmin matcher={() => [
                    [
                        ['Charlie', 'Simon']
                    ]
                ]}/>
            )
            const participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, 'Charlie')
            enterParticipantName(participantInput, 'Simon')

            fireEvent.click(component.getByText('Clear'))

            expect(component.queryByText('Round 1')).not.toBeInTheDocument()
            expect(component.queryByText('Charlie and Simon')).not.toBeInTheDocument()
        })
    })

    describe('when enter is pressed with no name', () => {
        it('does not add any participants', () => {
            const component = render(<SpeedbackAdmin matcher={() => []}/>)
            const participantInput = component.getByLabelText('Participant') as HTMLInputElement

            enterParticipantName(participantInput, '')
            enterParticipantName(participantInput, '')

            expect(component.queryByText('Name has already been added')).not.toBeInTheDocument()
        })
    })
})

const enterParticipantName = (participantInput: HTMLInputElement, name: string) => {
    fireEvent.change(participantInput, {
        target: {value: name}
    })
    fireEvent.keyDown(participantInput, {key: 'Enter', code: 'Enter'})
}
