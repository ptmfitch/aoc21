[{$set: {
 is: {
  $map: {
   input: {
    $split: [
     '$is',
     ','
    ]
   },
   'in': {
    $toInt: '$$this'
   }
  }
 }
}}, {$project: {
 _id: 0,
 is: {
  $map: {
   input: {
    $range: [
     0,
     9
    ]
   },
   as: 'i',
   'in': {
    $size: {
     $filter: {
      input: '$is',
      cond: {
       $eq: [
        '$$this',
        '$$i'
       ]
      }
     }
    }
   }
  }
 }
}}, {$project: {
 _id: 0,
 result: {
  $function: {
   body: 'function(counts) {\n        for (let i = 0; i < 256; i++) {\n          let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0]\n          for (let j = 0; j < 9; j++) {\n            if (j == 0) {\n              temp[6] += counts[j]\n              temp[8] += counts[j]\n            } else {\n              temp[j - 1] += counts[j]\n            }\n          }\n          counts = temp\n        }\n        return counts.reduce((acc, cur) => acc + cur)\n      }',
   args: [
    '$is'
   ],
   lang: 'js'
  }
 }
}}]
