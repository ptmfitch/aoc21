[
  {
    $group: {
      _id: null,
      lines: {
        $push: {
          $map: {
            input: {
              $range: [
                0,
                {
                  $strLenCP: "$line",
                },
              ],
            },
            in: {
              $toInt: {
                $substr: ["$line", "$$this", 1],
              },
            },
          },
        },
      },
    },
  },
  {
    $project: {
      res: {
        $reduce: {
          input: {
            $range: [0, { $size: { $first: "$lines" } }],
          },
          initialValue: {
            o: "$lines",
            c: "$lines",
          },
          in: {
            $let: {
              vars: {
                oN: {
                  $cond: {
                    if: {
                      $gte: [
                        {
                          $sum: {
                            $map: {
                              input: "$$value.o",
                              as: "line",
                              in: {
                                $arrayElemAt: [
                                  "$$line",
                                  "$$this",
                                ],
                              },
                            },
                          },
                        },
                        {
                          $divide: [
                            { $size: "$$value.o" },
                            2,
                          ],
                        },
                      ],
                    },
                    then: 1,
                    else: 0,
                  },
                },
                cN: {
                  $cond: {
                    if: {
                      $gte: [
                        {
                          $sum: {
                            $map: {
                              input: "$$value.c",
                              as: "line",
                              in: {
                                $arrayElemAt: [
                                  "$$line",
                                  "$$this",
                                ],
                              },
                            },
                          },
                        },
                        {
                          $divide: [
                            { $size: "$$value.c" },
                            2,
                          ],
                        },
                      ],
                    },
                    then: 0,
                    else: 1,
                  },
                },
              },
              in: {
                o: {
                  $cond: {
                    if: {
                      $gt: [{ $size: "$$value.o" }, 1],
                    },
                    then: {
                      $filter: {
                        input: "$$value.o",
                        as: "line",
                        cond: {
                          $eq: [
                            {
                              $arrayElemAt: [
                                "$$line",
                                "$$this",
                              ],
                            },
                            "$$oN",
                          ],
                        },
                      },
                    },
                    else: "$$value.o",
                  },
                },
                c: {
                  $cond: {
                    if: {
                      $gt: [{ $size: "$$value.c" }, 1],
                    },
                    then: {
                      $filter: {
                        input: "$$value.c",
                        as: "line",
                        cond: {
                          $eq: [
                            {
                              $arrayElemAt: [
                                "$$line",
                                "$$this",
                              ],
                            },
                            "$$cN",
                          ],
                        },
                      },
                    },
                    else: "$$value.c",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      res: {
        $map: {
          input: [
            { $first: "$res.o" },
            { $first: "$res.c" },
          ],
          as: "x",
          in: {
            $reduce: {
              input: {
                $range: [0, { $size: "$$x" }],
              },
              initialValue: 0,
              in: {
                $add: [
                  "$$value",
                  {
                    $multiply: [
                      { $arrayElemAt: ["$$x", "$$this"] },
                      {
                        $pow: [
                          2,
                          {
                            $subtract: [
                              {
                                $size: "$$x",
                              },
                              {
                                $add: ["$$this", 1],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  {
    $project: {
      res: {
        $multiply: [
          { $arrayElemAt: ["$res", 0] },
          { $arrayElemAt: ["$res", 1] },
        ],
      },
    },
  },
]