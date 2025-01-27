import React, { useState } from 'react';
import HandCell from './components/HandCell'; // Assuming the HandCell component is in HandCell.jsx

const hands = [
  // Suited hands (e.g., AA, AKs, AQs... A2s)
  "AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", 
  
  // Offsuit hands (e.g., AKo, KK, KQs... K2s)
  "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",

  // Suited hands for Q
  "AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",

  // Suited hands for J
  "AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s",

  // Suited hands for T
  "ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s",

  // Suited hands for 9
  "A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s",

  // Suited hands for 8
  "A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s",

  // Suited hands for 7
  "A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s",

  // Suited hands for 6
  "A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s",

  // Suited hands for 5
  "A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65o", "55", "54s", "53s", "52s",

  // Suited hands for 4
  "A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s",

  // Suited hands for 3
  "A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s",

  // Suited hands for 2
  "A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22"
];
function App() {
	document.title = 'Poker hand visualizer'
  // State to store the selected hand
  const [selectedHand, setSelectedHand] = useState(null);

  // State to store colors and proportions for all hands
  const [handSettings, setHandSettings] = useState({});
  
  // State to store the selected colors and proportions
  const [colorSettings, setColorSettings] = useState({ color1: '#ff0000', color2: '#00ff00', proportion1: 50, proportion2: 50 });

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
          <label className="block mb-2">Color 1</label>
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
          <label className="block mb-2">Color 2</label>
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
