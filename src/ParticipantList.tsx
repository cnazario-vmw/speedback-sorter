import React from 'react'

interface Props {
    participants: string[]
}

export const ParticipantList: React.FC<Props> = (props) => {
    return (
        <ul data-testid="participants">
            {props.participants.map((participant) => {
                return <li key={participant}>{participant}</li>
            })}
        </ul>
    )
}
