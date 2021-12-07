[{
    $group: {
        '1': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        11,
                        1
                    ]
                }
            }
        },
        '2': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        10,
                        1
                    ]
                }
            }
        },
        '4': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        9,
                        1
                    ]
                }
            }
        },
        '8': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        8,
                        1
                    ]
                }
            }
        },
        '16': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        7,
                        1
                    ]
                }
            }
        },
        '32': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        6,
                        1
                    ]
                }
            }
        },
        '64': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        5,
                        1
                    ]
                }
            }
        },
        '128': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        4,
                        1
                    ]
                }
            }
        },
        '256': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        3,
                        1
                    ]
                }
            }
        },
        '512': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        2,
                        1
                    ]
                }
            }
        },
        '1024': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        1,
                        1
                    ]
                }
            }
        },
        '2048': {
            $sum: {
                $toInt: {
                    $substr: [
                        '$n',
                        0,
                        1
                    ]
                }
            }
        },
        _id: null,
        c: {
            $sum: 0.5
        }
    }
}, {
    $project: {
        _id: 0,
        g1: {
            $cond: {
                'if': {
                    $gte: [
                        '$1',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g2: {
            $cond: {
                'if': {
                    $gte: [
                        '$2',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g4: {
            $cond: {
                'if': {
                    $gte: [
                        '$4',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g8: {
            $cond: {
                'if': {
                    $gte: [
                        '$8',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g16: {
            $cond: {
                'if': {
                    $gte: [
                        '$16',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g32: {
            $cond: {
                'if': {
                    $gte: [
                        '$32',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g64: {
            $cond: {
                'if': {
                    $gte: [
                        '$64',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g128: {
            $cond: {
                'if': {
                    $gte: [
                        '$128',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g256: {
            $cond: {
                'if': {
                    $gte: [
                        '$256',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g512: {
            $cond: {
                'if': {
                    $gte: [
                        '$512',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g1024: {
            $cond: {
                'if': {
                    $gte: [
                        '$1024',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        },
        g2048: {
            $cond: {
                'if': {
                    $gte: [
                        '$2048',
                        '$c'
                    ]
                },
                then: 1,
                'else': 0
            }
        }
    }
}, {
    $set: {
        e1: {
            $subtract: [
                1,
                '$g1'
            ]
        },
        e2: {
            $subtract: [
                1,
                '$g2'
            ]
        },
        e4: {
            $subtract: [
                1,
                '$g4'
            ]
        },
        e8: {
            $subtract: [
                1,
                '$g8'
            ]
        },
        e16: {
            $subtract: [
                1,
                '$g16'
            ]
        },
        e32: {
            $subtract: [
                1,
                '$g32'
            ]
        },
        e64: {
            $subtract: [
                1,
                '$g64'
            ]
        },
        e128: {
            $subtract: [
                1,
                '$g128'
            ]
        },
        e256: {
            $subtract: [
                1,
                '$g256'
            ]
        },
        e512: {
            $subtract: [
                1,
                '$g512'
            ]
        },
        e1024: {
            $subtract: [
                1,
                '$g1024'
            ]
        },
        e2048: {
            $subtract: [
                1,
                '$g2048'
            ]
        }
    }
}, {
    $project: {
        g: {
            $add: [{
                    $multiply: [
                        '$g1',
                        1
                    ]
                },
                {
                    $multiply: [
                        '$g2',
                        2
                    ]
                },
                {
                    $multiply: [
                        '$g4',
                        4
                    ]
                },
                {
                    $multiply: [
                        '$g8',
                        8
                    ]
                },
                {
                    $multiply: [
                        '$g16',
                        16
                    ]
                },
                {
                    $multiply: [
                        '$g32',
                        32
                    ]
                },
                {
                    $multiply: [
                        '$g64',
                        64
                    ]
                },
                {
                    $multiply: [
                        '$g128',
                        128
                    ]
                },
                {
                    $multiply: [
                        '$g256',
                        256
                    ]
                },
                {
                    $multiply: [
                        '$g512',
                        512
                    ]
                },
                {
                    $multiply: [
                        '$g1024',
                        1024
                    ]
                },
                {
                    $multiply: [
                        '$g2048',
                        2048
                    ]
                }
            ]
        },
        e: {
            $add: [{
                    $multiply: [
                        '$e1',
                        1
                    ]
                },
                {
                    $multiply: [
                        '$e2',
                        2
                    ]
                },
                {
                    $multiply: [
                        '$e4',
                        4
                    ]
                },
                {
                    $multiply: [
                        '$e8',
                        8
                    ]
                },
                {
                    $multiply: [
                        '$e16',
                        16
                    ]
                },
                {
                    $multiply: [
                        '$e32',
                        32
                    ]
                },
                {
                    $multiply: [
                        '$e64',
                        64
                    ]
                },
                {
                    $multiply: [
                        '$e128',
                        128
                    ]
                },
                {
                    $multiply: [
                        '$e256',
                        256
                    ]
                },
                {
                    $multiply: [
                        '$e512',
                        512
                    ]
                },
                {
                    $multiply: [
                        '$e1024',
                        1024
                    ]
                },
                {
                    $multiply: [
                        '$e2048',
                        2048
                    ]
                }
            ]
        }
    }
}, {
    $project: {
        result: {
            $multiply: [
                '$g',
                '$e'
            ]
        }
    }
}]
