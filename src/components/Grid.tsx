import { GridCellType } from "./Board"
import { GridCell } from "./GridCell"

type GridProps = {
  grid: Array<Array<GridCellType>>
  cellClick: (cell: GridCellType, clickType: string) => void
  invalidCrownsPosition: Set<string>
}

export const Grid = ({ grid, cellClick, invalidCrownsPosition }: GridProps) => {
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
              const key = `${cell.row},${cell.col}`
              // console.log(invalidCrownsPosition)
              // invalidCrownsPosition.has(`${cell.row},${cell.col}`)
              const invalid =
                invalidCrownsPosition && invalidCrownsPosition.has(key)
                  ? true
                  : false
              return (
                <GridCell
                  key={index}
                  cellData={cell}
                  cellClick={cellClick}
                  invalid={invalid}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
