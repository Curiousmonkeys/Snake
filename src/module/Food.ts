/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Curiousmonkeys
 * @Date: 2022-04-27 00:22:24
 * @LastEditors: Curiousmonkeys
 * @LastEditTime: 2022-04-30 02:24:56
 */
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement
    constructor() {
        // 让属性根据id直接去获取到对象
        // !代表元素没问题 不可能为空
        this.element = document.getElementById('food')!
    }
    // 获取食物X坐标
    get X() {
        // 直接返回X坐标
        return this.element.offsetLeft
    }
    // 获取食物Y坐标
    get Y() {
        // 直接返回Y坐标
        return this.element.offsetTop
    }
    // 修改食物坐标
    change() {
        // 生成一个随机位置
        // x y 最小是0  最大是 300-10 =290 
        // 蛇移动一次一格  一格就是10 所以食物一定是整10
        // 先获取0-29  然后都乘10 得到整十
        let left = Math.round(Math.random() * 29) * 10
        let top = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

// 暴露类
export default Food