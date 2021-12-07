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
  },
  {
   $expr: {
    $eq: [
     {
      $subtract: [
       {
        $max: [
         '$x1',
         '$x2'
        ]
       },
       {
        $min: [
         '$x1',
         '$x2'
        ]
       }
      ]
     },
     {
      $subtract: [
       {
        $max: [
         '$y1',
         '$y2'
        ]
       },
       {
        $min: [
         '$y1',
         '$y2'
        ]
       }
      ]
     }
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
    $cond: {
     'if': {
      $eq: [
       '$y1',
       '$y2'
      ]
     },
     then: {
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
     },
     'else': {
      $cond: {
       'if': {
        $and: [
         {
          $lt: [
           '$x1',
           '$x2'
          ]
         },
         {
          $lt: [
           '$y1',
           '$y2'
          ]
         }
        ]
       },
       then: {
        $map: {
         input: {
          $range: [
           '$x1',
           {
            $add: [
             '$x2',
             1
            ]
           }
          ]
         },
         'in': {
          x: '$$this',
          y: {
           $add: [
            {
             $subtract: [
              '$$this',
              '$x1'
             ]
            },
            '$y1'
           ]
          }
         }
        }
       },
       'else': {
        $cond: {
         'if': {
          $and: [
           {
            $lt: [
             '$x1',
             '$x2'
            ]
           },
           {
            $gt: [
             '$y1',
             '$y2'
            ]
           }
          ]
         },
         then: {
          $map: {
           input: {
            $range: [
             '$x1',
             {
              $add: [
               '$x2',
               1
              ]
             }
            ]
           },
           'in': {
            x: '$$this',
            y: {
             $subtract: [
              {
               $add: [
                '$x1',
                '$y1'
               ]
              },
              '$$this'
             ]
            }
           }
          }
         },
         'else': {
          $cond: {
           'if': {
            $and: [
             {
              $gt: [
               '$x1',
               '$x2'
              ]
             },
             {
              $gt: [
               '$y1',
               '$y2'
              ]
             }
            ]
           },
           then: {
            $map: {
             input: {
              $range: [
               '$x2',
               {
                $add: [
                 '$x1',
                 1
                ]
               }
              ]
             },
             'in': {
              x: '$$this',
              y: {
               $add: [
                {
                 $subtract: [
                  '$$this',
                  '$x1'
                 ]
                },
                '$y1'
               ]
              }
             }
            }
           },
           'else': {
            $map: {
             input: {
              $range: [
               '$x2',
               {
                $add: [
                 '$x1',
                 1
                ]
               }
              ]
             },
             'in': {
              x: '$$this',
              y: {
               $subtract: [
                {
                 $add: [
                  '$x1',
                  '$y1'
                 ]
                },
                '$$this'
               ]
              }
             }
            }
           }
          }
         }
        }
       }
      }
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
