import test from 'ava';
import { arrayRandomPick, probabilityExecuter } from '../index';

test('test probabilityExecuter function', (it) => {
  let result = '';

  probabilityExecuter({
    probability: 100,
    successExecuter: () => {
      result = 'successExecuter';
    },
    failExecuter: () => {
      result = 'failExecuter';
    },
  });
  it.is(result, 'successExecuter');
});

test('test probabilityExecuter with return function successExecuter', (it) => {
  const result = probabilityExecuter({
    probability: 100,
    successExecuter: () => {
      return 100;
    },
    failExecuter: () => {
      return 0;
    },
  });
  it.is(result, 100);
});

test('test probabilityExecuter with return function failExecuter ', (it) => {
  const result = probabilityExecuter({
    probability: 0,
    successExecuter: () => {
      return 100;
    },
    failExecuter: () => {
      return 0;
    },
  });
  it.is(result, 0);
});

test('arrayRandomPick should only pick from an array', (it) => {
  it.throws(() => arrayRandomPick({} as any), {
    message: 'Only can random pick array',
  });
});

test('arrayRandomPick only one element should return the one', (it) => {
  const data = [10086];
  it.is(arrayRandomPick(data), 10086);
});
