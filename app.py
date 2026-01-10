splitted=[]
joined="javascript:"
with open('./bk.js', 'r') as in_file:
    for line in in_file:
        splitted.append(line.strip())
joined+=''.join(splitted)
with open('./converted-bkmklt.txt', 'w', encoding='utf-8') as out_file:
    out_file.write(joined)
    print(f'writtern successfully to {out_file.name}')