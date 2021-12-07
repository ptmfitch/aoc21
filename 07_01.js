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
   as: 'n',
   'in': {
    $sum: {
     $map: {
      input: '$crabs',
      as: 'crab',
      'in': {
       $abs: {
        $subtract: [
         '$$crab',
         '$$n'
        ]
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
