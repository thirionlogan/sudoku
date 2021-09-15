import Square from '../Square/Square'

const style = {
	display: "grid",
	gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

export default function Board({ squares, onClick } : { squares: ("X" | "O" | null)[]; onClick: Function}) {
    return (
        <div style={style}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onClick={() => onClick(i)} />
            ))}
        </div>
    )
}
