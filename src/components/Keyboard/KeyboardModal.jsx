import React from "react";
import keyboard from "../../assets/keyboard.png";
import "./KeyboardModal.css";

const KeyboardModal = ({ show }) => {
  if (!show) return null;

  return (
    <div className="keyboard-model">
      <img src={keyboard} alt="..." />
    </div>
  );
};

export default KeyboardModal;
