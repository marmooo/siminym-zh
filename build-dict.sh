deno run -RW reduce.js
rye run python reduce.py $1
rye run python -m pymagnitude.converter \
  -i cc.zh.300-small.vec \
  -o cc.zh.300-small.magnitude
rye run python similars.py
