import React from 'react';
import { AIOptions } from '../../types'

interface Props {
    player: 'X' | 'O';
    controller: AIOptions;
    handleChangeController: React.ChangeEventHandler<HTMLInputElement>
}

export default function PlayerControllerRadio({ player, controller, handleChangeController }: Props) {
    const options: AIOptions[] = ["👨‍💻", "🍌", "🧠"]
    return (
        <div>
            {`${player} Controller:`}<br />
            {options.map((option) =>
                <>
                    <label >
                        <input
                            type="radio"
                            value={option}
                            checked={controller === option}
                            name={`${player}Controller`}
                            onChange={handleChangeController}
                        />
                        {option}
                    </label>
                    <br />
                </>
            )}
        </div>
    )
}
