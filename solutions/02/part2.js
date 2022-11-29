[
  {
    $project: {
      line: {
        $let: {
          vars: {
            split: { $split: ["$line", " "] },
          },
          in: {
            dir: { $arrayElemAt: ["$$split", 0] },
            dis: {
              $toInt: {
                $arrayElemAt: ["$$split", 1],
              },
            },
          },
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      lines: {
        $push: "$line",
      },
    },
  },
  {
    /**
     * specifications: The fields to
     *   include or exclude.
     */
    $project: {
      _id: 0,
      res: {
        $reduce: {
          input: "$lines",
          initialValue: {
            x: 0,
            y: 0,
            a: 0,
          },
          in: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$$this.dir", "down"] },
                  then: {
                    x: "$$value.x",
                    y: "$$value.y",
                    a: {
                      $add: ["$$value.a", "$$this.dis"],
                    },
                  },
                },
                {
                  case: { $eq: ["$$this.dir", "up"] },
                  then: {
                    x: "$$value.x",
                    y: "$$value.y",
                    a: {
                      $subtract: [
                        "$$value.a",
                        "$$this.dis",
                      ],
                    },
                  },
                },
              ],
              default: {
                x: { $add: ["$$value.x", "$$this.dis"] },
                y: {
                  $add: [
                    "$$value.y",
                    {
                      $multiply: [
                        "$$value.a",
                        "$$this.dis",
                      ],
                    },
                  ],
                },
                a: "$$value.a",
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
        $multiply: ["$res.x", "$res.y"],
      },
    },
  },
]