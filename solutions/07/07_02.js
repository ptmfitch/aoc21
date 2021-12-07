[{$project: {
 _id: 0,
 crabs: {
  $map: {
   input: {
    $split: [
     '$crabs',
     ','
    ]
   },
   'in': {
    $toInt: '$$this'
   }
  }
 }
}}, {$set: {
 distances: {
  $map: {
   input: {
    $range: [
     {
      $min: '$crabs'
     },
     {
      $max: '$crabs'
     }
    ]
   },
   as: 'pos',
   'in': {
    $sum: {
     $map: {
      input: '$crabs',
      as: 'crab',
      'in': {
       $let: {
        vars: {
         n: {
          $abs: {
           $subtract: [
            '$$crab',
            '$$pos'
           ]
          }
         }
        },
        'in': {
         $multiply: [
          '$$n',
          {
           $divide: [
            {
             $add: [
              '$$n',
              1
             ]
            },
            2
           ]
          }
         ]
        }
       }
      }
     }
    }
   }
  }
 }
}}, {$project: {
 result: {
  $min: '$distances'
 }
}}]
