import { cn } from './utils';

describe('cn', () => {
  test('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  test('ignores falsy values', () => {
    expect(cn('a', null, undefined, false, 0, '')).toBe('a');
  });
});
