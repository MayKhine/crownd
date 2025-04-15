import { Board } from "./components/Board"
import { Header } from "./components/Header"

export const App = () => {
  return (
    <div>
      <Header />
      <div>
        <Board gameSize={5} />
      </div>
    </div>
  )
}
