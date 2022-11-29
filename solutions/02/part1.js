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
      x: {
        $sum: {
          $cond: {
            if: {
              $eq: ["$line.dir", "forward"],
            },
            then: "$line.dis",
            else: 0,
          },
        },
      },
      y: {
        $sum: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$line.dir", "down"] },
                then: "$line.dis",
              },
              {
                case: { $eq: ["$line.dir", "up"] },
                then: { $multiply: ["$line.dis", -1] },
              },
            ],
            default: 0,
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      res: {
        $multiply: ["$x", "$y"],
      },
    },
  },
]