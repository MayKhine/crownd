import { Board } from "./components/Board"
import { Header } from "./components/Header"

export const App = () => {
  const colorArr = [
    "#ff99c8",
    "#fcf6bd",
    "#d0f4de",
    "#a9def9",
    "#e4c1f9",
    "#c8b6ff",
    "#ffdab9",
  ]

  return (
    <div>
      <Header />
      <div>
        <Board gameSize={5} colorArr={colorArr} />
      </div>
    </div>
  )
}
