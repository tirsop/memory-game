import { it, expect, describe } from 'vitest'
import random from './random'


const input = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const numOfEl = 6


describe('random()', () => {
  it('should return X elements of an array in different order', () => {
    const output = random(input, numOfEl)

    expect(output).not.toEqual(input)
    expect(output.length).toBe(numOfEl)
  })



  it('should NOT return an array with repeating elements', () => {
    const randomArray = random(input, numOfEl)

    const repeatingElements = (arr) => {
      const freq = {}
      for (let i = 0; i < arr.length; i++) {
        if (freq[arr[i]]) return true
        freq[arr[i]] = true
      }
      return false
    }

    const areRepeating = repeatingElements(randomArray)
    expect(areRepeating).toBe(false)
  })
})