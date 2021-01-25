//二维矩阵
type Matrix = boolean[][];
//二维矩阵坐标
type V2 = {
    x: number;
    y: number;
};

/**
 * FloodFill：泛洪算法，二维矩阵中寻找与起始点连通的点。例如，PS中的油漆桶涂色，魔法棒选取区域
 */
/**
 * matrix: 二维矩阵
 * visited: 访问记录矩阵
 * direction: 遍历方向
 */
export class FloodFill {
    private visited: Matrix;
    constructor(private matrix: Matrix, private direction: 4 | 8) {
        this.visited = this.initVisited();
    }

    //point:DFS的起始点
    //结合业务逻辑和二维矩阵特点的DFS
    flood(point: V2): void {
        if (!this.isInMatrix(this.matrix, point)) return;

        //do something
        if (!this.filter(point)) {
            return;
        }

        if (this.visited[point.y][point.x] === true) return;
        this.visited[point.y][point.x] = true;

        const filledPoints =
            this.direction === 4 ? this.fill4(point) : this.fill8(point);
        for (let filledpoint of filledPoints) {
            this.flood(filledpoint);
        }
    }

    getVisited(): Matrix {
        return this.visited;
    }

    //根据业务逻辑判断是否中断DFS
    private filter(_point: V2): boolean {
        return true;
    }

    // 四邻域：上，下，右，左
    private fill4({ x, y }: V2): V2[] {
        return [
            { x, y: y + 1 },
            { x, y: y - 1 },
            { x: x - 1, y },
            { x: x - 1, y },
        ];
    }
    // 八邻域：y轴正方向开始，逆时针序
    private fill8({ x, y }) {
        return [
            { x, y: y + 1 },
            { x: x + 1, y: y + 1 },
            { x: x + 1, y },
            { x: x + 1, y: y - 1 },
            { x: x, y: y - 1 },
            { x: x - 1, y: y - 1 },
            { x: x - 1, y },
            { x: x - 1, y: y + 1 },
        ];
    }

    private isInMatrix(matrix: Matrix, point: V2): boolean {
        return (
            point.x >= 0 &&
            point.y >= 0 &&
            point.x < matrix[0].length &&
            point.y < matrix.length
        );
    }

    private initVisited(): Matrix {
        let result: Matrix = new Array(this.matrix.length);
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                result[i][j] = false;
            }
        }
        return result;
    }
}
