import data from './data.json';
import { Faction } from './model';

const factionDataSources = data.data;

const factionValidIds = factionDataSources.map((data) => data.id);

const getAllFactions = (): Array<Faction> =>
  factionDataSources.map((data) => new Faction(data));

const getFactionById = (id: number): Faction => {
  if (!isValidFactionId(id)) {
    throw new Error('Unvalid faction id');
  }
  const allFactions = getAllFactions();
  return allFactions.find((faction) => faction.id === id);
};

const isValidFactionId = (id: number) =>
  factionValidIds.some((validId) => validId === id);

export { getAllFactions, getFactionById };
