[
  {
    $group: {
      _id: null,
      depths: {
        $push: { $toInt: "$line" },
      },
    },
  },
  {
    $project: {
      _id: 0,
      depths: {
        $filter: {
          input: { $range: [1, { $size: "$depths" }] },
          as: "i",
          cond: {
            $gt: [
              { $arrayElemAt: ["$depths", "$$i"] },
              {
                $arrayElemAt: [
                  "$depths",
                  { $subtract: ["$$i", 1] },
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
      res: {
        $size: "$depths",
      },
    },
  },
]