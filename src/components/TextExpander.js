import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextExpander({
  children,
  className = "text-expander",
  wordsUntilCollapsed = 10,
  expanded = false,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#0094ff",
}) {
  const originalText = children;
  const splitText = children.split(" ", wordsUntilCollapsed);
  const collapsedText = splitText.join(" ") + "...";

  const buttonStyle = {
    color: buttonColor,
    cursor: "pointer",
    marginLeft: 6,
  };

  const hoverButtonStyle = {
    opacity: "0.8",
    cursor: "pointer",
    marginLeft: 6,
  };

  const [isExpanded, setIsExpanded] = useState(expanded);
  const [currButtonStyle, setCurrButtonStyle] = useState(buttonStyle);

  return (
    <>
      <div className={`margin ${className}`}>
        {isExpanded || splitText.length < wordsUntilCollapsed
          ? originalText
          : collapsedText}
        {splitText.length >= wordsUntilCollapsed && (
          <span
            role="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            style={currButtonStyle}
            onMouseEnter={() => setCurrButtonStyle(hoverButtonStyle)}
            onMouseLeave={() => setCurrButtonStyle(buttonStyle)}>
            {isExpanded ? collapseButtonText : expandButtonText}
          </span>
        )}
      </div>
    </>
  );
}

TextExpander.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  wordsUntilCollapsed: PropTypes.number,
  expanded: PropTypes.bool,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
};
