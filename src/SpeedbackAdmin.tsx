import React, {useState} from 'react';
import './SpeedbackAdmin.css';

type Pair = [string, string]
type Round = Pair[]
type Rounds = Round[]
export type Matcher = (participants: string[]) => Rounds

interface AppProps {
    matcher: Matcher
}

export const SpeedbackAdmin: React.FC<AppProps> = (props) => {
    const [name, setName] = useState('')
    const [participants, setParticipants] = useState<string[]>([])
    const [rounds, setRounds] = useState<Rounds>([])

    const checkForEnter = (key: string) => {
        if (key === 'Enter') {
            const newParticipants = [...participants, name]

            setParticipants(newParticipants)
            setName('')
            setRounds(props.matcher(newParticipants))
        }
    }

    return (
        <div className="App">
            <div className="Names">
                <label>Participant
                    <input type="text" id="participant" value={name}
                           onChange={e => setName(e.target.value)}
                           onKeyDown={e => checkForEnter(e.key)}/>
                </label>
                <ul data-testid="participants">
                    {participants.map((participant) => {
                        return <li key={participant}>{participant}</li>
                    })}
                </ul>
            </div>
            <div className="Rounds">
                {rounds.map((round, roundNumber) =>
                    <div key={roundNumber}>
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

export default SpeedbackAdmin
