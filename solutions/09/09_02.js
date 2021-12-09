[{$group: {
    _id: null,
    lines: {
     $push: {
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
        col: '$$i',
        hgt: {
         $toInt: {
          $substr: [
           '$line',
           '$$i',
           1
          ]
         }
        }
       }
      }
     }
    }
   }}, {$project: {
    _id: 0,
    heightmap: {
     $map: {
      input: {
       $range: [
        0,
        {
         $size: '$lines'
        }
       ]
      },
      as: 'i',
      'in': {
       $map: {
        input: {
         $arrayElemAt: [
          '$lines',
          '$$i'
         ]
        },
        as: 'o',
        'in': {
         row: '$$i',
         col: '$$o.col',
         hgt: '$$o.hgt'
        }
       }
      }
     }
    }
   }}, {$set: {
    low_points: {
     $map: {
      input: '$heightmap',
      as: 'row',
      'in': {
       $filter: {
        input: '$$row',
        as: 'pnt',
        cond: {
         $switch: {
          branches: [
           {
            'case': {
             $eq: [
              '$$pnt.row',
              0
             ]
            },
            then: {
             $switch: {
              branches: [
               {
                'case': {
                 $eq: [
                  '$$pnt.col',
                  0
                 ]
                },
                then: {
                 $and: [
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $arrayElemAt: [
                      '$$row.hgt',
                      {
                       $add: [
                        '$$pnt.col',
                        1
                       ]
                      }
                     ]
                    }
                   ]
                  },
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $getField: {
                      field: 'hgt',
                      input: {
                       $arrayElemAt: [
                        {
                         $arrayElemAt: [
                          '$heightmap',
                          {
                           $add: [
                            '$$pnt.row',
                            1
                           ]
                          }
                         ]
                        },
                        '$$pnt.col'
                       ]
                      }
                     }
                    }
                   ]
                  }
                 ]
                }
               },
               {
                'case': {
                 $eq: [
                  '$$pnt.col',
                  {
                   $subtract: [
                    {
                     $size: '$$row'
                    },
                    1
                   ]
                  }
                 ]
                },
                then: {
                 $and: [
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $arrayElemAt: [
                      '$$row.hgt',
                      {
                       $subtract: [
                        '$$pnt.col',
                        1
                       ]
                      }
                     ]
                    }
                   ]
                  },
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $getField: {
                      field: 'hgt',
                      input: {
                       $arrayElemAt: [
                        {
                         $arrayElemAt: [
                          '$heightmap',
                          {
                           $add: [
                            '$$pnt.row',
                            1
                           ]
                          }
                         ]
                        },
                        '$$pnt.col'
                       ]
                      }
                     }
                    }
                   ]
                  }
                 ]
                }
               }
              ],
              'default': {
               $and: [
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $arrayElemAt: [
                    '$$row.hgt',
                    {
                     $subtract: [
                      '$$pnt.col',
                      1
                     ]
                    }
                   ]
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $arrayElemAt: [
                    '$$row.hgt',
                    {
                     $add: [
                      '$$pnt.col',
                      1
                     ]
                    }
                   ]
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $getField: {
                    field: 'hgt',
                    input: {
                     $arrayElemAt: [
                      {
                       $arrayElemAt: [
                        '$heightmap',
                        {
                         $add: [
                          '$$pnt.row',
                          1
                         ]
                        }
                       ]
                      },
                      '$$pnt.col'
                     ]
                    }
                   }
                  }
                 ]
                }
               ]
              }
             }
            }
           },
           {
            'case': {
             $eq: [
              '$$pnt.row',
              {
               $subtract: [
                {
                 $size: '$heightmap'
                },
                1
               ]
              }
             ]
            },
            then: {
             $switch: {
              branches: [
               {
                'case': {
                 $eq: [
                  '$$pnt.col',
                  0
                 ]
                },
                then: {
                 $and: [
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $arrayElemAt: [
                      '$$row.hgt',
                      {
                       $add: [
                        '$$pnt.col',
                        1
                       ]
                      }
                     ]
                    }
                   ]
                  },
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $getField: {
                      field: 'hgt',
                      input: {
                       $arrayElemAt: [
                        {
                         $arrayElemAt: [
                          '$heightmap',
                          {
                           $subtract: [
                            '$$pnt.row',
                            1
                           ]
                          }
                         ]
                        },
                        '$$pnt.col'
                       ]
                      }
                     }
                    }
                   ]
                  }
                 ]
                }
               },
               {
                'case': {
                 $eq: [
                  '$$pnt.col',
                  {
                   $subtract: [
                    {
                     $size: '$$row'
                    },
                    1
                   ]
                  }
                 ]
                },
                then: {
                 $and: [
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $arrayElemAt: [
                      '$$row.hgt',
                      {
                       $subtract: [
                        '$$pnt.col',
                        1
                       ]
                      }
                     ]
                    }
                   ]
                  },
                  {
                   $lt: [
                    '$$pnt.hgt',
                    {
                     $getField: {
                      field: 'hgt',
                      input: {
                       $arrayElemAt: [
                        {
                         $arrayElemAt: [
                          '$heightmap',
                          {
                           $subtract: [
                            '$$pnt.row',
                            1
                           ]
                          }
                         ]
                        },
                        '$$pnt.col'
                       ]
                      }
                     }
                    }
                   ]
                  }
                 ]
                }
               }
              ],
              'default': {
               $and: [
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $arrayElemAt: [
                    '$$row.hgt',
                    {
                     $subtract: [
                      '$$pnt.col',
                      1
                     ]
                    }
                   ]
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $arrayElemAt: [
                    '$$row.hgt',
                    {
                     $add: [
                      '$$pnt.col',
                      1
                     ]
                    }
                   ]
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $getField: {
                    field: 'hgt',
                    input: {
                     $arrayElemAt: [
                      {
                       $arrayElemAt: [
                        '$heightmap',
                        {
                         $subtract: [
                          '$$pnt.row',
                          1
                         ]
                        }
                       ]
                      },
                      '$$pnt.col'
                     ]
                    }
                   }
                  }
                 ]
                }
               ]
              }
             }
            }
           }
          ],
          'default': {
           $switch: {
            branches: [
             {
              'case': {
               $eq: [
                '$$pnt.col',
                0
               ]
              },
              then: {
               $and: [
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $arrayElemAt: [
                    '$$row.hgt',
                    {
                     $add: [
                      '$$pnt.col',
                      1
                     ]
                    }
                   ]
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $getField: {
                    field: 'hgt',
                    input: {
                     $arrayElemAt: [
                      {
                       $arrayElemAt: [
                        '$heightmap',
                        {
                         $subtract: [
                          '$$pnt.row',
                          1
                         ]
                        }
                       ]
                      },
                      '$$pnt.col'
                     ]
                    }
                   }
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $getField: {
                    field: 'hgt',
                    input: {
                     $arrayElemAt: [
                      {
                       $arrayElemAt: [
                        '$heightmap',
                        {
                         $add: [
                          '$$pnt.row',
                          1
                         ]
                        }
                       ]
                      },
                      '$$pnt.col'
                     ]
                    }
                   }
                  }
                 ]
                }
               ]
              }
             },
             {
              'case': {
               $eq: [
                '$$pnt.col',
                {
                 $subtract: [
                  {
                   $size: '$$row'
                  },
                  1
                 ]
                }
               ]
              },
              then: {
               $and: [
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $arrayElemAt: [
                    '$$row.hgt',
                    {
                     $subtract: [
                      '$$pnt.col',
                      1
                     ]
                    }
                   ]
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $getField: {
                    field: 'hgt',
                    input: {
                     $arrayElemAt: [
                      {
                       $arrayElemAt: [
                        '$heightmap',
                        {
                         $subtract: [
                          '$$pnt.row',
                          1
                         ]
                        }
                       ]
                      },
                      '$$pnt.col'
                     ]
                    }
                   }
                  }
                 ]
                },
                {
                 $lt: [
                  '$$pnt.hgt',
                  {
                   $getField: {
                    field: 'hgt',
                    input: {
                     $arrayElemAt: [
                      {
                       $arrayElemAt: [
                        '$heightmap',
                        {
                         $add: [
                          '$$pnt.row',
                          1
                         ]
                        }
                       ]
                      },
                      '$$pnt.col'
                     ]
                    }
                   }
                  }
                 ]
                }
               ]
              }
             }
            ],
            'default': {
             $and: [
              {
               $lt: [
                '$$pnt.hgt',
                {
                 $arrayElemAt: [
                  '$$row.hgt',
                  {
                   $subtract: [
                    '$$pnt.col',
                    1
                   ]
                  }
                 ]
                }
               ]
              },
              {
               $lt: [
                '$$pnt.hgt',
                {
                 $arrayElemAt: [
                  '$$row.hgt',
                  {
                   $add: [
                    '$$pnt.col',
                    1
                   ]
                  }
                 ]
                }
               ]
              },
              {
               $lt: [
                '$$pnt.hgt',
                {
                 $getField: {
                  field: 'hgt',
                  input: {
                   $arrayElemAt: [
                    {
                     $arrayElemAt: [
                      '$heightmap',
                      {
                       $subtract: [
                        '$$pnt.row',
                        1
                       ]
                      }
                     ]
                    },
                    '$$pnt.col'
                   ]
                  }
                 }
                }
               ]
              },
              {
               $lt: [
                '$$pnt.hgt',
                {
                 $getField: {
                  field: 'hgt',
                  input: {
                   $arrayElemAt: [
                    {
                     $arrayElemAt: [
                      '$heightmap',
                      {
                       $add: [
                        '$$pnt.row',
                        1
                       ]
                      }
                     ]
                    },
                    '$$pnt.col'
                   ]
                  }
                 }
                }
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
    }
   }}, {$project: {
    basins: {
     $function: {
      body: 'function(heightmap, low_points) {\n        lps = low_points.reduce((acc, val) => acc.concat(val), [])\n        basins = []\n        for (let i = 0; i < lps.length; i++) {\n          let basin = []\n          let neighbours = [lps[i]]\n          while (neighbours.length > 0) {\n            let point = neighbours.pop()\n            if (basin.includes(point)) {\n              continue\n            }\n            basin.push(point)\n            for (let x = point.row - 1; x <= point.row + 1; x++) {\n              for (let y = point.col - 1; y <= point.col + 1; y ++) {\n                if (0 <= x && x < heightmap.length && 0 <= y && y < heightmap[x].length) {\n                  if (x == point.row ? !(y == point.col) : y == point.col) {\n                    new_neighbour = heightmap[x][y]\n                    if (!basin.includes(new_neighbour) && new_neighbour.hgt < 9) {\n                      neighbours.push(new_neighbour)\n                    }\n                  }\n                }\n              }\n            }\n          }\n          basins.push(basin.length - 1)\n        }\n        return basins\n      }',
      args: [
       '$heightmap',
       '$low_points'
      ],
      lang: 'js'
     }
    }
   }}, {$unwind: {
    path: '$basins'
   }}, {$sort: {
    basins: -1
   }}, {$limit: 3}, {$group: {
    _id: null,
    sizes: {
     $push: '$basins'
    }
   }}, {$project: {
    _id: 0,
    result: {
     $multiply: [
      {
       $multiply: [
        {
         $arrayElemAt: [
          '$sizes',
          0
         ]
        },
        {
         $arrayElemAt: [
          '$sizes',
          1
         ]
        }
       ]
      },
      {
       $arrayElemAt: [
        '$sizes',
        2
       ]
      }
     ]
    }
   }}]