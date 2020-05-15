import React from 'react'
import {render, fireEvent, RenderResult} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App, {Matcher} from './App'

describe('App', () => {
    let component: RenderResult;
    let participantInput: HTMLInputElement;

    beforeEach(function () {
        component = render(<App matcher={matcherStub}/>);
        participantInput = component.getByLabelText('Participant') as HTMLInputElement
    });

    it('starts out with no participants', () => {
        expect(participantInput.value).toBe('');
        expect(component.getByTestId('participants').textContent).toBe('')
    });

    it('allows names to be added to the list of participants', () => {
        fireEvent.change(participantInput, {
            target: {value: 'Charlie'}
        });
        fireEvent.keyDown(participantInput, {key: 'Enter', code: 'Enter'});

        expect(participantInput.value).toBe('');

        fireEvent.change(participantInput, {
            target: {value: 'Claire'}
        });
        fireEvent.keyDown(participantInput, {key: 'Enter', code: 'Enter'});

        expect(component.getByTestId('participants').textContent).toContain('Charlie');
        expect(component.getByTestId('participants').textContent).toContain('Claire')
    })

    it("shows one round and one pair when there are two participants", () => {
        fireEvent.change(participantInput, {
            target: {value: 'Charlie'}
        });
        fireEvent.keyDown(participantInput, {key: 'Enter', code: 'Enter'});

        fireEvent.change(participantInput, {
            target: {value: 'Simon'}
        });
        fireEvent.keyDown(participantInput, {key: 'Enter', code: 'Enter'});

        expect(component.getByText('Round 1')).toBeInTheDocument()
        expect(component.getByText('Charlie and Simon')).toBeInTheDocument()
    })
})


const matcherStub: Matcher = () => {
  return [
      [
          ['Charlie', 'Simon']
      ]
  ]
}
