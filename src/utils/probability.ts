import { pipe, randomInt } from 'smar-util';
import {
  IProbabilityExecuterPayload,
  IProbabilityExecuterResultPayload,
} from './types';

const RANDOM_MINIMUM_VALUE = 0;
const RANDOM_MAXIMUM_VALUE = 100;

const generateProbabilityResult = (params: IProbabilityExecuterPayload) => ({
  ...params,
  success:
    randomInt(RANDOM_MINIMUM_VALUE, RANDOM_MAXIMUM_VALUE) <= params.probability,
});

const runProbabilityExecuter = (params: IProbabilityExecuterResultPayload) => {
  if (params.success) {
    return params.successExecuter?.();
  }
  return params.failExecuter?.();
};

export const probabilityExecuter = (params: IProbabilityExecuterPayload) =>
  pipe(generateProbabilityResult, runProbabilityExecuter)(params);

export const arrayRandomPick = <T>(array: Array<T>): T => {
  if (!Array.isArray(array)) {
    throw new Error('Only can random pick array');
  }
  return array[randomInt(0, array.length)];
};
