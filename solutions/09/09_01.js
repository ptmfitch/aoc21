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
    result: {
     $sum: {
      $map: {
       input: '$low_points',
       as: 'row',
       'in': {
        $sum: {
         $map: {
          input: '$$row',
          as: 'pnt',
          'in': {
           $add: [
            '$$pnt.hgt',
            1
           ]
          }
         }
        }
       }
      }
     }
    }
   }}]