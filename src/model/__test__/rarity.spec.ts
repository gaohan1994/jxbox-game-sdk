import test from 'ava';

import {
  createRarity,
  RarityLabels,
  RarityLevel,
  RarityValues,
} from '../index';

test('测试创建普通稀有度', (t) => {
  const normalRarity = createRarity(RarityLevel.normal);
  t.is(normalRarity.description, '');
  t.is(normalRarity.label, RarityLabels.normal);
  t.is(normalRarity.level, RarityLevel.normal);
  t.is(normalRarity.value, RarityValues.normal);
});
