[{$project: {
  _id: 0,
  connection: [
   {
    $arrayElemAt: [
     {
      $split: [
       '$lines',
       '-'
      ]
     },
     0
    ]
   },
   {
    $arrayElemAt: [
     {
      $split: [
       '$lines',
       '-'
      ]
     },
     1
    ]
   }
  ]
 }}, {$group: {
  _id: 'null',
  connections: {
   $push: '$connection'
  }
 }}, {$project: {
  _id: 0,
  paths: {
   $function: {
    body: 'function(connections) {\n        let connectionDict = {}\n        let paths = []\n        for (let c of connections) {\n          if (connectionDict[c[0]]) {\n            connectionDict[c[0]].push(c[1])\n          } else {\n            connectionDict[c[0]] = [c[1]]\n          }\n          if (connectionDict[c[1]]) {\n            connectionDict[c[1]].push(c[0])\n          } else {\n            connectionDict[c[1]] = [c[0]]\n          } \n        }\n        function pathfind(cur, acc) {\n          if (acc[cur]) {\n            acc[cur]++\n          } else {\n            acc[cur] = 1\n          }\n          if (cur == \'end\') {\n            paths.push(acc)\n            return\n          }\n          for (let c of connectionDict[cur]) {\n            if (c.toLowerCase() == c && c in acc) {\n              continue\n            }\n            pathfind(c, Object.assign({}, acc))\n          }\n        }\n        pathfind(\'start\', {})\n        return paths\n      }',
    args: [
     '$connections'
    ],
    lang: 'js'
   }
  }
 }}, {$project: {
  result: {
   $size: '$paths'
  }
 }}]