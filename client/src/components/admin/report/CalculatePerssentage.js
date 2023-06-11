export default function CalculateRatio(items) {
  const getTotal = () => {
    let total = 0;
    for (const item of items) {
      total += item.value;
    }
    return total;
  };

  const getRatio = (item) => {
    return {
      name: item.name,
      value: item.value,
      ratio: item.value / getTotal(),
    };
  };

  const ratios = [];
  for (const item of items) {
    ratios.push(getRatio(item));
  }

  return ratios;
}
