import { cn, splitHighlightedText } from './utils';

describe('cn', () => {
  test('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  test('ignores falsy values', () => {
    expect(cn('a', null, undefined, false, 0, '')).toBe('a');
  });
});

describe('splitHighlightedText', () => {
  const keywords = ['VAD', 'AI', 'cross-embodiment', 'React Native', 'React', 'Next.js', 'robot'];

  const highlighted = (text) =>
    splitHighlightedText(text, keywords)
      .filter((segment) => segment.highlighted)
      .map((segment) => segment.text);

  test('does not treat VAD as a substring of validation', () => {
    expect(highlighted('high-speed interconnect validation')).toEqual([]);
  });

  test('does not treat AI as a substring of training', () => {
    expect(highlighted('distributed training')).toEqual([]);
  });

  test('highlights hyphenated phrases as a single match', () => {
    expect(highlighted("Neural Motion's cross-embodiment data platform")).toEqual([
      'cross-embodiment',
    ]);
  });

  test('highlights standalone VAD and longer phrases before shorter ones', () => {
    expect(highlighted('VAD with React Native and React')).toEqual([
      'VAD',
      'React Native',
      'React',
    ]);
  });

  test('highlights dotted terms and hyphen-bounded words', () => {
    expect(highlighted('Next.js robot-policy training')).toEqual(['Next.js', 'robot']);
  });
});
