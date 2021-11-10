export const Btn = ({ nameClass, text, onClick, type, link, disabled }) => {
  if (type === "link") {
    return (
      <a href={link} className={`button ${nameClass}`}>
        <div className="inner">{text}</div>
      </a>
    );
  } else {
    return (
      <button
        style={disabled ? { opacity: ".6" } : null}
        disabled={disabled}
        onClick={onClick}
        className={`button ${nameClass}`}
      >
        <div className="inner">{text}</div>
      </button>
    );
  }
};
