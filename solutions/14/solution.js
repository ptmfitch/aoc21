[{$group: {
  _id: null,
  rules: {
   $push: {
    $cond: {
     'if': {
      $regexMatch: {
       input: '$line',
       regex: RegExp('.*->.*')
      }
     },
     then: {
      $let: {
       vars: {
        split: {
         $split: [
          '$line',
          ' -> '
         ]
        },
        first: {
         $substr: [
          '$line',
          0,
          1
         ]
        },
        second: {
         $substr: [
          '$line',
          1,
          1
         ]
        }
       },
       'in': {
        pair: {
         $arrayElemAt: [
          '$$split',
          0
         ]
        },
        insert: [
         {
          $concat: [
           '$$first',
           {
            $arrayElemAt: [
             '$$split',
             1
            ]
           }
          ]
         },
         {
          $concat: [
           {
            $arrayElemAt: [
             '$$split',
             1
            ]
           },
           '$$second'
          ]
         }
        ]
       }
      }
     },
     'else': null
    }
   }
  },
  template: {
   $push: {
    $cond: {
     'if': {
      $not: {
       $regexMatch: {
        input: '$line',
        regex: RegExp('.*->.*')
       }
      }
     },
     then: {
      $map: {
       input: {
        $range: [
         0,
         {
          $subtract: [
           {
            $strLenCP: '$line'
           },
           1
          ]
         }
        ]
       },
       as: 'i',
       'in': {
        $substr: [
         '$line',
         '$$i',
         2
        ]
       }
      }
     },
     'else': null
    }
   }
  }
 }}, {$set: {
  rules: {
   $filter: {
    input: '$rules',
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
  template: {
   $arrayElemAt: [
    {
     $filter: {
      input: '$template',
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
    0
   ]
  }
 }}, {$set: {
  firstAndLast: [
   {
    $substr: [
     {
      $first: '$template'
     },
     0,
     1
    ]
   },
   {
    $substr: [
     {
      $last: '$template'
     },
     1,
     1
    ]
   }
  ]
 }}, {$set: {
  steps: {
   $function: {
    body: 'function(rules, template, firstAndLast) {\n        let ruleDict = Object.assign({}, ...rules.map((x) => ({[x.pair]: x.insert})))\n        let pairDict = {}\n        for (let i = 0; i < template.length; i++) {\n          let pair = template[i]\n          if (!pairDict[pair]) {\n            pairDict[pair] = 1\n          } else {\n            pairDict[pair] += 1\n          }\n        }\n        for (let steps = 0; steps < 40; steps++) {\n          let newDict = {}\n          for (let [pair, n] of Object.entries(pairDict)) {\n            for (let newPair of ruleDict[pair]) {\n              if (!newDict[newPair]) {\n                newDict[newPair] = n\n              } else {\n                newDict[newPair] += n\n              }\n            }\n          }\n          pairDict = newDict\n        }\n        let elements = {}\n        for (let [key, value] of Object.entries(pairDict)) {\n          for (let element of key) {\n            if (!elements[element]) {\n              elements[element] = value / 2\n            } else {\n              elements[element] += value / 2\n            }\n          }\n        }\n        for (element of firstAndLast) {\n          elements[element] += 0.5\n        }\n        return elements\n      }',
    args: [
     '$rules',
     '$template',
     '$firstAndLast'
    ],
    lang: 'js'
   }
  }
 }}, {$project: {
  _id: 0,
  elements: {
   $map: {
    input: {
     $objectToArray: '$steps'
    },
    'in': '$$this.v'
   }
  }
 }}, {$project: {
  result: {
   $subtract: [
    {
     $max: '$elements'
    },
    {
     $min: '$elements'
    }
   ]
  }
 }}]