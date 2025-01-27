export const exportToFile = (data, fileName = "hand_ranges.json") => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  downloadAnchor.click();
};

export const importFromFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => callback(JSON.parse(event.target.result));
  reader.readAsText(file);
};
