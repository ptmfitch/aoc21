[{$group: {
 _id: null,
 depths: {
  $push: '$$ROOT'
 }
}}, {$project: {
 _id: 0,
 depths: {
  $map: {
   input: '$depths',
   as: 'this',
   'in': {
    i: {
     $indexOfArray: [
      '$depths',
      '$$this'
     ]
    },
    o: '$$this'
   }
  }
 }
}}, {$project: {
 depths: {
  $filter: {
   input: '$depths',
   as: 'this',
   cond: {
    $cond: {
     'if': {
      $eq: [
       '$$this.i',
       0
      ]
     },
     then: false,
     'else': {
      $gt: [
       '$$this.o.depth',
       {
        $arrayElemAt: [
         '$depths.o.depth',
         {
          $subtract: [
           '$$this.i',
           1
          ]
         }
        ]
       }
      ]
     }
    }
   }
  }
 }
}}, {$project: {
 result: {
  $size: '$depths'
 }
}}]
