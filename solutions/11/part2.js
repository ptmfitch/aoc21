[{$group: {
  _id: null,
  rows: {
   $push: {
    $toString: '$row'
   }
  }
 }}, {$project: {
  _id: 0,
  rows: {
   $map: {
    input: '$rows',
    as: 'row',
    'in': {
     $map: {
      input: {
       $range: [
        0,
        {
         $strLenCP: '$$row'
        }
       ]
      },
      as: 'i',
      'in': {
       $toInt: {
        $substr: [
         '$$row',
         '$$i',
         1
        ]
       }
      }
     }
    }
   }
  }
 }}, {$set: {
  steps: {
   $function: {
    body: 'function(rows) {\n        function increaseEnergy(_rows) {\n          for (let i=0; i < _rows.length; i++) {\n            for (let j=0; j < _rows[i].length; j++) {\n              _rows[i][j]++\n            }\n          }\n          return _rows\n        }\n        function stillToFlash(_rows) {\n          for (let i=0; i < _rows.length; i++) {\n            for (let j=0; j < _rows[i].length; j++) {\n              if (_rows[i][j] > 9) {\n                return true\n              }\n            }\n          }\n        }\n        function flash(_rows) {\n          function withinBounds(x, y, mx, my) {\n            return x >= 0 && x < mx && y >= 0 && y < my\n          }\n          for (let i=0; i < _rows.length; i++) {\n            for (let j=0; j < _rows[i].length; j++) {\n              if (_rows[i][j] > 9) {\n                _rows[i][j] = 0\n                for (let k=i-1; k<=i+1; k++) {\n                  for (let l=j-1; l<=j+1; l++) {\n                    if (withinBounds(k, l, _rows.length, _rows[i].length)) {\n                      if (!(k == i && l == j) && _rows[k][l] != 0) {\n                        _rows[k][l]++\n                      } \n                    }\n                  }\n                }\n              }\n            }\n          }\n          return _rows\n        }\n        function countFlashed(_rows) {\n          let _flashed = 0\n          for (let i=0; i < _rows.length; i++) {\n            for (let j=0; j < rows.length; j++) {\n              if (rows[i][j] == 0) {\n                _flashed++\n              }\n            }\n          }\n          return _flashed\n        }\n        let steps = 0\n        while (countFlashed(rows) != rows.length * rows[0].length) {\n          rows = increaseEnergy(rows)\n          while(stillToFlash(rows)) {\n            rows = flash(rows)\n          }\n          steps++\n        }\n        return steps\n      }',
    args: [
     '$rows'
    ],
    lang: 'js'
   }
  }
 }}, {$project: {
  result: '$steps'
 }}]