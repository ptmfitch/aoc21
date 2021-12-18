arr = []
with open('./solutions/17/sample_output.csv') as file:
  for line in file:
    split = line.split(',')
    arr.append((int(split[0]), int(split[1])))
print(len(arr))
arr.sort(key=lambda x: x[1])
arr.sort()
for line in arr:
  print(line)