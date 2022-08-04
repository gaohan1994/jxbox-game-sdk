enum RarityLevel {
  normal = 'normal',
  special = 'special',
  rare = 'rare',
  epic = 'epic',
  legendary = 'legendary',
  immortal = 'immortal',
}
interface Rarity {
  id: number;
  level: RarityLevel;
  label: string;
  description: string;
}

type ICreateNextLevelRarityPayload = RarityLevel | number;

interface ICreateNextLevelRarity {
  (params: ICreateNextLevelRarityPayload): Rarity;
}

const checkShouldCreateNextLevelRarityById = (
  params: ICreateNextLevelRarityPayload
): params is number => typeof params === 'number';

export {
  Rarity,
  RarityLevel,
  ICreateNextLevelRarity,
  checkShouldCreateNextLevelRarityById,
};
