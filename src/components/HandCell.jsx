import React from 'react';

const HandCell = ({ hand, colors, onClick, isSelected }) => {
  const defaultColor = '#ffffff'; // White by default

  const getColorStyles = () => {
    // If no colors are selected, return an array with just the default color (white)
    if (!colors || !colors.color1 || !colors.color2 || colors.proportion1 === undefined || colors.proportion2 === undefined) {
      return [{ color: defaultColor, width: '100%' }];
    }

    // Destructure the colors and proportions from the colors prop
    const { color1, color2, proportion1, proportion2 } = colors;

    // Ensure proportions are valid (they should be between 0 and 100)
    const adjustedProportion1 = Math.min(100, Math.max(0, proportion1));
    const adjustedProportion2 = Math.min(100, Math.max(0, proportion2));

    // Calculate the remaining proportion (if there is any)
    const remainingProportion = 100 - adjustedProportion1 - adjustedProportion2;

    // Solid color section styles based on proportions
    const sections = [];

    if (adjustedProportion1 > 0) {
      sections.push({ color: color1, width: `${adjustedProportion1}%` });
    }
    if (adjustedProportion2 > 0) {
      sections.push({ color: color2, width: `${adjustedProportion2}%` });
    }
    if (remainingProportion > 0) {
      sections.push({ color: defaultColor, width: `${remainingProportion}%` });
    }

    return sections;
  };

  // Render the color sections in a div with inline styles for each section
  const renderColorSections = () => {
    const sections = getColorStyles();
    return sections.map((section, index) => (
      <div
        key={index}
        style={{
          backgroundColor: section.color,
          width: section.width,
          height: '100%', // Ensure it fills the full height of the cell
        }}
      />
    ));
  };

  return (
    <div
      onClick={onClick}
      className={`w-14 h-14 p-2 text-center border-2 rounded-md cursor-pointer 
        ${isSelected ? 'border-black' : 'border-gray-300'} flex items-center justify-center relative`}
    >
      {/* Render the color sections inside a flex container to make them next to each other */}
      <div className="flex w-full h-full absolute top-0 left-0">
        {renderColorSections()}
      </div>
      {/* Display the hand name */}
      <span className="text-lg font-bold z-10">{hand}</span>
    </div>
  );
};

export default HandCell;
