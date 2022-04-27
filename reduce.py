words = {}
with open("words.lst", "w") as fout:
    count = 0
    with open("all.lst") as fin:
        for line in fin:
            count += 1
            if count > 1000:
                break
            word = line.split(",", 1)[0]
            words[word] = True
            fout.write(word + "\n")

with open("cc.zh.300-small.vec", "w") as fout:
    fout.write(str(len(words)) + " 300\n")
    with open("cc.zh.300.vec") as fin:
        for line in fin:
            word = line.split(" ", 1)[0]
            if word in words:
                fout.write(line)
