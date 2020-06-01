import React, {useState} from 'react';
import './SpeedbackAdmin.css';
import {Matcher, Rounds} from './Matcher'
import {RoundList} from './RoundList'
import {ParticipantList} from './ParticipantList'
import {ParticipantEntry} from './ParticipantEntry'

interface Props {
    matcher: Matcher
}

export const SpeedbackAdmin: React.FC<Props> = (props) => {
    const [participants, setParticipants] = useState<string[]>([])
    const [rounds, setRounds] = useState<Rounds>([])
    const [error, setError] = useState<string>('')

    const handleAddParticipant = (participant: string) => {
        if (participants.includes(participant)) {
            setError('Name has already been added')
        } else {
            const newParticipants = [...participants, participant]

            setParticipants(newParticipants)
            setRounds(props.matcher(newParticipants))
            setError('')
        }
    }

    return (
        <div className="App">
            <div className="Names">
                <ParticipantEntry onAddParticipant={handleAddParticipant} error={error}/>
                <ParticipantList participants={participants}/>
            </div>
            <RoundList rounds={rounds}/>
        </div>
    )
}

export default SpeedbackAdmin
