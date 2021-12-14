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
 }}, {$unwind: {
  path: '$folds'
 }}, {$sort: {
  folds: -1
 }}, {$group: {
  _id: null,
  dots: {
   $addToSet: '$dots'
  },
  folds: {
   $push: '$folds'
  }
 }}, {$set: {
  dots: {
   $arrayElemAt: [
    '$dots',
    0
   ]
  }
 }}, {$set: {
  fold: {
   $function: {
    body: 'function(dots, folds) {\n        for (let i = 0; i < folds.length; i++) {\n          let fold = folds[i]\n          for (let j = 0; j < dots.length; j++) {\n            let dot = dots[j]\n            if (fold.axis == "x") {\n              if (dot.x > fold.n) {\n                dots[j] = {\n                  x: fold.n - (dot.x - fold.n),\n                  y: dot.y\n                }\n              }\n            } else {\n              if (dot.y > fold.n) {\n                dots[j] = {\n                  x: dot.x,\n                  y: fold.n - (dot.y - fold.n)\n                }\n              }\n            }\n          }\n        }\n        return dots\n      }',
    args: [
     '$dots',
     '$folds'
    ],
    lang: 'js'
   }
  }
 }}, {$unwind: {
  path: '$fold'
 }}, {$group: {
  _id: '$fold.y',
  dots: {
   $addToSet: '$fold.x'
  }
 }}, {$project: {
  s: {
   $map: {
    input: {
     $range: [
      0,
      {
       $add: [
        {
         $max: '$dots'
        },
        1
       ]
      }
     ]
    },
    as: 'i',
    'in': {
     $cond: {
      'if': {
       $in: [
        '$$i',
        '$dots'
       ]
      },
      then: '#',
      'else': '.'
     }
    }
   }
  }
 }}, {$sort: {
  _id: 1
 }}, {$set: {
  s: {
   $reduce: {
    input: '$s',
    initialValue: '',
    'in': {
     $concat: [
      '$$value',
      '$$this'
     ]
    }
   }
  }
 }}, {$group: {
  _id: null,
  ss: {
   $push: '$s'
  }
 }}]