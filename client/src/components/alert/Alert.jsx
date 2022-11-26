import "./alert.css";

export const Alert = (setAlert, color, text) => {
  setAlert({ open: true, color: color, text: text });
  setTimeout(() => {
    setAlert({ open: false, color: "", text: "" });
  }, 3000);
};

export const AlertContent = ({ alert }) => {
  return (
    alert.open && (
      <div className="alert" style={{ backgroundColor: alert.color }}>
        {alert.text}
      </div>
    )
  );
};
