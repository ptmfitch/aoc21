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
        $map: {
          input: { $range: [2, { $size: "$depths" }] },
          as: "i",
          in: {
            $add: [
              { $arrayElemAt: ["$depths", "$$i"] },
              {
                $arrayElemAt: [
                  "$depths",
                  { $subtract: ["$$i", 1] },
                ],
              },
              {
                $arrayElemAt: [
                  "$depths",
                  { $subtract: ["$$i", 2] },
                ],
              },
            ],
          },
        },
      },
    },
  },
  {
    $set: {
      depths: {
        $filter: {
          input: { $range: [0, { $size: "$depths" }] },
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
      result: {
        $size: "$depths",
      },
    },
  },
]