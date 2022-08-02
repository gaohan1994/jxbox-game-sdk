enum RarityLevel {
  normal = 'normal',
  special = 'special',
  rare = 'rare',
  epic = 'epic',
  legendary = 'legendary',
  immortal = 'immortal',
}
interface Rarity {
  level: RarityLevel;
  value: number;
  label: string;
  description: string;
}

export { Rarity, RarityLevel };
