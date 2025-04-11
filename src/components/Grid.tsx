import { GridCell } from "./GridCell"

type GridProps = {
  rows: Array<Array<string>>
}

export const Grid = ({ rows }: GridProps) => {
  console.log("Grid: ", rows)
  return (
    <div>
      {rows.map((row) => {
        return (
          <div
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
            {row.map((cell) => {
              return <GridCell value={cell} />
            })}
          </div>
        )
      })}
    </div>
  )
}
