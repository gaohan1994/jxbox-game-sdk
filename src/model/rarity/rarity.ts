import data from './data.json';
import { Rarity, RarityLevel } from './types';

const topLevel = RarityLevel.immortal;

const pickRarityData = (rarityLevel: RarityLevel) => data[rarityLevel];

const createRarity = (rarityLevel: RarityLevel): Rarity => {
  return Object.freeze({ ...(pickRarityData(rarityLevel) as Rarity) });
};

const createNextLevelRarity = (rarityLevel: RarityLevel) => {
  const nextRarityLevel = pickNextRarityLevel(rarityLevel);
  return createRarity(nextRarityLevel);
};

const pickNextRarityLevel = (rarityLevel: RarityLevel): RarityLevel => {
  if (isTopLevel(rarityLevel)) {
    return topLevel;
  }
};

const isTopLevel = (rarityLevel: RarityLevel) => {
  return rarityLevel === topLevel;
};

export { createRarity };
