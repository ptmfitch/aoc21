[
  {
    $group: {
      _id: null,
      depths: {
        $push: "$line",
      },
    },
  },
  {
    $project: {
      _id: 0,
      depths: {
        $map: {
          input: {
            $range: [
              0,
              {
                $size: "$depths",
              },
            ],
          },
          as: "i",
          in: {
            i: "$$i",
            depth: {
              $toInt: { $arrayElemAt: ["$depths", "$$i"] },
            },
          },
        },
      },
    },
  },
  {
    $set: {
      depths: {
        $map: {
          input: "$depths",
          as: "this",
          in: {
            $cond: {
              if: {
                $lt: ["$$this.i", 2],
              },
              then: {
                i: "$$this.i",
                sum: 0,
              },
              else: {
                i: "$$this.i",
                sum: {
                  $add: [
                    "$$this.depth",
                    {
                      $arrayElemAt: [
                        "$depths.depth",
                        {
                          $subtract: ["$$this.i", 1],
                        },
                      ],
                    },
                    {
                      $arrayElemAt: [
                        "$depths.depth",
                        {
                          $subtract: ["$$this.i", 2],
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
  },
  {
    $set: {
      depths: {
        $filter: {
          input: "$depths",
          as: "this",
          cond: {
            $and: [
              {
                $gte: ["$$this.i", 3],
              },
              {
                $gt: [
                  "$$this.sum",
                  {
                    $arrayElemAt: [
                      "$depths.sum",
                      {
                        $subtract: ["$$this.i", 1],
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
  {
    $project: {
      result: {
        $size: "$depths",
      },
    },
  },
]