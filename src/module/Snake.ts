/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 庄鸿凯
 * @Date: 2022-04-27 00:27:36
 * @LastEditors: 庄鸿凯
 * @LastEditTime: 2022-04-30 02:13:10
 */
class Snake {
    // 表示蛇头的元素
    head: HTMLElement
    // 蛇身 包括蛇头
    // HTMLCollection会实时刷新
    bodies: HTMLCollection
    // 获取蛇的容器
    Snake: HTMLElement
    constructor() {
        this.Snake = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div')!
        this.bodies = this.Snake.getElementsByTagName('div')

    }
    // 获取蛇坐标(蛇头)
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    set X(value: number) {

        // 如果新值和旧值相同，则直接返回不再修改
        if (this.X === value) {
            return;
        }

        // bug  因为先判断了撞墙  然后判断反方向  反方向又会 加一格  所以会出墙一格
        // 解决方法  判断撞墙放在判断反方向后


        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        // 如果有第二节身体  且第二节身体与蛇头新x坐标一样  就是掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
            // 掉头了  蛇应该往反方向继续移动
            if (value > this.X) {
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.X - 10;
            } else {
                // 向左走
                value = this.X + 10;
            }
        }
        // X的值的合法范围0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了！');
        }

        // 移动身体
        this.moveBody();
        this.head.style.left = value + 'px'
        // 检查有没有撞到自己
        this.checkHeadBody();
    }
    set Y(value: number) {

        // 如果新值和旧值相同，则直接返回不再修改
        if (this.Y === value) {
            return;
        }

        // bug  因为先判断了撞墙  然后判断反方向  反方向又会 加一格  所以会出墙一格
        // 解决方法  判断撞墙放在判断反方向后


        // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        // Y的值的合法范围0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了，抛出一个异常
            throw new Error('蛇撞墙了！');
        }

        // 移动身体
        this.moveBody();
        this.head.style.top = value + 'px'
        // 检查有没有撞到自己
        this.checkHeadBody();
    }
    // 吃食物加身体方法
    addBody() {
        // 向snake里加div
        // beforeend  结束标签之前
        let div = document.createElement('div')
        this.Snake.appendChild(div)
    }
    // 添加一个移动蛇身方法
    moveBody() {
        // 后边身体到前边身体之前位置  从后往前改  因为先改前面位置 后面位置就找不到前面原本位置了
        // 遍历所有身体  从后往前遍历
        // i=0是蛇头  蛇头在set x y里改了
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体位置
            // bodies里类型是Element  类型断言给他为HTMLElement
            let a = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let b = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将值赋给新身体
            (this.bodies[i] as HTMLElement).style.left = a + 'px';
            (this.bodies[i] as HTMLElement).style.top = b + 'px';

        }
    }
    // 检查蛇头是否撞到身体的方法
    checkHeadBody() {
        // 遍历蛇身
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了！');
            }
        }
    }
    // 删除身体
    removeBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.bodies[i].remove()
        }
    }
}

export default Snake