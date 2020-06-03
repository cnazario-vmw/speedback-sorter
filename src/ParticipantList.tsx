import React from 'react'

interface Props {
    participants: string[]
    onClear: () => void
}

export const ParticipantList: React.FC<Props> = (props) => {
    return (
        <div>
            <button type="button" onClick={props.onClear}>Clear</button>
            <ul data-testid="participants">
                {props.participants.map((participant) => {
                    return <li key={participant}>{participant}</li>
                })}
            </ul>
        </div>
    )
}
