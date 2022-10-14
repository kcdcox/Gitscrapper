type Falsy = boolean | undefined | null | 0;

export const classNames = (...classes: (string | Falsy)[]) =>
  classes.filter(Boolean).join(" ");

export const variationName = (name: string, value: string) => {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

export const getSymbol = (i: number, symbol: string) =>
  new Array(Math.ceil(i) + 1).join(symbol);

export const returnConsoleSection = (meat: string) => {
  let length = 74;
  let bricks = [...Array(37)].map((_item, index) => getBrick(index)).join("");
  let size = (length - meat.length - 3) / 2;
  let lettuce = `${getSymbol(Math.ceil(size), "=")}`;
  let sauce = `${lettuce}${meat.length % 2 === 0 ? "" : "="}`;
  console.log(`\n\n${bricks}\n${sauce} ${meat} ${lettuce}\n${bricks}\n`);
};

const getBrick = (i: number) => {
  let brick;
  ++i;
  brick = i % 1 === 0 ? "🟪" : brick;
  brick = i % 2 === 0 ? "🟦" : brick;
  brick = i % 3 === 0 ? "🟩" : brick;
  brick = i % 4 === 0 ? "🟨" : brick;
  brick = i % 5 === 0 ? "🟧" : brick;
  brick = i % 6 === 0 ? "🟥" : brick;
  return brick;
};

export const getLoadingBar = (total: number, current: number) => {
  let percent = Math.floor(((current + 1) / total) * 37);
  let loaded = [...Array(percent)].map((_, index) => getBrick(index)).join("");
  let left = new Array(38 - percent).join("⬛");
  return `${loaded}${left}[${current + 1}/${total}]\r`;
};
