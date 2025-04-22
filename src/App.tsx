import { Board } from "./components/Board"
import { Header } from "./components/Header"

export const App = () => {
  return (
    <div className="pageContainer">
      <Header />
      <div>
        <Board />
      </div>
    </div>
  )
}
