import { GridCellType } from "./Board"
import { GridCell } from "./GridCell"

type GridProps = {
  grid: Array<Array<GridCellType>>
  cellClick: (cell: GridCellType) => void
}

export const Grid = ({ grid, cellClick }: GridProps) => {
  return (
    <div>
      {grid.map((row, index) => {
        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              columnGap: "0",
              backgroundColor: "pink",
              width: "25rem", // one cell is 5rem
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {row.map((cell, index) => {
              // const cellExists = puzzleBlocks.some((row) =>
              //   row.some(
              //     (cell) => cell.row === cell.row && cell.col === cell.col
              //   )
              // )
              // console.log("CELL EXIST: ", cellExists)
              return (
                <GridCell key={index} cellData={cell} cellClick={cellClick} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
