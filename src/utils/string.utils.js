export function CapCase(string) {
  return string
    .replace(/[-_]/, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ReverseCapCase(string) {
  return testValidName(string)
    ? string
    : string.toLowerCase().replace(/[\s]+/g, "-");
}

function testValidName(string) {
  return new RegExp(/^\S*$/).test(string) && new RegExp(/[\w-]+$/).test(string);
}
