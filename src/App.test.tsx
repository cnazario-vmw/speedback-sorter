import React from 'react'
import { render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

describe('App', () => {
  it('starts out with no participants', () => {
    const component = render(<App/>)
    const input = component.getByLabelText('Participant') as HTMLInputElement

    expect(input.value).toBe('')
    expect(component.getByTestId('participants').textContent).toBe('')
  })

  it('allows names to be added to the list of participants', () => {
    const component = render(<App />)
    const input = component.getByLabelText('Participant') as HTMLInputElement

    fireEvent.change(input, {
      target: { value: 'Charlie' }
    })
    fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'})

    expect(input.value).toBe('')

    fireEvent.change(input, {
      target: { value: 'Claire' }
    })
    fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'})

    expect(component.getByTestId('participants').textContent).toContain('Charlie')
    expect(component.getByTestId('participants').textContent).toContain('Claire')
  })
})
