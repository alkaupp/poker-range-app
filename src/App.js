import React, { useState } from 'react';
import HandCell from './components/HandCell'; // Assuming the HandCell component is in HandCell.jsx
import hands from './utils/hands';

function App() {
	document.title = 'Poker hand visualizer'
  // State to store the selected hand
  const [selectedHand, setSelectedHand] = useState(null);

  // State to store colors and proportions for all hands
  const [handSettings, setHandSettings] = useState({});
  
  // State to store the selected colors and proportions
  const [colorSettings, setColorSettings] = useState({ color1: '#ff0000', color2: '#00ff00', proportion1: 50, proportion2: 50 });
    // State to store editable labels
  const [label1, setLabel1] = useState('Color 1');
  const [label2, setLabel2] = useState('Color 2');

  // Handle hand click - Apply the selected color and proportions
  const handleHandClick = (hand) => {
    setSelectedHand(hand); // Set selected hand

    // Apply selected colors and proportions to the hand
    setHandSettings({
      ...handSettings,
      [hand]: { ...colorSettings }
    });
  };

  // Handle color changes
  const handleColorChange = (e, color) => {
    const updatedColorSettings = { ...colorSettings, [color]: e.target.value };
    setColorSettings(updatedColorSettings);
  };

  // Handle proportion changes from range slider
  const handleProportionSliderChange = (e, color) => {
    const updatedColorSettings = { ...colorSettings, [color]: e.target.value };
    setColorSettings(updatedColorSettings);
  };

  // Handle proportion changes from text input
  const handleProportionTextChange = (e, color) => {
    const updatedColorSettings = { ...colorSettings, [color]: e.target.value };
    setColorSettings(updatedColorSettings);
  };

  return (
    <div className="flex">
      {/* Hand grid */}
      <div className="grid grid-cols-13 gap-1" style={{ marginTop: '100px', marginLeft: '20px' }}>
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

      {/* Color Picker and Proportions */}
      <div className="ml-4 p-4 border border-gray-300 rounded-md">
        <h2 className="font-bold text-xl mb-4">Select Colors and Proportions</h2>

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
            onChange={(e) => handleProportionSliderChange(e, 'proportion1')}
            className="w-full mb-4"
            value={colorSettings.proportion1}
          />
          <input
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleProportionTextChange(e, 'proportion1')}
            className="w-full mb-4 p-2 border"
            value={colorSettings.proportion1}
          />
          <span>{colorSettings.proportion1}%</span>
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
            onChange={(e) => handleProportionSliderChange(e, 'proportion2')}
            className="w-full mb-4"
            value={colorSettings.proportion2}
          />
          <input
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleProportionTextChange(e, 'proportion2')}
            className="w-full mb-4 p-2 border"
            value={colorSettings.proportion2}
          />
          <span>{colorSettings.proportion2}%</span>
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
  );
}

export default App;
