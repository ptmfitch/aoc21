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
   }}, {$set: {
    display: {
     signals: {
      $map: {
       input: '$display.signals',
       as: 'str',
       'in': {
        $map: {
         input: {
          $range: [
           0,
           {
            $strLenCP: {
             $arrayElemAt: [
              '$display.signals',
              {
               $indexOfArray: [
                '$display.signals',
                '$$str'
               ]
              }
             ]
            }
           }
          ]
         },
         'in': {
          $substr: [
           '$$str',
           '$$this',
           1
          ]
         }
        }
       }
      }
     },
     output: {
      $map: {
       input: '$display.output',
       as: 'str',
       'in': {
        $map: {
         input: {
          $range: [
           0,
           {
            $strLenCP: {
             $arrayElemAt: [
              '$display.output',
              {
               $indexOfArray: [
                '$display.output',
                '$$str'
               ]
              }
             ]
            }
           }
          ]
         },
         'in': {
          $substr: [
           '$$str',
           '$$this',
           1
          ]
         }
        }
       }
      }
     }
    }
   }}, {$set: {
    easy: {
     $filter: {
      input: '$display.signals',
      cond: {
       $in: [
        {
         $size: '$$this'
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
   }}, {$unwind: '$easy'}, {$set: {
    l: {
     $size: '$easy'
    }
   }}, {$sort: {
    l: 1
   }}, {$group: {
    _id: '$display',
    easy: {
     $push: '$easy'
    }
   }}, {$project: {
    _id: 0,
    display: '$_id',
    one: {
     $first: '$easy'
    },
    four: {
     $arrayElemAt: [
      '$easy',
      2
     ]
    },
    seven: {
     $arrayElemAt: [
      '$easy',
      1
     ]
    },
    eight: {
     $last: '$easy'
    }
   }}, {$set: {
    a: {
     $first: {
      $filter: {
       input: '$seven',
       cond: {
        $not: {
         $in: [
          '$$this',
          '$one'
         ]
        }
       }
      }
     }
    },
    n_5s: {
     $filter: {
      input: '$display.signals',
      cond: {
       $eq: [
        {
         $size: '$$this'
        },
        5
       ]
      }
     }
    },
    n_6s: {
     $filter: {
      input: '$display.signals',
      cond: {
       $eq: [
        {
         $size: '$$this'
        },
        6
       ]
      }
     }
    }
   }}, {$set: {
    three: {
     $first: {
      $filter: {
       input: '$n_5s',
       cond: {
        $allElementsTrue: [
         {
          $map: {
           input: '$one',
           as: 'c',
           'in': {
            $in: [
             '$$c',
             '$$this'
            ]
           }
          }
         }
        ]
       }
      }
     }
    },
    six: {
     $first: {
      $filter: {
       input: '$n_6s',
       cond: {
        $not: {
         $allElementsTrue: [
          {
           $map: {
            input: '$one',
            as: 'c',
            'in': {
             $in: [
              '$$c',
              '$$this'
             ]
            }
           }
          }
         ]
        }
       }
      }
     }
    },
    nine: {
     $first: {
      $filter: {
       input: '$n_6s',
       cond: {
        $and: [
         {
          $in: [
           '$a',
           '$$this'
          ]
         },
         {
          $allElementsTrue: [
           {
            $map: {
             input: '$four',
             as: 'c',
             'in': {
              $in: [
               '$$c',
               '$$this'
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
   }}, {$set: {
    zero: {
     $first: {
      $filter: {
       input: '$n_6s',
       cond: {
        $and: [
         {
          $ne: [
           '$$this',
           '$six'
          ]
         },
         {
          $ne: [
           '$$this',
           '$nine'
          ]
         }
        ]
       }
      }
     }
    },
    five: {
     $first: {
      $filter: {
       input: '$n_5s',
       cond: {
        $allElementsTrue: [
         {
          $map: {
           input: '$$this',
           as: 'c',
           'in': {
            $in: [
             '$$c',
             '$six'
            ]
           }
          }
         }
        ]
       }
      }
     }
    }
   }}, {$set: {
    two: {
     $first: {
      $filter: {
       input: '$n_5s',
       cond: {
        $and: [
         {
          $ne: [
           '$$this',
           '$three'
          ]
         },
         {
          $ne: [
           '$$this',
           '$five'
          ]
         }
        ]
       }
      }
     }
    }
   }}, {$project: {
    output: {
     $map: {
      input: '$display.output',
      'in': {
       $cond: {
        'if': {
         $setEquals: [
          '$$this',
          '$zero'
         ]
        },
        then: 0,
        'else': {
         $cond: {
          'if': {
           $setEquals: [
            '$$this',
            '$one'
           ]
          },
          then: 1,
          'else': {
           $cond: {
            'if': {
             $setEquals: [
              '$$this',
              '$two'
             ]
            },
            then: 2,
            'else': {
             $cond: {
              'if': {
               $setEquals: [
                '$$this',
                '$three'
               ]
              },
              then: 3,
              'else': {
               $cond: {
                'if': {
                 $setEquals: [
                  '$$this',
                  '$four'
                 ]
                },
                then: 4,
                'else': {
                 $cond: {
                  'if': {
                   $setEquals: [
                    '$$this',
                    '$five'
                   ]
                  },
                  then: 5,
                  'else': {
                   $cond: {
                    'if': {
                     $setEquals: [
                      '$$this',
                      '$six'
                     ]
                    },
                    then: 6,
                    'else': {
                     $cond: {
                      'if': {
                       $setEquals: [
                        '$$this',
                        '$seven'
                       ]
                      },
                      then: 7,
                      'else': {
                       $cond: {
                        'if': {
                         $setEquals: [
                          '$$this',
                          '$eight'
                         ]
                        },
                        then: 8,
                        'else': 9
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
         }
        }
       }
      }
     }
    }
   }}, {$project: {
    decoded: {
     $add: [
      {
       $multiply: [
        {
         $first: '$output'
        },
        1000
       ]
      },
      {
       $multiply: [
        {
         $arrayElemAt: [
          '$output',
          1
         ]
        },
        100
       ]
      },
      {
       $multiply: [
        {
         $arrayElemAt: [
          '$output',
          2
         ]
        },
        10
       ]
      },
      {
       $last: '$output'
      }
     ]
    }
   }}, {$group: {
    _id: null,
    result: {
     $sum: '$decoded'
    }
   }}]