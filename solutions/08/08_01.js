[{$project: {
    _id: 0,
    display: {
     $let: {
      vars: {
       split: {
        $split: [
         '$input | output',
         ' | '
        ]
       }
      },
      'in': {
       signals: {
        $split: [
         {
          $arrayElemAt: [
           '$$split',
           0
          ]
         },
         ' '
        ]
       },
       output: {
        $split: [
         {
          $arrayElemAt: [
           '$$split',
           1
          ]
         },
         ' '
        ]
       }
      }
     }
    }
   }}, {$project: {
    easy: {
     $filter: {
      input: '$display.output',
      cond: {
       $in: [
        {
         $strLenCP: '$$this'
        },
        [
         2,
         4,
         3,
         7
        ]
       ]
      }
     }
    }
   }}, {$group: {
    _id: null,
    result: {
     $sum: {
      $size: '$easy'
     }
    }
   }}]