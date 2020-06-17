import React from 'react'
import {Rounds} from './Matcher'

interface Props {
    rounds: Rounds
}

export const RoundList: React.FC<Props> = (props) => {
    const pairFormatter = (participantA: string, participantB: string) => {
        if (participantA === '') {
            return participantB + ' sits out'
        } else if (participantB === '') {
            return participantA + ' sits out'
        }

        return participantA + ' and ' + participantB
    }

    return (
        <div className="Rounds">
            {props.rounds.map((round, roundNumber) =>
                <div key={roundNumber}>
                    <h2>Round {roundNumber + 1}</h2>
                    <ul>
                        {round.map((pair, pairNumber) =>
                            <li key={roundNumber + '-' + pairNumber}>{pairFormatter(pair[0], pair[1])}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
