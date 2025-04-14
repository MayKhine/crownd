import { GridCellType } from "./Board"
import { GridCell } from "./GridCell"

type GridProps = {
  grid: Array<Array<GridCellType>>
}

export const Grid = ({ grid }: GridProps) => {
  console.log("grid: ", grid)
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
              return <GridCell key={index} cellData={cell} />
            })}
          </div>
        )
      })}
    </div>
  )
}
