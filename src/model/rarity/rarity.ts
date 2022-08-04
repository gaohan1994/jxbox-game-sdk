import { pipe } from 'smar-util';
import {
  checkShouldCreateNextLevelRarityById,
  ICreateNextLevelRarity,
  Rarity,
  RarityLevel,
} from './types';
import data from './data.json';

const rarityList = data.list;
const rarityLevels = data.levels;
const topLevel = RarityLevel.immortal;

const getRarity = (rarityId: number): Rarity =>
  Object.freeze(findRarityById(rarityId) as Rarity);

const findRarityById = (rarityId: number) =>
  rarityList.find((rarity) => rarity.id === rarityId);

const getRarityByLevel = (rarityLevel: RarityLevel) =>
  Object.freeze(findRarityByLevel(rarityLevel) as Rarity);

const findRarityByLevel = (rarityLevel: RarityLevel) =>
  rarityList.find((rarity) => rarity.level === rarityLevel);

const getNextLevelRarity: ICreateNextLevelRarity = (params) => {
  let currentLevel: RarityLevel;
  if (checkShouldCreateNextLevelRarityById(params)) {
    currentLevel = getRarity(params).level;
  } else {
    currentLevel = params;
  }
  if (isTopLevel(currentLevel)) {
    throw new Error('Rarity already has been top level');
  }
  const nextRarityLevel = pickNextRarityLevel(currentLevel);
  return getRarityByLevel(nextRarityLevel);
};

const isTopLevel = (rarityLevel: RarityLevel) => rarityLevel === topLevel;

const pickNextRarityLevel = (rarityLevel: RarityLevel): RarityLevel => {
  const findCurrentLevelIndex = () =>
    rarityLevels.findIndex((level) => level === rarityLevel);

  const findNextLevelIndex = (currentLevelIndex) => currentLevelIndex + 1;

  const pickNextLevel = (nextLevelIndex) => rarityLevels[nextLevelIndex];

  const getNextRarityLevelPipe = pipe(
    findCurrentLevelIndex,
    findNextLevelIndex,
    pickNextLevel
  );
  return getNextRarityLevelPipe({}) as RarityLevel;
};

export { getRarity, getRarityByLevel, getNextLevelRarity };
