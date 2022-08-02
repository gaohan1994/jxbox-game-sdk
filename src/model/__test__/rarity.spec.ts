import test from 'ava';
import { createNextLevelRarity, createRarity, RarityLevel } from '../index';

test('test crate rarity without params', (it) => {
  const normalRarity = createRarity();
  it.is(normalRarity.level, RarityLevel.normal);
  it.is(normalRarity.description, '');
  it.is(normalRarity.label, '普通');
  it.is(normalRarity.value, 0);
});

test.beforeEach('创建普通稀有度', (it) => {
  const normalRarity = createRarity(RarityLevel.normal);
  (it.context as any).normalRarity = normalRarity;

  const imortalRarity = createRarity(RarityLevel.immortal);
  (it.context as any).imortalRarity = imortalRarity;
});

test('test create normal rarity', (it) => {
  const { normalRarity } = it.context as any;

  it.is(normalRarity.level, RarityLevel.normal);
  it.is(normalRarity.description, '');
  it.is(normalRarity.label, '普通');
  it.is(normalRarity.value, 0);
});

test('test create normal next level rarity', (it) => {
  const { normalRarity } = it.context as any;
  const nextLevelRarity = createNextLevelRarity(normalRarity.level);

  it.is(nextLevelRarity.level, RarityLevel.special);
  it.is(nextLevelRarity.description, '');
  it.is(nextLevelRarity.label, '特殊');
  it.is(nextLevelRarity.value, 1);
});

test('test already is top level rarity and create next level rarity should throw an error', (it) => {
  const { imortalRarity } = it.context as any;

  it.throws(() => createNextLevelRarity(imortalRarity.level), {
    message: 'Rarity already has been top level',
  });
});
