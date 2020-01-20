const { Add } = require('../../src/add')

describe('aMap test', () => {
  it('add fun test 1 + 2 = 3', () => {
    const sum = new Add(1, 2)
    expect(sum.getSum()).toEqual(3)
  })

  it('add fun test ”1“ + 2 = 0  err', () => {
    const sum = new Add('1', 2)
    expect(sum.getSum()).toBe(0)
  })

  it('add fun test 1 + "2" = 0  err', () => {
    const sum = new Add(1, "2")
    expect(sum.getSum()).toBe(0)
  })

  it('add fun test 1 + 空 = 1 ', () => {
    const sum = new Add(1)
    expect(sum.getSum()).toBe(1)
  })

})