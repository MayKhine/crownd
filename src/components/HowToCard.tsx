import { IoCloseCircleOutline } from "react-icons/io5"
type HowToCardProps = {
  closePopup: () => void
}
export const HowToCard = ({ closePopup }: HowToCardProps) => {
  return (
    <div
      // style={{ ...baseStyle }}
      className="howtoCardContainer"
      onClick={closePopup}
    >
      <div
        className="howtoCard"
        // style={{ ...cardStyle }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <IoCloseCircleOutline
          onClick={closePopup}
          style={{ ...closeIconStyle }}
          size={30}
        />

        <div style={{ ...textContainerStyle }}>
          <h4> How to play </h4>
          <span>
            Crown’d is a logic puzzle inspired by LinkedIn’s Queens game. The
            goal is simple: place exactly one crown in every row, column, and
            color region without breaking the rules!
          </span>
          <div>
            <h4>Controls</h4>
            <div>
              <li>Left Click on an empty tile: Place a crown</li>
              <li>Left Click on a crown: Remove it</li>
              <li>Right Click on an empty tile: Place a 'x' mark</li>
              <li>Right Click on a 'x' mark: Remote it</li>
            </div>
          </div>
          <div>
            <h4>Rules</h4>
            <div>
              <li>One crown per row, column, and region</li>
              <li>Crowns can’t touch not even diagonally</li>
            </div>
          </div>

          <div>
            <h4>Win by</h4>
            <div>
              <li>Placing all crowns correctly</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const closeIconStyle: React.CSSProperties = {
  cursor: "pointer",
  alignSelf: "flex-end",
}

const textContainerStyle: React.CSSProperties = {
  display: "flex",
  height: "100%",
  flexDirection: "column",
}

// const cardStyle: React.CSSProperties = {
//   backgroundColor: "#214065",
//   color: "#fdfffc",
//   zIndex: "2",
//   width: "70%",
//   borderRadius: "1rem",
//   padding: "1rem",
//   paddingLeft: "2rem",
//   paddingRight: "2rem",
//   boxSizing: "border-box",
//   display: "flex",
//   flexDirection: "column",
//   minHeight: "max-content",
//   overflow: "visible",
// }

// const baseStyle: React.CSSProperties = {
//   width: "100%",
//   minHeight: "100vh",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
// }
