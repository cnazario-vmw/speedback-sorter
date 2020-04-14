import React, {useState} from 'react';
import './App.css';

export const App: React.FC = () => {
  const [name, setName] = useState('')
  const [participants, setParticipants] = useState<string[]>([])

  const participantList = participants.map((participant) =>
    <li key={participant}>{participant}</li>
  )

  const handleEnter = (key: string) => {
    if (key === 'Enter') {
      const theName = name
      setParticipants(participants => [...participants, name])
      setName('')
    }
  }

  return (
    <div className="App">
      <div>
        <label>Participant
          <input type="text" id="participant" value={name}
                 onChange={e => setName(e.target.value)}
                 onKeyDown={e => handleEnter(e.key)}/>
        </label>
      </div>
      <div data-testid="participants">
        <ul>{participantList}</ul>
      </div>
    </div>
  )
}

export default App
