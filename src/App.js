import React, { useState } from 'react';
import HandCell from './components/HandCell'; // Assuming the HandCell component is in HandCell.jsx
import hands from './utils/hands'; // Import hands array

const TOTAL_COMBOS = 1326; // Total combos in the range

function App() {
  document.title = 'Poker hand visualizer';

  // State for selected hand and hand settings
  const [selectedHand, setSelectedHand] = useState(null);
  const [handSettings, setHandSettings] = useState({});

  // State for color and proportion settings
  const [colorSettings, setColorSettings] = useState({ color1: '#ff0000', color2: '#00ff00', proportion1: 50, proportion2: 50 });
  const [label1, setLabel1] = useState('Color 1');
  const [label2, setLabel2] = useState('Color 2');
  const [gridTitle, setGridTitle] = useState('Custom Range Grid Title'); // Title for range grid

  // Helper function to calculate the total combos for a specific color
  const calculateCombosForColor = (color) => {
    let totalCombos = 0;

    for (const hand in handSettings) {
      const { proportion1, proportion2 } = handSettings[hand] || {};
      const percentage = color === 'color1' ? parseInt(proportion1, 10) : parseInt(proportion2, 10);

      // Calculate combos based on hand type
      if (hand.endsWith('o')) { // Offsuit hands (e.g., "XXo")
        totalCombos += 12 * (percentage / 100); // 12 combos for each offsuit hand
      } else if (hand.endsWith('s')) { // Suited hands (e.g., "XXs")
        totalCombos += 4 * (percentage / 100); // 4 combos for each suited hand
      } else { // Pairs (e.g., "AA")
        totalCombos += 6 * (percentage / 100); // 6 combos for each pair hand
      }
    }

    // Calculate percentage of the total range (1326 combos)
    const percentageOfRange = ((totalCombos / TOTAL_COMBOS) * 100).toFixed(2); // Round to 2 decimal places
    return { totalCombos: totalCombos.toFixed(2), percentageOfRange };
  };

  const handleHandClick = (hand) => {
    // Check if the hand already has the selected color settings
    if (handSettings[hand] && 
        handSettings[hand].color1 === colorSettings.color1 && 
        handSettings[hand].color2 === colorSettings.color2 &&
        handSettings[hand].proportion1 === colorSettings.proportion1 &&
        handSettings[hand].proportion2 === colorSettings.proportion2) {
      // If the hand already has the selected colors, reset to default (remove from settings)
      const updatedHandSettings = { ...handSettings };
      delete updatedHandSettings[hand]; // Remove the hand's color settings
      setHandSettings(updatedHandSettings); // Update the state
    } else {
      // Otherwise, apply the selected colors
      setSelectedHand(hand);
      setHandSettings({
        ...handSettings,
        [hand]: { ...colorSettings }
      });
    }
  };

  // Handle color changes
  const handleColorChange = (e, color) => {
    const updatedColorSettings = { ...colorSettings, [color]: e.target.value };
    setColorSettings(updatedColorSettings);
  };

  // Handle proportion changes
  const handleProportionChange = (e, color) => {
    const updatedColorSettings = { ...colorSettings, [color]: e.target.value };
    setColorSettings(updatedColorSettings);
  };

  // Calculate combos for Color 1 and Color 2
  const { totalCombos: totalCombos1, percentageOfRange: percentRange1 } = calculateCombosForColor('color1');
  const { totalCombos: totalCombos2, percentageOfRange: percentRange2 } = calculateCombosForColor('color2');

  return (
    <div className="flex flex-col items-center"> {/* Center content for the grid and title */}
      
      <div className="flex justify-between"> {/* Two columns layout */}
        {/* Hand Grid Column */}
        <div className="flex-1">
          {/* Range Grid Title (Above the grid) */}
          <h2 className="text-4xl font-semibold mt-2 ml-2 mb-1">{gridTitle}</h2> {/* Display custom title */}

          <div className="grid grid-cols-13 gap-1">
            {hands.map((hand) => (
              <HandCell
                key={hand}
                hand={hand}
                colors={handSettings[hand] ? handSettings[hand] : null}
                onClick={() => handleHandClick(hand)}
                isSelected={hand === selectedHand}
              />
            ))}
          </div>
        </div>

        {/* Color Selection Column */}
        <div className="w-1/3 pl-4">
          <div className="mt-8 p-4 border border-gray-300 rounded-md">
            
            {/* Range Grid Title Input */}
            <div className="mb-4">
              <input
                type="text"
                value={gridTitle}
                onChange={(e) => setGridTitle(e.target.value)}
                className="block w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder="Enter custom range grid title"
              />
            </div>

            <h2 className="font-bold text-xl mb-4">Select Colors and Proportions</h2>

            {/* Combo Counter for Color 1 */}
            <div className="mb-4 p-2 border border-gray-200 rounded bg-gray-50">
              <strong>Total Combos for {label1}:</strong> {totalCombos1} combos
              <br />
              <strong>Percentage of Range for {label1}:</strong> {percentRange1}%
            </div>

            {/* Color 1 */}
            <div>
              <input
                type="text"
                value={label1}
                onChange={(e) => setLabel1(e.target.value)}
                className="block mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="color"
                onChange={(e) => handleColorChange(e, 'color1')}
                className="mb-4"
                value={colorSettings.color1}
              />
              <input
                type="range"
                min="0"
                max="100"
                onChange={(e) => handleProportionChange(e, 'proportion1')}
                className="w-full mb-4"
                value={colorSettings.proportion1}
              />
              <input
                type="number"
                min="0"
                max="100"
                onChange={(e) => handleProportionChange(e, 'proportion1')}
                className="w-full mb-4 p-2 border"
                value={colorSettings.proportion1}
              />
            </div>
            {/* Combo Counter for Color 2 */}
            <div className="mb-4 p-2 border border-gray-200 rounded bg-gray-50">
              <strong>Total Combos for {label2}:</strong> {totalCombos2} combos
              <br />
              <strong>Percentage of Range for {label2}:</strong> {percentRange2}%
            </div>

            {/* Color 2 */}
            <div>
              <input
                type="text"
                value={label2}
                onChange={(e) => setLabel2(e.target.value)}
                className="block mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="color"
                onChange={(e) => handleColorChange(e, 'color2')}
                className="mb-4"
                value={colorSettings.color2}
              />
              <input
                type="range"
                min="0"
                max="100"
                onChange={(e) => handleProportionChange(e, 'proportion2')}
                className="w-full mb-4"
                value={colorSettings.proportion2}
              />
              <input
                type="number"
                min="0"
                max="100"
                onChange={(e) => handleProportionChange(e, 'proportion2')}
                className="w-full mb-4 p-2 border"
                value={colorSettings.proportion2}
              />
            </div>

            {/* Clear Selection Button */}
            <div>
              <button
                onClick={() => setHandSettings({})} // Clear all hand settings
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md"
              >
                Clear All Hands
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
