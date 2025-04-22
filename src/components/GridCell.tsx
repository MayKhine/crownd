import { GridCellType } from "./Board"
import { PiCrownSimpleBold } from "react-icons/pi"
import { FaXmark } from "react-icons/fa6"

type GridCellProps = {
  width?: string
  cellData: GridCellType
  cellClick: (cell: GridCellType, clickType: string) => void
  invalid: boolean
}

export const GridCell = ({
  width,
  cellData,
  cellClick,
  invalid,
}: GridCellProps) => {
  const style: React.CSSProperties = {
    width: width ? width : "4",
    maxWidth: "4rem",
    height: width ? width : "4rem",
    backgroundColor: invalid
      ? "red"
      : cellData.color
      ? cellData.color
      : "lightyellow",
    border: "1.5px solid black",
    boxSizing: "border-box",
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
  }

  const input =
    cellData.user == "Crown" ? (
      <PiCrownSimpleBold size={20} />
    ) : cellData.user == "X" ? (
      <FaXmark />
    ) : (
      ""
    )

  return (
    <div
      style={{ ...style }}
      onClick={() => {
        cellClick(cellData, "left")
      }}
      onContextMenu={(e: React.MouseEvent) => {
        e.preventDefault()
        cellClick(cellData, "right")
      }}
    >
      {input}
    </div>
  )
}
