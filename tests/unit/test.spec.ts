import TestMachine from '@/components/TestMachine.vue'

// TODO: make more sense of this...
describe('TestMachine.vue', () => {
  it('should store the search text', () => {
    beforeEach(() =>  {
      jest.resetModules();
    });
    const searchItem = 'london'
    TestMachine.searchItem = searchItem
    expect(TestMachine.searchItem).toMatch(searchItem)
  })
  it('should set and read the weatherdata', () => {
    beforeEach(() =>  {
      jest.resetModules();
    });
    TestMachine.storeHandler = require('@/assets/weather.json')
    expect(TestMachine.storeHandler).toHaveLength
  })
})
