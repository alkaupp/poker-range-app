import React, { useState } from 'react';
import HandCell from './HandCell';
import ColorPickerModal from './ColorPickerModal';

// Define the 13x13 grid of hands
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

export default function RangeGrid() {
  const [selectedHand, setSelectedHand] = useState(null);
  const [colors, setColors] = useState({}); // Will store colors and proportions
  const [proportions, setProportions] = useState({}); // Will store proportions for each hand

  const handleCellClick = (hand) => {
    setSelectedHand(hand);
  };

  // Handle saving two colors with proportions
const handleColorSave = (color1, color2, proportion1, proportion2) => {
  if (selectedHand) {
    setColors((prev) => ({
      ...prev,
      [selectedHand]: { color1, color2 }, // Save colors
    }));
    setProportions((prev) => ({
      ...prev,
      [selectedHand]: { color1: proportion1, color2: proportion2 }, // Save proportions
    }));
  }
  setSelectedHand(null);
};
  // Handle proportion changes
  const handleProportionChange = (event, colorIndex) => {
    const value = event.target.value;
    const newProportions = { ...proportions };
    newProportions[selectedHand] = newProportions[selectedHand] || {};
    newProportions[selectedHand][colorIndex] = value;
    setProportions(newProportions);
  };

  return (
    <div>
<div
  className="grid grid-cols-13 gap-1"
  style={{ width: '600px', height: '400px' }}  // Fix the grid size
>
  {hands.map((hand, index) => (
    <div key={index}>
      <HandCell
        hand={hand}
        colors={colors[hand]}  // Pass colors for the hand
        proportions={proportions[hand]}  // Pass proportions for the hand
        onClick={() => handleCellClick(hand)}
      />
    </div>
  ))}
</div>

      {selectedHand && (
        <div className="p-4 bg-white border rounded mt-4 mx-auto w-80">
          <h2 className="text-lg font-bold">Select Colors and Proportions for {selectedHand}</h2>

          <ColorPickerModal
            isOpen={!!selectedHand}
            onClose={() => setSelectedHand(null)}
            onSave={(color1, color2, proportion1, proportion2) => 
              handleColorSave(color1, color2, proportion1, proportion2)
            }
            proportions={proportions[selectedHand] || {}} // Pass current proportions for the selected hand
            onProportionChange={handleProportionChange}  // Pass proportion change handler
          />
        </div>
      )}
    </div>
  );
}
