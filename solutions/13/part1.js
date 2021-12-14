[{$group: {
  _id: null,
  dots: {
   $push: {
    $cond: {
     'if': {
      $isNumber: '$a'
     },
     then: {
      x: '$a',
      y: '$b'
     },
     'else': null
    }
   }
  },
  folds: {
   $push: {
    $cond: {
     'if': {
      $not: {
       $isNumber: '$a'
      }
     },
     then: {
      $let: {
       vars: {
        split: {
         $split: [
          {
           $arrayElemAt: [
            {
             $split: [
              '$a',
              ' '
             ]
            },
            2
           ]
          },
          '='
         ]
        }
       },
       'in': {
        axis: {
         $arrayElemAt: [
          '$$split',
          0
         ]
        },
        n: {
         $toInt: {
          $arrayElemAt: [
           '$$split',
           1
          ]
         }
        }
       }
      }
     },
     'else': null
    }
   }
  }
 }}, {$set: {
  dots: {
   $filter: {
    input: '$dots',
    cond: {
     $not: {
      $eq: [
       '$$this',
       null
      ]
     }
    }
   }
  },
  folds: {
   $filter: {
    input: '$folds',
    cond: {
     $not: {
      $eq: [
       '$$this',
       null
      ]
     }
    }
   }
  }
 }}, {$set: {
  fold: {
   $let: {
    vars: {
     axis: {
      $arrayElemAt: [
       '$folds.axis',
       0
      ]
     },
     n: {
      $arrayElemAt: [
       '$folds.n',
       0
      ]
     }
    },
    'in': {
     $map: {
      input: '$dots',
      as: 'dot',
      'in': {
       $cond: {
        'if': {
         $eq: [
          '$$axis',
          'x'
         ]
        },
        then: {
         $cond: {
          'if': {
           $gt: [
            '$$dot.x',
            '$$n'
           ]
          },
          then: {
           x: {
            $subtract: [
             '$$n',
             {
              $subtract: [
               '$$dot.x',
               '$$n'
              ]
             }
            ]
           },
           y: '$$dot.y'
          },
          'else': '$$dot'
         }
        },
        'else': {
         $cond: {
          'if': {
           $gt: [
            '$$dot.y',
            '$$n'
           ]
          },
          then: {
           x: '$$dot.x',
           y: {
            $subtract: [
             '$$n',
             {
              $subtract: [
               '$$dot.y',
               '$$n'
              ]
             }
            ]
           }
          },
          'else': '$$dot'
         }
        }
       }
      }
     }
    }
   }
  }
 }}, {$unwind: {
  path: '$fold'
 }}, {$group: {
  _id: null,
  dots: {
   $addToSet: '$fold'
  }
 }}, {$project: {
  _id: 0,
  result: {
   $size: '$dots'
  }
 }}]