[{$match: {
  line: {
   $exists: true
  }
 }}, {$group: {
  _id: null,
  lines: {
   $push: '$$ROOT'
  }
 }}, {$project: {
  _id: 0,
  numbers: {
   $split: [
    {
     $arrayElemAt: [
      '$lines.line',
      0
     ]
    },
    ','
   ]
  },
  boards_h: {
   $map: {
    input: {
     $range: [
      1,
      {
       $size: '$lines'
      },
      5
     ]
    },
    as: 'i',
    'in': {
     $map: {
      input: {
       $range: [
        0,
        5
       ]
      },
      as: 'j',
      'in': {
       $filter: {
        input: {
         $split: [
          {
           $arrayElemAt: [
            '$lines.line',
            {
             $add: [
              '$$i',
              '$$j'
             ]
            }
           ]
          },
          ' '
         ]
        },
        cond: {
         $gt: [
          '$$this',
          ''
         ]
        }
       }
      }
     }
    }
   }
  }
 }}, {$set: {
  boards_v: {
   $map: {
    input: '$boards_h',
    as: 'board',
    'in': {
     $map: {
      input: {
       $range: [
        0,
        5
       ]
      },
      as: 'i',
      'in': {
       $map: {
        input: {
         $range: [
          0,
          5
         ]
        },
        as: 'j',
        'in': {
         $arrayElemAt: [
          {
           $arrayElemAt: [
            '$$board',
            '$$j'
           ]
          },
          '$$i'
         ]
        }
       }
      }
     }
    }
   }
  }
 }}, {$set: {
  min_indices_h: {
   $map: {
    input: '$boards_h',
    as: 'board',
    'in': {
     $min: {
      $map: {
       input: '$$board',
       as: 'line',
       'in': {
        $max: {
         $map: {
          input: '$$line',
          as: 'n',
          'in': {
           $indexOfArray: [
            '$numbers',
            '$$n'
           ]
          }
         }
        }
       }
      }
     }
    }
   }
  },
  min_indices_v: {
   $map: {
    input: '$boards_v',
    as: 'board',
    'in': {
     $min: {
      $map: {
       input: '$$board',
       as: 'line',
       'in': {
        $max: {
         $map: {
          input: '$$line',
          as: 'n',
          'in': {
           $indexOfArray: [
            '$numbers',
            '$$n'
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
 }}, {$set: {
  max_index: {
   $max: {
    $map: {
     input: {
      $range: [
       0,
       {
        $size: '$min_indices_h'
       }
      ]
     },
     'in': {
      $min: [
       {
        $arrayElemAt: [
         '$min_indices_h',
         '$$this'
        ]
       },
       {
        $arrayElemAt: [
         '$min_indices_v',
         '$$this'
        ]
       }
      ]
     }
    }
   }
  }
 }}, {$set: {
  winning_board_index: {
   $indexOfArray: [
    {
     $arrayElemAt: [
      {
       $filter: {
        input: [
         '$min_indices_h',
         '$min_indices_v'
        ],
        cond: {
         $in: [
          '$max_index',
          '$$this'
         ]
        }
       }
      },
      0
     ]
    },
    '$max_index'
   ]
  },
  final_number_called: {
   $toInt: {
    $arrayElemAt: [
     '$numbers',
     '$max_index'
    ]
   }
  }
 }}, {$set: {
  winning_board_numbers: {
   $reduce: {
    input: {
     $arrayElemAt: [
      '$boards_h',
      '$winning_board_index'
     ]
    },
    initialValue: [],
    'in': {
     $concatArrays: [
      '$$value',
      '$$this'
     ]
    }
   }
  }
 }}, {$set: {
  remaining_numbers: {
   $filter: {
    input: '$winning_board_numbers',
    cond: {
     $gt: [
      {
       $indexOfArray: [
        '$numbers',
        '$$this'
       ]
      },
      '$max_index'
     ]
    }
   }
  }
 }}, {$set: {
  remaining_sum: {
   $sum: {
    $map: {
     input: '$remaining_numbers',
     'in': {
      $toInt: '$$this'
     }
    }
   }
  }
 }}, {$project: {
  result: {
   $multiply: [
    '$remaining_sum',
    '$final_number_called'
   ]
  }
 }}]
 