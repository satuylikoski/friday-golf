interface Rules {
  avoidNull: boolean;
  notSameNumber: boolean;
}

export default function random([min, max]: number[], current: number, rules: Rules): number {
  let newValue;

  if (min === max) {
    return min;
  }

  if (rules.avoidNull || rules.notSameNumber) {
    do {
      newValue = Math.floor(Math.random() * (max - min + 1) + min);
    } while ((newValue === current && rules.notSameNumber) || (rules.avoidNull && newValue === 0));
  } else {
    newValue = Math.floor(Math.random() * (max - min + 1) + min);
  }

  return newValue;
}
