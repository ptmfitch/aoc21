(heightmap, low_points) => {
    lps = low_points.reduce((acc, val) => acc.concat(val), [])
    basins = []
    for (let i = 0; i < lps.length; i++) {
        let basin = []
        let neighbours = [lps[i]]
        while (neighbours.length > 0) {
            let point = neighbours.pop()
            if (basin.includes(point)) {
                continue
            }
            basin.push(point)
            for (let x = point.row - 1; x <= point.row + 1; x++) {
                for (let y = point.col - 1; y <= point.col + 1; y ++) {
                    if (0 <= x && x < heightmap.length && 0 <= y && y < heightmap[x].length) {
                        if (x == point.row ? !(y == point.col) : y == point.col) {
                            new_neighbour = heightmap[x][y]
                            if (!basin.includes(new_neighbour) && new_neighbour.hgt < 9) {
                                neighbours.push(new_neighbour)
                            }
                        }
                    }
                }
            }
        }
        basins.push(basin.length - 1)
    }
    return basins
}