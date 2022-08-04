import test from 'ava';
import {
  getNextLevelRarity,
  getRarity,
  getRarityByLevel,
  RarityLevel,
} from '../index';

test('test crate rarity by id', (it) => {
  const normalRarity = getRarity(0);
  it.is(normalRarity.id, 0);
  it.is(normalRarity.level, RarityLevel.normal);
  it.is(normalRarity.description, '');
  it.is(normalRarity.label, '普通');
});

test.beforeEach('create rarities before each cases start', (it) => {
  const normalRarity = getRarityByLevel(RarityLevel.normal);
  (it.context as any).normalRarity = normalRarity;

  const imortalRarity = getRarityByLevel(RarityLevel.immortal);
  (it.context as any).imortalRarity = imortalRarity;
});

test('test create normal rarity', (it) => {
  const { normalRarity } = it.context as any;

  it.is(normalRarity.id, 0);
  it.is(normalRarity.level, RarityLevel.normal);
  it.is(normalRarity.description, '');
  it.is(normalRarity.label, '普通');
});

test('test create normal next level rarity by level', (it) => {
  const { normalRarity } = it.context as any;
  const nextLevelRarity = getNextLevelRarity(normalRarity.level);

  it.is(nextLevelRarity.id, 1);
  it.is(nextLevelRarity.level, RarityLevel.special);
  it.is(nextLevelRarity.description, '');
  it.is(nextLevelRarity.label, '特殊');
});

test('test create normal next level rarity by id', (it) => {
  const nextLevelRarity = getNextLevelRarity(1);

  it.is(nextLevelRarity.id, 2);
  it.is(nextLevelRarity.level, RarityLevel.rare);
  it.is(nextLevelRarity.description, '');
  it.is(nextLevelRarity.label, '稀有');
});

test('test already is top level rarity and create next level rarity should throw an error', (it) => {
  const { imortalRarity } = it.context as any;

  it.throws(() => getNextLevelRarity(imortalRarity.level), {
    message: 'Rarity already has been top level',
  });
});
