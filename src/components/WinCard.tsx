import { IoCloseCircleOutline } from "react-icons/io5"
import { formatTime } from "../helperFunctions"
type WinCardProps = {
  closePopup: () => void
  time: number
}
export const WinCard = ({ closePopup, time }: WinCardProps) => {
  return (
    <div>
      <div className="winCard">
        <IoCloseCircleOutline
          onClick={closePopup}
          style={{ ...closeIconStyle }}
          size={30}
        />

        <div style={{ ...textContainerStyle }}>
          <h3> You win! </h3>
          <div> Solve Time: {formatTime(time)}</div>
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
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "red",
}

// const baseStyle: React.CSSProperties = {
//   width: "100%",
//   minHeight: "100vh",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
// }
