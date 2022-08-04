import { Faction } from './model';
import data from './data.json';

const factionList = data.list;
const factionValidIds = factionList.map((data) => data.id);

const getAllFactions = (): Array<Faction> =>
  factionList.map((factionData) => getFaction(factionData.id));

const getFaction = (factionId: number): Faction =>
  Object.freeze(findFactionById(factionId));

const findFactionById = (factionId: number) => {
  if (!isValidFactionId(factionId)) {
    throw new Error('Unvalid faction id');
  }
  return factionList.find((faction) => faction.id === factionId);
};

const isValidFactionId = (id: number) =>
  factionValidIds.some((validId) => validId === id);

export { getAllFactions, getFaction };
