import React from "react";

import "./WizAid.css";

const WizAid = (props) => {
  const options = [
    {
        text: "What should I eat today?",
        handler: props.actionProvider.handleJavascriptList,
        id: 1,
      },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default WizAid;
