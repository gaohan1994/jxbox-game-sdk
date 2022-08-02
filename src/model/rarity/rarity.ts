import data from './data.json';
import { Rarity, RarityLevel } from './types';

const topLevel = RarityLevel.immortal;

const createRarity = (rarityLevel = RarityLevel.normal): Rarity =>
  Object.freeze(pickRarityData(rarityLevel) as Rarity);

const pickRarityData = (rarityLevel: RarityLevel) => data[rarityLevel];

const createNextLevelRarity = (rarityLevel: RarityLevel) => {
  const nextRarityLevel = pickNextRarityLevel(rarityLevel);
  return createRarity(nextRarityLevel);
};

const pickNextRarityLevel = (rarityLevel: RarityLevel): RarityLevel => {
  if (isTopLevel(rarityLevel)) {
    throw new Error('Rarity already has been top level');
  }

  const rarityLevels = getRarityLevelList();
  const currentLevelIndex = rarityLevels.findIndex(
    (level) => level === rarityLevel
  );
  return rarityLevels[currentLevelIndex + 1];
};

const isTopLevel = (rarityLevel: RarityLevel) => {
  return rarityLevel === topLevel;
};

const getRarityLevelList = () => Object.keys(data) as Array<RarityLevel>;

export { createRarity, createNextLevelRarity };
