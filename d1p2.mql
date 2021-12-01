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
}}, {$set: {
 depths: {
  $map: {
   input: '$depths',
   as: 'this',
   'in': {
    $cond: {
     'if': {
      $lt: [
       '$$this.i',
       2
      ]
     },
     then: {
      i: '$$this.i',
      sum: 0
     },
     'else': {
      i: '$$this.i',
      sum: {
       $add: [
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
        },
        {
         $arrayElemAt: [
          '$depths.o.depth',
          {
           $subtract: [
            '$$this.i',
            2
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
 }
}}, {$set: {
 depths: {
  $filter: {
   input: '$depths',
   as: 'this',
   cond: {
    $and: [
     {
      $gte: [
       '$$this.i',
       3
      ]
     },
     {
      $gt: [
       '$$this.sum',
       {
        $arrayElemAt: [
         '$depths.sum',
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
    ]
   }
  }
 }
}}, {$project: {
 result: {
  $size: '$depths'
 }
}}]
