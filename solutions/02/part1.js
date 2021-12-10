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
 forward: {
  $sum: {
   $cond: {
    'if': {
     $eq: [
      '$direction',
      'forward'
     ]
    },
    then: '$distance',
    'else': 0
   }
  }
 },
 depth: {
  $sum: {
   $cond: {
    'if': {
     $eq: [
      '$direction',
      'down'
     ]
    },
    then: '$distance',
    'else': {
     $cond: {
      'if': {
       $eq: [
        '$direction',
        'up'
       ]
      },
      then: {
       $multiply: [
        '$distance',
        -1
       ]
      },
      'else': 0
     }
    }
   }
  }
 }
}}, {$project: {
 _id: 0,
 result: {
  $multiply: [
   '$forward',
   '$depth'
  ]
 }
}}]
