type PopupProps = {
  children: React.ReactNode
  closePopup: () => void
}
export const Popup = ({ children, closePopup }: PopupProps) => {
  return (
    <div onClick={closePopup} style={{ ...bgStyle }}>
      <div
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation()
        }}
        style={{ ...childrenStyle }}
      >
        {children}
      </div>
    </div>
  )
}
const bgStyle: React.CSSProperties = {
  width: "100%",
  // minHeight: "100%",
  height: "100%",
  zIndex: "1",
  left: "0",
  top: "0",
  position: "fixed",
  // backgroundColor: "yellow",
  backgroundColor: "rgb(244, 243, 234, 0.8)",
  boxSizing: "border-box",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const childrenStyle: React.CSSProperties = {
  zIndex: 1001,
}
