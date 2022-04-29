/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Curiousmonkeys
 * @Date: 2022-04-27 01:00:47
 * @LastEditors: Curiousmonkeys
 * @LastEditTime: 2022-04-30 02:24:53
 */
import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

// 用来控制其他类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake
    // 食物
    food: Food
    // 记分牌
    scorePanel: ScorePanel
    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    // 创建属性记录蛇是否活着
    isLive = true
    newGame: HTMLElement
    fn = this.newGames.bind(this)
    // 定义一个舞台
    stage: HTMLElement
    // 移动端 
    originX: number = 0
    originY: number = 0
    newX: number = 0
    newY: number = 0
    constructor() {
        // 初始化三个属性
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 100)
        this.newGame = document.getElementById('game')!
        this.stage = document.querySelector('#stage')!
        this.init()
    }
    // 重新开始游戏方法
    newGames() {
        this.snake.X = 0
        this.snake.Y = 0
        this.direction = ''
        if (this.snake.X == 0 && this.snake.Y == 0) {
            this.isLive = true
        }
        this.snake.removeBody()
        this.scorePanel.removeScore()
        this.scorePanel.removeLevel()
        this.run()
        this.newGame.removeEventListener('click', this.fn)
    }
    // 游戏初始化方法  调用后游戏开始
    init() {
        // 绑定键盘按下事件
        // 加bind即表示创建了一个新函数  新函数的this是指定的  即GC对象
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.stage.addEventListener('touchstart', this.touchStart.bind(this))
        this.stage.addEventListener('touchend', this.touchEnd.bind(this))
        // 调用run方法
        this.run()
    }
    touchStart(e: any) {
        this.originX = e.changedTouches[0].pageX
        this.originY = e.changedTouches[0].pageY
    }
    touchEnd(e: any) {
        this.newX = e.changedTouches[0].pageX
        this.newY = e.changedTouches[0].pageY
        if (Math.abs(this.newX - this.originX) > Math.abs(this.newY - this.originY)) {
            if (this.newX - this.originX > 0) {
                this.direction = 'ArrowRight'
            }
            else {
                this.direction = 'ArrowLeft'
            }
        } else {
            if (this.newY - this.originY > 0) {
                this.direction = 'ArrowDown'
            }
            else {
                this.direction = 'ArrowUp'
            }
        }


    }
    // 创建一个键盘按下响应函数
    keydownHandler(event: KeyboardEvent) {
        /*
          *   ArrowUp  Up
              ArrowDown Down
              ArrowLeft Left
              ArrowRight Right
          * */
        //  执行时  this不是GameControl了  是 document
        this.direction = event.key
        // 需要检查event.key的值是否合法（用户是否按了正确的按键）

    }
    // 移动方法
    run() {
        // 根据方向修改偏移量
        // 根据方向（this.direction）来使蛇的位置改变
        // *       向上 top 减少
        // *       向下 top 增加
        // *       向左  left 减少
        // *       向右  left 增加
        // 获取蛇现在坐标 
        let X = this.snake.X
        let Y = this.snake.Y

        // 根据按键方向来修改X值和Y值
        switch (this.direction) {
            // 向上 top 减少
            case 'ArrowUp':
                Y -= 10;
                break
            // 向下 top 增加
            case 'ArrowDown':
                Y += 10;
                break
            // 向左 left 减少
            case 'ArrowLeft':
                X -= 10;
                break
            // 向右 left 增加
            case 'ArrowRight':
                X += 10;
                break
        }

        // 判断蛇吃到食物
        this.checkEat(X, Y)

        //修改蛇的X和Y值
        try {
            // 没撞墙就正常
            this.snake.X = X
            this.snake.Y = Y
        } catch (error) {
            // try的时候撞墙了抛出错误被catch接收  即游戏结束
            // 弹出错误信息
            alert((error as Error).message)
            // 将蛇的存活改变
            this.isLive = false
            this.newGame.addEventListener('click', this.fn)
        }




        // 开启一个定时调用
        // 每三百毫秒调用run方法  然后每次调用run方法就会再执行定时器
        // 等级越来越高  时间越来越短  不能改蛇移动距离  不然吃不到食物
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }
    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        // X Y 蛇的新坐标  还未赋给蛇
        if (X === this.food.X && Y === this.food.Y) {

            // 分加一个
            this.scorePanel.addScore()
            // 蛇长一节
            this.snake.addBody()
            // 食物位置修改
            this.food.change(this.snake.bodies)
        }
    }
}

export default GameControl