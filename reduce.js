import { TextLineStream } from "@std/streams";

async function loadDict(threshold) {
  const dict = [];
  const file = await Deno.open("jieba/extra_dict/dict.txt.big");
  const lineStream = file.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());
  for await (const line of lineStream) {
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
