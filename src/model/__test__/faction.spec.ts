import test from 'ava';
import { getAllFactions, getFactionById } from '../faction';
import { Faction } from '../faction/model';
import data from '../faction/data.json';

test.beforeEach('create all factions before test faction cases', (it) => {
  const allFactions = getAllFactions();
  (it.context as any).allFactions = allFactions;
});

test('test all factions length should equal to data.json', (it) => {
  const { allFactions } = it.context as any;
  it.is(allFactions.length, data.data.length);
});

test('faction should instanceof Faction class ', (it) => {
  const { allFactions } = it.context as any;
  for (let i = 0; i < allFactions.length; i++) {
    const currentFaction = allFactions[i];
    it.is(currentFaction instanceof Faction, true);

    const currentFactionData = data.data[i];
    it.is(currentFaction.id, currentFactionData.id);
    it.is(currentFaction.name, currentFactionData.name);
    it.is(currentFaction.description, currentFactionData.description);
  }
});

test('faction should same data as data.json ', (it) => {
  const { allFactions } = it.context as any;
  for (let i = 0; i < allFactions.length; i++) {
    const currentFaction = allFactions[i];

    const currentFactionData = data.data[i];
    it.is(currentFaction.id, currentFactionData.id);
    it.is(currentFaction.name, currentFactionData.name);
    it.is(currentFaction.description, currentFactionData.description);
  }
});

test('should throw error when find faction with wrong id', (it) => {
  it.throws(() => getFactionById(99), {
    message: 'Unvalid faction id',
  });
});

test('should find faction by Id', (it) => {
  const faction = getFactionById(1);
  it.is(faction instanceof Faction, true);
});
