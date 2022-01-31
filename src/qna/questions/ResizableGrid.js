import React, { useEffect, useRef, useState } from "react";
import "./ResizableGrid/index.css";
import { wireEventValue } from "../utils/form";
import Resizable from "../components/Resizable";
import ImageTextInput from "../components/ImageTextInput";

const defaultMap = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const FILL_TYPES = {
  answers: "answers",
  default: "default",
};

const ResizableGrid = ({ data, update }) => {
  const map = data.map || defaultMap,
    setMap = (_map) => update({ map: _map });

  const [cellDims, setCellDims] = useState({ height: 0, width: 0 });
  useEffect(() => {
    const cell = containerRef.current.getElementsByClassName("cell")[0];
    if (cell) {
      const { height, width } = cell.getBoundingClientRect();
      setCellDims({ height, width });
    }
  }, [map]);

  const containerRef = useRef(null);

  const [fill, setFill] = useState(FILL_TYPES.default);

  // Update cell data
  const updateCell = (value, rowIndex, columnIndex) => {
    const newMap = [...map];
    newMap[rowIndex][columnIndex] = { type: fill, value };
    setMap(newMap);
  };

  // Update grid dimensions on resize
  const updateGrid = ({ dims: [width, height] }) => {
    const cellWidth = cellDims.width,
      cellHeight = cellDims.height;

    const finalRows = Math.floor(height / cellHeight) || 1;
    const finalColumns = Math.floor(width / cellWidth) || 1;

    if (finalRows || finalColumns) updateMap(finalRows, finalColumns);
  };

  // Method to re-render the map using target dimensions
  const updateMap = (targetRows, targetColumns) => {
    let dRows = targetRows - map.length;
    let dColumns = targetColumns - map[0].length;
    let newMap = [...map];

    if (dRows > 0) {
      while (dRows--) newMap.push(new Array(map[0].length).fill(""));
    } else if (dRows < 0) newMap.splice(map.length + dRows - 1, -1 * dRows);

    if (dColumns > 0)
      newMap = newMap.map((row) => {
        row = row.concat(new Array(dColumns).fill(""));
        return row;
      });
    else if (dColumns < 0)
      newMap.forEach((row) => {
        row.splice(row.length + dColumns, -1 * dColumns);
      });

    setMap(newMap);
  };

  return (
    <div>
      <button onClick={() => setFill(FILL_TYPES.default)}>
        Fill default values
      </button>
      <button onClick={() => setFill(FILL_TYPES.answers)}>Fill answers</button>

      <div
        className="bounded-box relative resizable-grid-container"
        ref={containerRef}
      >
        <Resizable
          onChange={updateGrid}
          heightStep={cellDims.height}
          widthStep={cellDims.width}
        >
          <table
            className="resizable-grid-table"
            cellSpacing="0"
            cellPadding="0"
          >
            <tbody>
              {map.map((row, rowIndex) => (
                <tr>
                  {row.map((column, columnIndex) => (
                    <td className={`cell ${fill}-state`} align={"center"}>
                      <ImageTextInput
                        value={map[rowIndex][columnIndex].value}
                        className={`${column?.type || fill}-type`}
                        onChange={(e) => updateCell(e, rowIndex, columnIndex)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Resizable>
      </div>
    </div>
  );
};

export default ResizableGrid;
