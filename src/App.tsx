import React, {useState} from 'react';
import './App.css';

export const App: React.FC = () => {
  const [name, setName] = useState('')
  const [participants, setParticipants] = useState<string[]>([])

  const handleEnter = (key: string) => {
    if (key === 'Enter') {
      setParticipants(participants => [...participants, name])
      setName('')
    }
  }

  return (
    <div className="App">
      <div className="Names">
        <label>Participant
          <input type="text" id="participant" value={name}
                 onChange={e => setName(e.target.value)}
                 onKeyDown={e => handleEnter(e.key)}/>
        </label>
        <ul data-testid="participants">
          {participants.map((participant) => {
            return <li key={participant}>{participant}</li>
          })}
        </ul>
      </div>
      <div className="Rounds">
        Placeholder
      </div>
    </div>
  )
}

export default App
