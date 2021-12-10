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
    corrupted: {
     $function: {
      body: 'function(chars) {\n        let openers = ["{", "[", "(", "<"]\n        let current = []\n        for (let i = 0; i < chars.length; i++) {\n          let c = chars[i]\n          if (openers.includes(c)) {\n            current.push(c)\n          } else {\n            switch(c) {\n              case \'}\':\n                if (current[current.length-1] != \'{\') {\n                  return c\n                }\n                break\n              case \']\':\n                if (current[current.length-1] != \'[\') {\n                  return c\n                }\n                break\n              case \')\':\n                if (current[current.length-1] != \'(\') {\n                  return c\n                }\n                break\n              case \'>\':\n                if (current[current.length-1] != \'<\') {\n                  return c\n                }\n                break\n            }\n            current.pop()\n          }\n        }\n      }',
      args: [
       '$chars'
      ],
      lang: 'js'
     }
    }
   }}, {$sortByCount: '$corrupted'}, {$group: {
    _id: null,
    result: {
     $sum: {
      $switch: {
       branches: [
        {
         'case': {
          $eq: [
           '$_id',
           ')'
          ]
         },
         then: {
          $multiply: [
           '$count',
           3
          ]
         }
        },
        {
         'case': {
          $eq: [
           '$_id',
           ']'
          ]
         },
         then: {
          $multiply: [
           '$count',
           57
          ]
         }
        },
        {
         'case': {
          $eq: [
           '$_id',
           '}'
          ]
         },
         then: {
          $multiply: [
           '$count',
           1197
          ]
         }
        },
        {
         'case': {
          $eq: [
           '$_id',
           '>'
          ]
         },
         then: {
          $multiply: [
           '$count',
           25137
          ]
         }
        }
       ],
       'default': 0
      }
     }
    }
   }}]