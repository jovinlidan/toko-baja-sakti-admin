import numeral from "numeral";

export function string2money(value: string | number): string {
  return numeral(`${value}`).format("0,0.[00]");
}

export function string2number(value: string | number): string {
  return numeral(`${value}`).format("0,0");
}

export function money2number(value: string): number {
  return numeral(value).value();
}

export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, "g"), replace);
}

export function formatString(str: string, ...args) {
  return str.replace(/{([0-9]+)}/g, function (match, index) {
    // check if the argument is present
    return typeof args[index] == "undefined" ? match : args[index];
  });
}
