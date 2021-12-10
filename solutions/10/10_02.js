[{$project: {
    _id: 0,
    chars: {
     $map: {
      input: {
       $range: [
        0,
        {
         $strLenCP: '$line'
        }
       ]
      },
      as: 'i',
      'in': {
       $substr: [
        '$line',
        '$$i',
        1
       ]
      }
     }
    }
   }}, {$project: {
    incomplete: {
     $function: {
      body: 'function(chars) {\n          let openers = ["{", "[", "(", "<"]\n          let current = []\n          for (let i = 0; i < chars.length; i++) {\n              let last = current[current.length-1]\n              let c = chars[i]\n              if (openers.includes(c)) {\n              current.push(c)\n              } else {\n              switch(c) {\n                  case \'}\':\n                  if (last != \'{\') {\n                      return null\n                  }\n                  break\n                  case \']\':\n                  if (last != \'[\') {\n                      return null\n                  }\n                  break\n                  case \')\':\n                  if (last != \'(\') {\n                      return null\n                  }\n                  break\n                  case \'>\':\n                  if (last != \'<\') {\n                      return null\n                  }\n                  break\n              }\n              current.pop()\n              }\n          }\n          return current\n      }',
      args: [
       '$chars'
      ],
      lang: 'js'
     }
    }
   }}, {$match: {
    $expr: {
     $gt: [
      '$incomplete',
      0
     ]
    }
   }}, {$project: {
    missing: {
     $map: {
      input: {
       $reverseArray: '$incomplete'
      },
      as: 'c',
      'in': {
       $switch: {
        branches: [
         {
          'case': {
           $eq: [
            '$$c',
            '('
           ]
          },
          then: 1
         },
         {
          'case': {
           $eq: [
            '$$c',
            '['
           ]
          },
          then: 2
         },
         {
          'case': {
           $eq: [
            '$$c',
            '{'
           ]
          },
          then: 3
         },
         {
          'case': {
           $eq: [
            '$$c',
            '<'
           ]
          },
          then: 4
         }
        ]
       }
      }
     }
    }
   }}, {$project: {
    score: {
     $function: {
      body: 'function(points) {\n        let score = 0\n        for (let i = 0; i < points.length; i++) {\n          score *= 5\n          score += points[i]\n        }\n        return score\n      }',
      args: [
       '$missing'
      ],
      lang: 'js'
     }
    }
   }}, {$sort: {
    score: -1
   }}, {$group: {
    _id: null,
    scores: {
     $push: '$score'
    }
   }}, {$project: {
    _id: 0,
    result: {
     $arrayElemAt: [
      '$scores',
      {
       $divide: [
        {
         $subtract: [
          {
           $size: '$scores'
          },
          1
         ]
        },
        2
       ]
      }
     ]
    }
   }}]