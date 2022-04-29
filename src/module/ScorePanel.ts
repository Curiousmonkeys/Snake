
// 定义记分牌类
class ScorePanel {
    //   分数与等级   有初始值
    score = 0
    level = 1
    // 分数和等级所在的元素
    scoreEle: HTMLElement
    levelEle: HTMLElement
    // 设置最大的等级属性
    maxLevel: number
    // 设置一个变量存升级需要的分数
    upScore: number
    // 传值就用传的值 不然默认10
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    // 定义一个加分方法
    addScore() {
        this.score++
        this.scoreEle.innerText = this.score + ''
        // 加分了才会升级   分数整十升一级
        if (this.score % this.upScore === 0) {
            this.addLevel()
        }
    }
    // 升级方法
    addLevel() {
        if (this.level < this.maxLevel) {
            this.level++
            this.levelEle.innerText = this.level + ''
        }

    }
    removeScore(){
        this.score = 0
        this.scoreEle.innerText = this.score + ''
    }
    removeLevel(){
        this.level = 1
        this.levelEle.innerText = this.level + ''
    }
    
}

// 暴露类
export default ScorePanel