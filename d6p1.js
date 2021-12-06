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
 result: {
  $function: {
   body: 'function(fish) {\n        for (let i = 0; i < 80; i++) {\n          let temp = []\n          for (let j = 0; j < fish.length; j++) {\n            if (fish[j] == 0) {\n              temp.push(6)\n              temp.push(8)\n            } else {\n              temp.push(fish[j] - 1)\n            }\n          }\n          fish = temp\n        }\n        return fish.length\n      }',
   args: [
    '$is'
   ],
   lang: 'js'
  }
 }
}}]
