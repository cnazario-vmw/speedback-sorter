import React, {useState} from 'react'

interface Props {
    onAddParticipant: (participant: string) => void
    error: string
}

export const ParticipantEntry: React.FC<Props> = (props) => {
    const [name, setName] = useState('')

    const checkForEnter = (key: string) => {
        if (key === 'Enter') {
            props.onAddParticipant(name)
            setName('')
        }
    }

    return (
        <div>
            <label>Participant
                <input type="text" id="participant" value={name}
                       onChange={e => setName(e.target.value)}
                       onKeyDown={e => checkForEnter(e.key)}/>
            </label>
            <p>{props.error}</p>
        </div>
    )
}
