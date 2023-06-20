deno run --allow-read --allow-write reduce.js
python reduce.py $1
python -m pymagnitude.converter \
  -i cc.zh.300-small.vec \
  -o cc.zh.300-small.magnitude
python similars.py
