import { Grid } from "./Grid"

export type GridCellType = {
  row: number
  col: number
  value: string
  // color?: string
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

const generateCrownsonGridArr = (gridArr: Array<Array<GridCellType>>) => {
  let pickedCols = new Set<number>() // Keep track of picked columns
  let crownsArr = []
  let prevCol: number = -999

  for (let i = 0; i < gridArr.length; i++) {
    const col = getRandomNumberUnique(gridArr.length, pickedCols, prevCol)
    if (col === "reset") {
      pickedCols = new Set<number>()
      crownsArr = []
      i = -1
      // gridArr.forEach((row) => row.fill("."))
      gridArr.forEach((row) => {
        row.forEach((cell) => {
          cell.value = "."
        })
      })
    } else {
      gridArr[i][col].value = "x"
      prevCol = col
      // xArr.push({ x: col, color: colorArr[i], xy: { x: col, y: i } })
      crownsArr.push({ row: i, col: col, value: "x" })
    }
  }

  return crownsArr
}

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

const getRandomSide = () => {
  const randomSidesArr = [
    { placement: "row", value: -1 },
    { placement: "row", value: 1 },
    { placement: "col", value: -1 },
    { placement: "col", value: 1 },
  ]
  return randomSidesArr[Math.floor(Math.random() * 4)]
}

const isValidToGrow = (
  crown: GridCellType,
  initialGridArr: Array<Array<GridCellType>>
) => {
  const randomside = getRandomSide()
  //x
  if (randomside.placement == "row") {
    const updatedRow = crown.row + randomside.value
    if (
      updatedRow >= 0 &&
      updatedRow < initialGridArr.length &&
      initialGridArr[updatedRow][crown.col].value == "."
    ) {
      return { col: crown.col, row: updatedRow }
    }
  }

  //y
  if (randomside.placement == "col") {
    const updatedCol = crown.col + randomside.value
    if (
      updatedCol >= 0 &&
      updatedCol < initialGridArr.length &&
      initialGridArr[crown.row][updatedCol].value == "."
    ) {
      return { col: updatedCol, row: crown.row }
    }
  }
  return false
}

// const createBlockPuzzle = () => {
//   for (let i = 0; i < gameSize; i++) {
//     const xColor = xArr[i].color
//     const xPlacement = xArr[i].xy

//     let iRowGrowedFlag = false
//     do {
//       const updatedPlacement = checkIsValidToGrow(xPlacement, gameGridArr)
//       console.log(updatedPlacement, xPlacement)
//       if (updatedPlacement != false) {
//         gameGridArr[updatedPlacement.y][updatedPlacement.x] = xColor
//         iRowGrowedFlag = true
//       }
//     } while (!iRowGrowedFlag)
//   }
// }

const createPuzzleBlocks = (
  crownPostionsArr: Array<GridCellType>,
  initialGridArr: Array<Array<GridCellType>>
) => {
  for (let i = 0; i < crownPostionsArr.length; i++) {
    //check if it is able to grow for each crown
    const growPosition = isValidToGrow(crownPostionsArr[i], initialGridArr)
    if (growPosition !== false) {
      initialGridArr[growPosition.row][growPosition.col].value = colorArr[i]
    }
  }
}

const colorArr = ["red", "blue", "pink", "white", "green"]

export const Board = () => {
  // x: Column
  // y: Row

  const gameSize = 5
  const initialGridArr = createGameGridArr(gameSize) //fill with .
  const crownPostionsArr = generateCrownsonGridArr(initialGridArr)
  const blockPuzzleArr = createPuzzleBlocks(crownPostionsArr, initialGridArr)

  return (
    <div>
      BOARDDD
      <Grid grid={initialGridArr} />
    </div>
  )
}
