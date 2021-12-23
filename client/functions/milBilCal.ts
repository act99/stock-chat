const MilBilCal = (value: number) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(value);
};

export default MilBilCal;
