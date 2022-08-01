enum RarityLevel {
  normal = 'normal',
  special = 'special',
  rare = 'rare',
  epic = 'epic',
  legendary = 'legendary',
  immortal = 'immortal',
}

enum RarityLabels {
  normal = '普通',
  special = '特殊',
  rare = '稀有',
  epic = '史诗',
  legendary = '传说',
  immortal = '不朽',
}

enum RarityValues {
  normal,
  special,
  rare,
  epic,
  legendary,
  immortal,
}

interface Rarity {
  level: RarityLevel;
  label: RarityLabels;
  value: RarityValues;
  description: string;
}

export { Rarity, RarityLevel, RarityLabels, RarityValues };
