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
        {/* <div style={{ ...childrenStyle }}>{children}</div> */}
      </div>
    </div>
  )
}
const bgStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "100%",
  height: "100%",
  zIndex: "1",
  left: "0",
  top: "0",
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "rgb(244, 243, 234, 0.8)",
}

const childrenStyle: React.CSSProperties = {
  backgroundColor: "pink",
  zIndex: 1001,
  marginTop: "10rem",
  height: "max-content",
}
