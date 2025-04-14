import { Grid } from "./Grid"

export type GridCellType = {
  row: number
  col: number
  value: string
  crown?: boolean
  color?: string
}
const createGameGridArr = (gameSize: number) => {
  // const grid = Array.from({ length: numOfCol }, (rowIndex) =>
  //   new Array(numOfCol).fill(".")
  // )

  const grid = []
  for (let row = 0; row < gameSize; row++) {
    let rowArr = []
    for (let col = 0; col < gameSize; col++) {
      rowArr.push({ row: row, col: col, value: "." })
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

// const generateCrownsonGridArr = (gridArr: Array<Array<GridCellType>>) => {
//   let pickedCols = new Set<number>() // Keep track of picked columns
//   let crownsArr = []
//   let prevCol: number = -999

//   for (let i = 0; i < gridArr.length; i++) {
//     const col = getRandomNumberUnique(gridArr.length, pickedCols, prevCol)
//     if (col === "reset") {
//       pickedCols = new Set<number>()
//       crownsArr = []
//       i = -1
//       // gridArr.forEach((row) => row.fill("."))
//       gridArr.forEach((row) => {
//         row.forEach((cell) => {
//           cell.value = "."
//         })
//       })
//     } else {
//       gridArr[i][col].value = "x"
//       prevCol = col
//       // xArr.push({ x: col, color: colorArr[i], xy: { x: col, y: i } })
//       crownsArr.push({ row: i, col: col, value: "x" })
//     }
//   }

//   return crownsArr
// }

// const checkIsValidToGrow = (
//   xLocation: { x: number; y: number },
//   gridArr: Array<Array<string>>
//   // randomside: { placement: string; value: number }
// ) => {
//   const randomside = getRandomSide()
//   //x
//   if (randomside.placement == "row") {
//     const updatedX = xLocation.x + randomside.value
//     if (
//       updatedX >= 0 &&
//       updatedX < gridArr.length &&
//       gridArr[xLocation.y][updatedX] == "."
//     ) {
//       return { x: updatedX, y: xLocation.y }
//     }
//   }

//   //y
//   if (randomside.placement == "col") {
//     const updatedY = xLocation.y + randomside.value
//     if (
//       updatedY >= 0 &&
//       updatedY < gridArr.length &&
//       gridArr[updatedY][xLocation.x] == "."
//     ) {
//       return { x: xLocation.x, y: updatedY }
//     }
//   }

//   return false
// }

// const checkSpaceLeft = (gridArr: Array<Array<string>>) => {
//   for (let i = 0; i < gridArr.length; i++) {
//     for (let x = 0; x < gridArr.length; x++) {
//       if (gridArr[i][x] == ".") {
//         return true
//       }
//     }
//   }
//   return false
// }

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
  initialGridArr: Array<Array<GridCellType>>
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

const colorArr = ["red", "blue", "pink", "white", "green"]
const gameSize = 5

export const Board = () => {
  // x: Column
  // y: Row

  const gameSize = 5
  const initialGridArr = createGameGridArr(gameSize) //fill with .
  const puzzleGridArr = generatePuzzleGridArr(initialGridArr)
  console.log("Before Puzzle Grid arr: ", puzzleGridArr)

  createPuzzleBlocks(puzzleGridArr, initialGridArr)
  console.log("Puzzle Grid arr: ", puzzleGridArr)

  const cellClick = (cell: GridCellType) => {
    console.log("cell click ", cell)
  }
  return (
    <div>
      BOARDDD
      <Grid grid={initialGridArr} cellClick={cellClick} />
    </div>
  )
}
