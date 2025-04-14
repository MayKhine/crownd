import { Grid } from "./Grid"

const createGameGridArr = (numOfCol: number) => {
  const grid = Array.from({ length: numOfCol }, () =>
    new Array(numOfCol).fill(".")
  )
  return grid
}

const getRandomSide = () => {
  const randomSidesArr = [
    { placement: "row", value: -1 },
    { placement: "row", value: 1 },
    { placement: "col", value: -1 },
    { placement: "col", value: 1 },
  ]
  return randomSidesArr[Math.floor(Math.random() * 4)]
}

const isDiagonallyTouching = (prevCol: number, curCol: number) => {
  console.log(
    "Is diagonally touching: ",
    prevCol,
    curCol,
    Math.abs(prevCol - curCol) == 1 ? true : false
  )
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
      console.log("resett ")
      return "reset"
    }
  } while (picked.has(randomNum) || isDiagonallyTouching(prevCol, randomNum)) // If picked, retry
  // prevCol = randomNum
  picked.add(randomNum) // Mark as picked
  return randomNum
}

const generateXonGridArr = (gridArr: Array<Array<string>>) => {
  let pickedCols = new Set<number>() // Keep track of picked columns
  let xArr = []
  let prevCol: number = -999

  for (let i = 0; i < gridArr.length; i++) {
    const col = getRandomNumberUnique(gridArr.length, pickedCols, prevCol)
    if (col === "reset") {
      pickedCols = new Set<number>()
      xArr = []
      i = -1
      gridArr.forEach((row) => row.fill("."))
    } else {
      console.log("picked Cols ", pickedCols)
      gridArr[i][col] = "x"
      prevCol = col
      xArr.push({ x: col, color: colorArr[i], xy: { x: col, y: i } })
    }
  }

  return xArr
}

const checkSpaceLeft = (gridArr: Array<Array<string>>) => {
  for (let i = 0; i < gridArr.length; i++) {
    for (let x = 0; x < gridArr.length; x++) {
      if (gridArr[i][x] == ".") {
        return true
      }
    }
  }
  return false
}
const colorArr = ["red", "blue", "pink", "white", "green"]

export const Board = () => {
  const gameSize = 5
  const initialGridArr = createGameGridArr(gameSize)
  const xArr = generateXonGridArr(initialGridArr)
  const gameGridArr = initialGridArr
  // const [gameGridArr, setGameGridArr] = useState(initialGridArr)
  const checkIsValidToGrow = (
    xLocation: { x: number; y: number },
    gridArr: Array<Array<string>>
    // randomside: { placement: string; value: number }
  ) => {
    const randomside = getRandomSide()
    //x
    if (randomside.placement == "row") {
      const updatedX = xLocation.x + randomside.value
      if (
        updatedX >= 0 &&
        updatedX < gridArr.length &&
        gridArr[xLocation.y][updatedX] == "."
      ) {
        return { x: updatedX, y: xLocation.y }
      }
    }

    //y
    if (randomside.placement == "col") {
      const updatedY = xLocation.y + randomside.value
      if (
        updatedY >= 0 &&
        updatedY < gridArr.length &&
        gridArr[updatedY][xLocation.x] == "."
      ) {
        return { x: xLocation.x, y: updatedY }
      }
    }

    return false
  }

  const createBlockPuzzle = () => {
    for (let i = 0; i < gameSize; i++) {
      const xColor = xArr[i].color
      const xPlacement = xArr[i].xy

      let iRowGrowedFlag = false
      do {
        const updatedPlacement = checkIsValidToGrow(xPlacement, gameGridArr)
        console.log(updatedPlacement, xPlacement)
        if (updatedPlacement != false) {
          gameGridArr[updatedPlacement.y][updatedPlacement.x] = xColor
          iRowGrowedFlag = true
        }
      } while (!iRowGrowedFlag)
    }
  }

  createBlockPuzzle()

  return (
    <div>
      <Grid rows={gameGridArr} />
    </div>
  )
}
