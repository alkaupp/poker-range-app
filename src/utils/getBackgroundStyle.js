const getBackgroundStyle = (colors) => {
  if (!colors.length) return "white";
  return `linear-gradient(90deg, ${colors
    .map(({ color, percent }) => `${color} ${percent}%`)
    .join(", ")})`;
};

export default getBackgroundStyle;
