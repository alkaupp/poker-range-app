import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function ColorPickerModal({ isOpen, onClose, onSave, proportions }) {
  const [color1, setColor1] = useState('#ff0000'); // Default color 1 is red
  const [color2, setColor2] = useState('#00ff00'); // Default color 2 is green
  const [proportion1, setProportion1] = useState(proportions?.color1 || 50); // Default proportion for color1
  const [proportion2, setProportion2] = useState(proportions?.color2 || 50); // Default proportion for color2

  if (!isOpen) return null;

  const handleColorChange1 = (newColor) => {
    setColor1(newColor.hex);
  };

  const handleColorChange2 = (newColor) => {
    setColor2(newColor.hex);
  };

  const handleProportionChange1 = (event) => {
    setProportion1(event.target.value);
  };

  const handleProportionChange2 = (event) => {
    setProportion2(event.target.value);
  };

  const handleSave = () => {
    onSave(color1, color2, proportion1, proportion2);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold">Pick Two Colors and Set Proportions</h2>

        {/* Color Picker 1 */}
        <div className="my-4">
          <SketchPicker color={color1} onChangeComplete={handleColorChange1} />
          <label className="block">Proportion for Color 1: {proportion1}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={proportion1}
            onChange={handleProportionChange1}
            className="w-full"
          />
        </div>

        {/* Color Picker 2 */}
        <div className="my-4">
          <SketchPicker color={color2} onChangeComplete={handleColorChange2} />
          <label className="block">Proportion for Color 2: {proportion2}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={proportion2}
            onChange={handleProportionChange2}
            className="w-full"
          />
        </div>

        {/* Save and Close Buttons */}
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-200 p-2 rounded">Close</button>
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
