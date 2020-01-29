const newPlayer = name => {
  console.log(name, "mikä nimi");
  return {
    name: name,
    1: 7,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null
  };
};

export default function makeData(names) {
  console.log(names, "mitä");
  const makeDataLevel = () => {
    return names.map(name => {
      return {
        ...newPlayer(name)
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
