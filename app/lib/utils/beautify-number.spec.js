import {beautifyNumber} from './';

describe('app/utils/index/beautify-number', () => {
  describe('should format number with comma', () => {
    it('100 —> 100', () => {
      expect(beautifyNumber(100)).toBe('100');
    });
    it('1000 —> 1,000', () => {
      expect(beautifyNumber(1000)).toBe('1,000');
    });
    it('10000 —> 10,000', () => {
      expect(beautifyNumber(10000)).toBe('10,000');
    });
    it('100000 —> 100,000', () => {
      expect(beautifyNumber(100000)).toBe('100,000');
    });
    it('1000000 —> 1,000,000', () => {
      expect(beautifyNumber(1000000)).toBe('1,000,000');
    });
    it('-100 —> -100', () => {
      expect(beautifyNumber(-100)).toBe('-100');
    });
    it('-1000 —> -1,000', () => {
      expect(beautifyNumber(-1000)).toBe('-1,000');
    });
    it('-10000 —> -10,000', () => {
      expect(beautifyNumber(-10000)).toBe('-10,000');
    });
    it('-100000 —> -100,000', () => {
      expect(beautifyNumber(-100000)).toBe('-100,000');
    });
    it('-1000000 —> -1,000,000', () => {
      expect(beautifyNumber(-1000000)).toBe('-1,000,000');
    });
  });

  describe('should format number with spaces', () => {
    it('100 —> 100', () => {
      expect(beautifyNumber(100, ' ')).toBe('100');
    });
    it('1000 —> 1 000', () => {
      expect(beautifyNumber(1000, ' ')).toBe('1 000');
    });
    it('10000 —> 10 000', () => {
      expect(beautifyNumber(10000, ' ')).toBe('10 000');
    });
    it('100000 —> 100 000', () => {
      expect(beautifyNumber(100000, ' ')).toBe('100 000');
    });
    it('1000000 —> 1 000 000', () => {
      expect(beautifyNumber(1000000, ' ')).toBe('1 000 000');
    });
    it('-100 —> -100', () => {
      expect(beautifyNumber(-100, ' ')).toBe('-100');
    });
    it('-1000 —> -1 000', () => {
      expect(beautifyNumber(-1000, ' ')).toBe('-1 000');
    });
    it('-10000 —> -10 000', () => {
      expect(beautifyNumber(-10000, ' ')).toBe('-10 000');
    });
    it('-100000 —> -100 000', () => {
      expect(beautifyNumber(-100000, ' ')).toBe('-100 000');
    });
    it('-1000000 —> -1 000 000', () => {
      expect(beautifyNumber(-1000000, ' ')).toBe('-1 000 000');
    });
  });
});
