import { pipe } from 'smar-util';
import data from './data.json';
import { Rarity, RarityLevel } from './types';

const topLevel = RarityLevel.immortal;

const createRarity = (rarityLevel = RarityLevel.normal): Rarity =>
  Object.freeze(pickRarityData(rarityLevel) as Rarity);

const createNextLevelRarity = (rarityLevel: RarityLevel) => {
  const nextRarityLevel = pickNextRarityLevel(rarityLevel);
  return createRarity(nextRarityLevel);
};

const pickRarityData = (rarityLevel: RarityLevel) => data[rarityLevel];

const pickNextRarityLevel = (rarityLevel: RarityLevel): RarityLevel => {
  if (isTopLevel(rarityLevel)) {
    throw new Error('Rarity already has been top level');
  }

  const findCurrentLevelIndex = (levelList) =>
    levelList.findIndex((level) => level === rarityLevel);

  const findNextLevelIndex = (currentLevelIndex) => currentLevelIndex + 1;

  const getNextRarityLevelIndexPipe = pipe(
    findCurrentLevelIndex,
    findNextLevelIndex
  );
  const rarityLevelList = getRarityLevelList();
  return rarityLevelList[getNextRarityLevelIndexPipe(rarityLevelList)];
};

const isTopLevel = (rarityLevel: RarityLevel) => {
  return rarityLevel === topLevel;
};

const getRarityLevelList = () => Object.keys(data) as Array<RarityLevel>;

export { createRarity, createNextLevelRarity };
