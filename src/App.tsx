import React, {useState} from 'react';
import './App.css';

type Pair = [string, string]
type Round = Pair[]
type Rounds = Round[]
export type Matcher = (participants: string[]) => Rounds

interface AppProps {
    matcher: Matcher
}

export const App: React.FC<AppProps> = (props) => {
    const [name, setName] = useState('')
    const [participants, setParticipants] = useState<string[]>([])

    const rounds = props.matcher(participants)

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
                {rounds.map((round, roundNumber) =>
                    <div>
                        <h2>Round {roundNumber + 1}</h2>
                        <ul>
                            {round.map((pair, pairNumber) =>
                                <li key={roundNumber + '-' + pairNumber}>{pair[0]} and {pair[1]}</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
