import { readLines } from "https://deno.land/std/io/mod.ts";

async function loadDict(threshold) {
  const dict = [];
  const fileReader = await Deno.open("jieba/extra_dict/dict.txt.big");
  for await (const line of readLines(fileReader)) {
    const arr = line.split(" ");
    const word = arr[0];
    const count = parseInt(arr[1]);
    if (count > threshold) {
      dict.push([word, count]);
    }
  }
  dict.sort((a, b) => b[1] - a[1]);
  return dict;
}

const threshold = 99;
const dict = await loadDict(threshold);
const output = dict.map(x => x.join(",")).join("\n");
Deno.writeTextFileSync("all.lst", output);
