import React, { MouseEventHandler } from 'react';

interface Props {
    value: ("X" | "O" | null)
    onClick: Function
}

export default function Square(props: Props) {
    return (
        <button className="square" onClick={props.onClick as MouseEventHandler<HTMLButtonElement>}> { props.value }</button >
    )
}
