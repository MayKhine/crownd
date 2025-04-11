import { GridCell } from "./GridCell"

type GridProps = {
  rows: Array<Array<string>>
}

export const Grid = ({ rows }: GridProps) => {
  console.log("Grid: ", rows)
  return (
    <div>
      {rows.map((row, index) => {
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
              return <GridCell key={index} value={cell} />
            })}
          </div>
        )
      })}
    </div>
  )
}
