[{$project: {
 _id: 0,
 x1: {
  $toInt: {
   $arrayElemAt: [
    {
     $split: [
      '$0',
      ','
     ]
    },
    0
   ]
  }
 },
 y1: {
  $toInt: {
   $arrayElemAt: [
    {
     $split: [
      '$0',
      ','
     ]
    },
    1
   ]
  }
 },
 x2: {
  $toInt: {
   $arrayElemAt: [
    {
     $split: [
      '$2',
      ','
     ]
    },
    0
   ]
  }
 },
 y2: {
  $toInt: {
   $arrayElemAt: [
    {
     $split: [
      '$2',
      ','
     ]
    },
    1
   ]
  }
 }
}}, {$match: {
 $or: [
  {
   $expr: {
    $eq: [
     '$x1',
     '$x2'
    ]
   }
  },
  {
   $expr: {
    $eq: [
     '$y1',
     '$y2'
    ]
   }
  }
 ]
}}, {$project: {
 line: {
  $cond: {
   'if': {
    $eq: [
     '$x1',
     '$x2'
    ]
   },
   then: {
    $map: {
     input: {
      $range: [
       {
        $min: [
         '$y1',
         '$y2'
        ]
       },
       {
        $add: [
         {
          $max: [
           '$y1',
           '$y2'
          ]
         },
         1
        ]
       }
      ]
     },
     'in': {
      x: '$x1',
      y: '$$this'
     }
    }
   },
   'else': {
    $map: {
     input: {
      $range: [
       {
        $min: [
         '$x1',
         '$x2'
        ]
       },
       {
        $add: [
         {
          $max: [
           '$x1',
           '$x2'
          ]
         },
         1
        ]
       }
      ]
     },
     'in': {
      x: '$$this',
      y: '$y1'
     }
    }
   }
  }
 }
}}, {$unwind: {
 path: '$line'
}}, {$sortByCount: '$line'}, {$match: {
 count: {
  $gt: 1
 }
}}, {$group: {
 _id: null,
 result: {
  $sum: 1
 }
}}]
