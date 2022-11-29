[
  {
    $group: {
      _id: null,
      lines: {
        $push: {
          $map: {
            input: { $range: [0, { $strLenCP: "$line" }] },
            in: {
              $toInt: { $substr: ["$line", "$$this", 1] },
            },
          },
        },
      },
      c: {
        $sum: 0.5,
      },
    },
  },
  {
    $project: {
      _id: 0,
      bits: {
        $map: {
          input: {
            $range: [0, { $size: { $first: "$lines" } }],
          },
          as: "bit",
          in: {
            $cond: {
              if: {
                $gt: [
                  {
                    $sum: {
                      $map: {
                        input: "$lines",
                        as: "line",
                        in: {
                          $arrayElemAt: ["$$line", "$$bit"],
                        },
                      },
                    },
                  },
                  "$c",
                ],
              },
              then: [1, 0],
              else: [0, 1],
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
          input: { $range: [0, { $size: "$bits" }] },
          initialValue: {
            g: 0,
            e: 0,
          },
          in: {
            g: {
              $add: [
                "$$value.g",
                {
                  $multiply: [
                    {
                      $arrayElemAt: [
                        {
                          $arrayElemAt: ["$bits", "$$this"],
                        },
                        0,
                      ],
                    },
                    {
                      $pow: [
                        2,
                        {
                          $subtract: [
                            { $size: "$bits" },
                            { $add: ["$$this", 1] },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            e: {
              $add: [
                "$$value.e",
                {
                  $multiply: [
                    {
                      $arrayElemAt: [
                        {
                          $arrayElemAt: ["$bits", "$$this"],
                        },
                        1,
                      ],
                    },
                    {
                      $pow: [
                        2,
                        {
                          $subtract: [
                            { $size: "$bits" },
                            { $add: ["$$this", 1] },
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
  {
    $project: {
      res: {
        $multiply: ["$res.g", "$res.e"],
      },
    },
  },
]