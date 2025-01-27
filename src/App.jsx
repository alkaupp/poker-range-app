import React, { useState } from "react";
import RangeGrid from "./components/RangeGrid";
import ColorPickerModal from "./components/ColorPickerModal";

function App() {
  const [handColors, setHandColors] = useState({});
  const [selectedHand, setSelectedHand] = useState(null);

  const handleOpenModal = (hand) => {
    setSelectedHand(hand);
  };

  const handleSaveColor = (hand, colors) => {
    setHandColors((prev) => ({ ...prev, [hand]: colors }));
    setSelectedHand(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Poker Range Colorizer</h1>
      <RangeGrid handColors={handColors} onCellClick={handleOpenModal} />
      {selectedHand && (
        <ColorPickerModal
          hand={selectedHand}
          initialColors={handColors[selectedHand] || []}
          onSave={handleSaveColor}
          onClose={() => setSelectedHand(null)}
        />
      )}
    </div>
  );
}

export default App;
