import { validaccount, validURL, validLowerCase, validUpperCase, validAlphabets } from '@/utils/validate.js'
describe('Utils:validate', () => {
  it('validaccount', () => {
    expect(validaccount('admin')).toBe(true)
    expect(validaccount('editor')).toBe(true)
    expect(validaccount('xxxx')).toBe(false)
  })
  it('validURL', () => {
    expect(validURL('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validURL('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validURL('github.com/PanJiaChen/vue-element-admin')).toBe(false)
  })
  it('validLowerCase', () => {
    expect(validLowerCase('abc')).toBe(true)
    expect(validLowerCase('Abc')).toBe(false)
    expect(validLowerCase('123abc')).toBe(false)
  })
  it('validUpperCase', () => {
    expect(validUpperCase('ABC')).toBe(true)
    expect(validUpperCase('Abc')).toBe(false)
    expect(validUpperCase('123ABC')).toBe(false)
  })
  it('validAlphabets', () => {
    expect(validAlphabets('ABC')).toBe(true)
    expect(validAlphabets('Abc')).toBe(true)
    expect(validAlphabets('123aBC')).toBe(false)
  })
})
