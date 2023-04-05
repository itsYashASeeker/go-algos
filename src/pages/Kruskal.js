import React, { useState } from "react";

function Kruskal() {
    const [matrix, setMatrix] = useState([]);
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);

    function developMatrix() {
        const newMatrix = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(""); // add an empty string for each cell
            }
            newMatrix.push(row); // add the new row to the matrix
        }

        setMatrix(newMatrix); // update the state with the new matrix
    }

    function handleCellChange(e, rowIndex, colIndex) {
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = e.target.value;
        setMatrix(newMatrix);
    }

    return (
        <div>
            <label htmlFor="rows">Number of rows: </label>
            <input
                type="number"
                id="rows"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value))}
            />
            <br />
            <label htmlFor="cols">Number of columns: </label>
            <input
                type="number"
                id="cols"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value))}
            />
            <br />
            <button onClick={developMatrix}>Generate Matrix</button>
            <table>
                <tbody>
                    {matrix.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={`${i}-${j}`}>
                                    <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => handleCellChange(e, i, j)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Kruskal;