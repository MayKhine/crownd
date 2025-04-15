import { useState } from "react"
import { Grid } from "./Grid"

export type GridCellType = {
  row: number
  col: number
  value: string
  crown?: boolean
  color?: string
  user?: string
}

const colorArr = ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"]

const createGameGridArr = (gameSize: number, value: string) => {
  const grid = []
  for (let row = 0; row < gameSize; row++) {
    let rowArr = []
    for (let col = 0; col < gameSize; col++) {
      rowArr.push({ row: row, col: col, value: value, user: "" })
    }
    grid.push(rowArr)
    rowArr = []
  }

  return grid
}

const isDiagonallyTouching = (prevCol: number, curCol: number) => {
  return Math.abs(prevCol - curCol) == 1 ? true : false
}

const getRandomNumberUnique = (
  maxNum: number,
  picked: Set<number>,
  prevCol: number
) => {
  let attempts = 0
  const MAX_ATTEMPTS = 100
  let randomNum
  do {
    randomNum = Math.floor(Math.random() * maxNum)
    attempts++
    if (attempts > MAX_ATTEMPTS) {
      return "reset"
    }
  } while (picked.has(randomNum) || isDiagonallyTouching(prevCol, randomNum)) // If picked, retry
  // prevCol = randomNum
  picked.add(randomNum) // Mark as picked
  return randomNum
}

const generatePuzzleGridArr = (gridArr: Array<Array<GridCellType>>) => {
  let pickedCols = new Set<number>() // Keep track of picked columns
  let puzzleBlockArr = []
  let prevCol: number = -999

  for (let i = 0; i < gridArr.length; i++) {
    const col = getRandomNumberUnique(gridArr.length, pickedCols, prevCol)
    if (col === "reset") {
      pickedCols = new Set<number>()
      puzzleBlockArr = []
      i = -1
      gridArr.forEach((row) => {
        row.forEach((cell) => {
          cell.value = "."
        })
      })
    } else {
      gridArr[i][col].value = "x"
      gridArr[i][col].color = colorArr[i]
      prevCol = col
      const puzzleBlock = {
        row: i,
        col: col,
        value: "x",
        crown: true,
        color: colorArr[i],
      }
      puzzleBlockArr.push([puzzleBlock])
    }
  }

  return puzzleBlockArr
}

const getRandomSide = () => {
  const randomSidesArr = [
    { position: "row", value: -1 },
    { position: "row", value: 1 },
    { position: "col", value: -1 },
    { position: "col", value: 1 },
  ]
  return randomSidesArr[Math.floor(Math.random() * 4)]
}

const getCellPositionToAttachToCurCell = (
  curCell: GridCellType,
  initialGridArr: Array<Array<GridCellType>>
) => {
  const randomPosition = getRandomSide()

  //check if it is valid to gorw
  if (randomPosition.position == "row") {
    const updatedRow = curCell.row + randomPosition.value
    if (
      updatedRow >= 0 &&
      updatedRow < initialGridArr.length &&
      initialGridArr[updatedRow][curCell.col].value == "."
    ) {
      return { col: curCell.col, row: updatedRow }
    }
  }

  if (randomPosition.position == "col") {
    const updatedCol = curCell.col + randomPosition.value
    if (
      updatedCol >= 0 &&
      updatedCol < initialGridArr.length &&
      initialGridArr[curCell.row][updatedCol].value == "."
    ) {
      return { col: updatedCol, row: curCell.row }
    }
  }

  return { col: null, row: null }
}

const createPuzzleBlocks = (
  puzzleGridArr: Array<Array<GridCellType>>,
  initialGridArr: Array<Array<GridCellType>>,
  gameSize: number
) => {
  let puzzleSize = puzzleGridArr.length
  const gridSize = gameSize * gameSize

  for (let i = 0; i < puzzleGridArr.length; i++) {
    let newCellFlag = false
    let newCellPosition

    do {
      newCellPosition = getCellPositionToAttachToCurCell(
        puzzleGridArr[i][0],
        initialGridArr
      )
      if (newCellPosition.col !== null && newCellPosition.row !== null) {
        newCellFlag = true
      }
    } while (newCellFlag == false)

    if (newCellPosition.col !== null && newCellPosition.row !== null) {
      const newCell = {
        col: newCellPosition.col,
        row: newCellPosition.row,
        value: ".",
        color: puzzleGridArr[i][0].color,
      }
      puzzleGridArr[i].push(newCell)
      initialGridArr[newCellPosition.row][newCellPosition.col].value = "puzzle"
      initialGridArr[newCellPosition.row][newCellPosition.col].color =
        newCell.color

      puzzleSize += 1
    }
  }

  while (puzzleSize < gridSize + 1) {
    for (let i = 0; i < puzzleGridArr.length; i++) {
      // get a random cell from
      const randomCell =
        puzzleGridArr[i][Math.floor(Math.random() * puzzleGridArr[i].length)]

      const newCellPosition = getCellPositionToAttachToCurCell(
        randomCell,
        initialGridArr
      )

      if (
        newCellPosition.col !== null &&
        newCellPosition.row !== null &&
        puzzleSize < gridSize + 1
      ) {
        const newCell = {
          col: newCellPosition.col,
          row: newCellPosition.row,
          value: ".",
          color: puzzleGridArr[i][0].color,
        }
        puzzleGridArr[i].push(newCell)
        initialGridArr[newCellPosition.row][newCellPosition.col].value =
          "puzzle"
        initialGridArr[newCellPosition.row][newCellPosition.col].color =
          newCell.color

        puzzleSize += 1
        if (puzzleSize == gridSize) return
      }
    }
  }
}

const playerCrownsCount = (playerArr: Array<GridCellType>) => {
  let total = 0
  playerArr.forEach((cell) => (cell.value == "Crown" ? (total += 1) : total))
  return total
}

const checkPlayerWin = (playerCrownsArr: Array<GridCellType>) => {
  //check if there's more than one crown on each row , each col and diagonal
  const rowCheck = checkOnePerRow(playerCrownsArr)
  const colCheck = checkOnePerCol(playerCrownsArr)
  const puzzleBlockCheck = checkOnePerPuzzleBlock(playerCrownsArr)
  const diagonalCheck = checkDiagonalCrowns(playerCrownsArr)

  if (rowCheck && colCheck && puzzleBlockCheck && diagonalCheck) {
    return true
  } else {
    return false
  }
}

const checkOnePerRow = (playerCrownsArr: Array<GridCellType>) => {
  const rows = new Set()
  for (let i = 0; i < playerCrownsArr.length; i++) {
    const cell = playerCrownsArr[i]
    if (rows.has(cell.row)) return false
    rows.add(cell.row)
  }
  return true
}

const checkOnePerCol = (playerCrownsArr: Array<GridCellType>) => {
  const cols = new Set()
  for (let i = 0; i < playerCrownsArr.length; i++) {
    const cell = playerCrownsArr[i]
    if (cols.has(cell.col)) return false
    cols.add(cell.col)
  }
  return true
}

const checkOnePerPuzzleBlock = (playerCrownsArr: Array<GridCellType>) => {
  const colors = new Set()
  for (let i = 0; i < playerCrownsArr.length; i++) {
    const cell = playerCrownsArr[i]
    if (colors.has(cell.color)) return false
    colors.add(cell.color)
  }

  return true
}

const checkDiagonalCrowns = (playerCrownsArr: Array<GridCellType>) => {
  const crownPositions = new Set(
    playerCrownsArr.map((cell) => `${cell.row},${cell.col}`)
  )

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  for (let i = 0; i < playerCrownsArr.length; i++) {
    const { row, col } = playerCrownsArr[i]

    // Check all 8 directions around the crown

    for (let x = 0; x < directions.length; x++) {
      const [dr, dc] = directions[x]
      const neighborKey = `${row + dr},${col + dc}`
      if (crownPositions.has(neighborKey)) {
        return false
      }
    }
  }

  return true
}

type BoardProps = {
  gameSize: number
}
export const Board = ({ gameSize }: BoardProps) => {
  // x: Column
  // y: Row

  const initialGridArr = createGameGridArr(gameSize, ".") //fill with .
  const puzzleGridArr = generatePuzzleGridArr(initialGridArr)
  createPuzzleBlocks(puzzleGridArr, initialGridArr, gameSize)
  //puzzle grid arr is not in use

  const cellClick = (cell: GridCellType, clickType: string) => {
    setToggleWin("")

    // left click: Crown
    if (clickType == "left") {
      setGameGridArr((prevData) =>
        prevData.map((row, i) =>
          row.map((cellItem, x) => {
            if (i === cell.row && x === cell.col && cell.user == "Crown") {
              return { ...cellItem, user: "" }
            }

            if (i === cell.row && x === cell.col && cell.user != "Crown") {
              return { ...cellItem, user: "Crown" }
            }
            return cellItem
          })
        )
      )

      setPlayerGridArr((prevData) => {
        const exists = prevData.some(
          (item) => item.row === cell.row && item.col === cell.col
        )

        if (cell.user == "Crown") {
          return prevData.filter(
            (item) => !(item.row == cell.row && item.col == cell.col)
          )
        } else {
          if (exists) {
            return prevData.map((item) =>
              item.row === cell.row && item.col === cell.col
                ? { ...item, value: "Crown", color: cell.color }
                : item
            )
          } else {
            return [
              ...prevData,
              {
                row: cell.row,
                col: cell.col,
                value: "Crown",
                color: cell.color,
              },
            ]
          }
        }
      })

      if (playerCrownsCount(playerGridArr) + 1 == gameSize) {
        console.log("TO DO CHECK WIN STATE")
        const playerCrownsArr = playerGridArr.filter(
          (cell) => cell.value == "Crown"
        )
        const result = checkPlayerWin([...playerCrownsArr, cell])
        if (result) {
          setToggleWin("win")
        }
        if (!result) {
          setToggleWin("lose")
        }
      }
    }

    // right click: X
    if (clickType == "right") {
      setGameGridArr((prevData) =>
        prevData.map((row, i) =>
          row.map((cellItem, x) => {
            if (i === cell.row && x === cell.col && cell.user == "X") {
              return { ...cellItem, user: "" }
            }
            if (i === cell.row && x === cell.col && cell.user != "X") {
              return { ...cellItem, user: "X" }
            }
            return cellItem
          })
        )
      )

      setPlayerGridArr((prevData) => {
        const exists = prevData.some(
          (item) => item.row === cell.row && item.col === cell.col
        )

        if (cell.user == "X") {
          return prevData.filter(
            (item) => !(item.row == cell.row && item.col == cell.col)
          )
        } else {
          if (exists) {
            return prevData.map((item) =>
              item.row === cell.row && item.col === cell.col
                ? { ...item, value: "X" }
                : item
            )
          } else {
            return [...prevData, { row: cell.row, col: cell.col, value: "X" }]
          }
        }
      })
    }
  }

  const [gameGridArr, setGameGridArr] = useState(initialGridArr)
  const [playerGridArr, setPlayerGridArr] = useState<
    Array<{ row: number; col: number; value: string; color?: string }>
  >([])
  const [toggleWin, setToggleWin] = useState("")

  return (
    <div>
      BOARDDD
      {toggleWin == "win" && <div> WIN </div>}
      {toggleWin == "lose" && <div> LOSE </div>}
      <Grid grid={gameGridArr} cellClick={cellClick} />
    </div>
  )
}
