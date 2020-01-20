export class Add {
  /**
   * 加数实例
   * @param {number} a 加数一
   * @param {number} b 加数二
   */
  constructor(private a: number, private b: number) {
  }

  /**
   * 获取结果
   * @returns {{number}} 结果
   */
  getSum() {
    const a = this.a
    const b = this.b
    console.log(typeof b)
    let errMsg: Error;
    if (typeof a !== 'number') {
      errMsg = new Error(`a 期望传入的是 number 类型，但是实际传入的是 ${a} 值 ${typeof a} 类型`)
    } else if (typeof b !== 'undefined' && typeof b !== 'number') {
      errMsg = new Error(`b 期望传入的是 number 类型，但是实际传入的是 ${b} 值 ${typeof b} 类型`)
    }
    if (errMsg) {
      console.log(errMsg)
      return 0
    }
    else if (typeof b === 'undefined') {
      return a
    }
    else {
      return a + b
    }
  }
}
