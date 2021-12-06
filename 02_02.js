[{$set: {
 split: {
  $split: [
   '$instruction',
   ' '
  ]
 }
}}, {$project: {
 _id: 0,
 direction: {
  $arrayElemAt: [
   '$split',
   0
  ]
 },
 distance: {
  $toInt: {
   $arrayElemAt: [
    '$split',
    1
   ]
  }
 }
}}, {$group: {
 _id: null,
 accumulator: {
  $accumulator: {
   init: 'function() {\n      return {\n        forward: 0,\n        depth: 0,\n        aim: 0\n      }\n    }',
   accumulate: 'function(state, direction, distance) {\n      let fw = state.forward\n      let dp = state.depth\n      let am = state.aim\n      if (direction == "forward") {\n        fw += distance\n        dp += distance * am\n      } else {\n        if (direction == "down") {\n          am += distance\n        } else {\n          am -= distance\n        }\n      }\n      return {\n        forward: fw,\n        depth: dp,\n        aim: am\n      }\n    }',
   accumulateArgs: [
    '$direction',
    '$distance'
   ],
   merge: 'function(state1, state2) {\n      return {\n        forward: state1.forward + state2.forward,\n        depth: state1.depth + state2.depth,\n        aim: state1.aim + state2.aim\n      }\n    }',
   lang: 'js'
  }
 }
}}, {$project: {
 _id: 0,
 result: {
  $multiply: [
   '$accumulator.forward',
   '$accumulator.depth'
  ]
 }
}}]
