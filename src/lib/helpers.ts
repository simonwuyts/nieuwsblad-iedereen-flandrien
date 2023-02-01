export function formatMinutes(minutes: number) {
  let value = minutes;
  let unit = "min";
  if (minutes < 1) {
    value = Math.floor(minutes * 60);
    unit = "sec";
  }
  return `${value} ${unit}`;
}

export function convertStringToId(value: string) {
  return value.replaceAll(".", "-");
}

export function segmentToMinutes(start: Date, stop: Date) {}
