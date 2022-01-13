[{$set: {
 n_binary: {
  $map: {
   input: {
    $range: [
     0,
     {
      $strLenCP: '$n'
     }
    ]
   },
   'in': {
    $toInt: {
     $substr: [
      '$n',
      '$$this',
      1
     ]
    }
   }
  }
 }
}}, {$set: {
 n_decimal: {
  $sum: {
   $map: {
    input: {
     $range: [
      0,
      {
       $size: '$n_binary'
      }
     ]
    },
    'in': {
     $multiply: [
      {
       $arrayElemAt: [
        '$n_binary',
        {
         $subtract: [
          {
           $size: '$n_binary'
          },
          {
           $add: [
            '$$this',
            1
           ]
          }
         ]
        }
       ]
      },
      {
       $pow: [
        2,
        '$$this'
       ]
      }
     ]
    }
   }
  }
 }
}}, {$group: {
 _id: null,
 ogr: {
  $push: '$$ROOT'
 },
 csr: {
  $push: '$$ROOT'
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         0
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                0
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         0
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                0
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         1
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                1
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         1
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                1
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         2
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                2
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         2
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                2
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         3
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                3
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         3
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                3
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         4
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                4
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         4
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                4
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         5
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                5
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         5
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                5
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         6
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                6
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         6
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                6
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         7
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                7
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         7
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                7
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         8
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                8
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         8
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                8
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         9
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                9
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         9
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                9
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         10
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                10
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         10
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                10
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$set: {
 ogr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$ogr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$ogr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         11
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$ogr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                11
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$ogr'
             },
             2
            ]
           }
          ]
         },
         then: 1,
         'else': 0
        }
       }
      ]
     }
    }
   },
   'else': '$ogr'
  }
 },
 csr: {
  $cond: {
   'if': {
    $gt: [
     {
      $size: '$csr'
     },
     1
    ]
   },
   then: {
    $filter: {
     input: '$csr',
     cond: {
      $eq: [
       {
        $arrayElemAt: [
         '$$this.n_binary',
         11
        ]
       },
       {
        $cond: {
         'if': {
          $gte: [
           {
            $sum: {
             $map: {
              input: '$csr',
              'in': {
               $arrayElemAt: [
                '$$this.n_binary',
                11
               ]
              }
             }
            }
           },
           {
            $divide: [
             {
              $size: '$csr'
             },
             2
            ]
           }
          ]
         },
         then: 0,
         'else': 1
        }
       }
      ]
     }
    }
   },
   'else': '$csr'
  }
 }
}}, {$project: {
 _id: 0,
 result: {
  $multiply: [
   {
    $arrayElemAt: [
     '$ogr.n_decimal',
     0
    ]
   },
   {
    $arrayElemAt: [
     '$csr.n_decimal',
     0
    ]
   }
  ]
 }
}}]
