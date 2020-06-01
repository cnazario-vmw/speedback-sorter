import React from 'react'
import {Rounds} from './Matcher'

interface Props {
    rounds: Rounds
}

export const RoundList: React.FC<Props> = (props) => {
    return (
        <div className="Rounds">
            {props.rounds.map((round, roundNumber) =>
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
    )
}
