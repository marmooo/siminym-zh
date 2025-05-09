# Siminym-zh

[一本具有高度相似性的基本词汇的词典](https://marmooo.github.io/siminym-zh/)。

## Requirements

- [rye](https://github.com/mitsuhiko/rye)
- `sudo apt install clang libstdc++-12-dev` for
  [spotify/annoy](https://github.com/spotify/annoy)

## Installation

- install [fxsjy/jieba](https://github.com/fxsjy/jieba) licensed under the MIT
- install
  [cc.zh.300.vec.gz](https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.zh.300.vec.gz)
  from [fastText](https://fasttext.cc/docs/en/crawl-vectors.html) licensed under
  the [CC-BY-SA-3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- `rye sync`

## Build

```
deno run -RWES --allow-run="bash" build-all-db.js
bash build.sh
```

## Related projects

- [Siminym-en](https://github.com/marmooo/siminym-en) (English)
- [Siminym-ja](https://github.com/marmooo/siminym-ja) (Japanese)

## License

CC-BY-SA-4.0
