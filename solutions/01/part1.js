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
    $project: {
      depths: {
        $filter: {
          input: "$depths",
          as: "this",
          cond: {
            $cond: {
              if: {
                $eq: ["$$this.i", 0],
              },
              then: false,
              else: {
                $gt: [
                  "$$this.depth",
                  {
                    $arrayElemAt: [
                      "$depths.depth",
                      {
                        $subtract: ["$$this.i", 1],
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
        $size: "$depths",
      },
    },
  },
]