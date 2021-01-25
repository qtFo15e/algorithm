//并查集
//并查集是一种树型的数据结构，用于处理一些不相交集合（disjoint sets）的合并及查询问题。常常在使用中以森林来表示。
export class UF {
    //保存父节点id， 集合表现为一颗N叉树
    pid: number[] = [];
    //集合大小
    sz: number[] = [];
    //n:当前的集合数量，初始各元素以自身为集合
    constructor(public n: number = 0) {
        for (let i = 0; i < n; i++) {
            this.pid[i] = i;
        }
        for (let i = 0; i < n; i++) {
            this.sz[i] = 0;
        }
    }
    //判断是否相连
    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }
    //查询所属集合
    find(p: number): number {
        while (p !== this.pid[p]) {
            p = this.pid[p];
        }
        return p;
    }
    //合并所属集合
    union(p: number, q: number): void {
        let i = this.find(p);
        let j = this.find(q);
        if (i === j) return;

        let small: number, big: number;
        if (this.sz[i] < this.sz[j]) {
            small = i;
            big = j;
        } else {
            small = j;
            big = i;
        }
        this.pid[small] = big;
        this.sz[big] += this.sz[small];

        this.n--;
    }
}

/**
 * ConnectedComponent连通分量问题和union-find并查集的区别：
 * 1. 两者解决的问题是相同的，判断任意两个节点是否连通
 * 2. ConnectedComponent初始化速度慢，查询速度快(常数级别)适合图结构固定的问题
 *    union-find合并和查询速度都接近常数级别，适合动态的图
 */
