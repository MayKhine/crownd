import { GridCellType } from "./Board"
import { GridCell } from "./GridCell"

type GridProps = {
  grid: Array<Array<GridCellType>>
  cellClick: (cell: GridCellType, clickType: string) => void
  invalidCrownsPosition: Set<string>
  gameSize: number
}

export const Grid = ({
  grid,
  cellClick,
  invalidCrownsPosition,
  gameSize,
}: GridProps) => {
  console.log("game size: ", gameSize)
  return (
    <div
      style={{
        width: "max-content",
        border: "5px solid black",
      }}
    >
      {grid.map((row, index) => {
        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gameSize}, 1fr)`,
              columnGap: "0",
              backgroundColor: "pink",
              width: `${gameSize * 5}rem`,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {row.map((cell, index) => {
              const key = `${cell.row},${cell.col}`

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
