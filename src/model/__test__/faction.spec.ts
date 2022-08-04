import test from 'ava';
import { getAllFactions, getFaction } from '../faction';
import data from '../faction/data.json';

test.beforeEach('create all factions before test faction cases', (it) => {
  const allFactions = getAllFactions();
  (it.context as any).allFactions = allFactions;
});

test('test all factions length should equal to data.json', (it) => {
  const { allFactions } = it.context as any;
  it.is(allFactions.length, data.list.length);
});

test('faction should with correct faction data ', (it) => {
  const { allFactions } = it.context as any;
  for (let i = 0; i < allFactions.length; i++) {
    const currentFaction = allFactions[i];

    const currentFactionData = data.list[i];
    it.is(currentFaction.id, currentFactionData.id);
    it.is(currentFaction.name, currentFactionData.name);
    it.is(currentFaction.description, currentFactionData.description);
  }
});

test('should throw error when find faction with wrong id', (it) => {
  it.throws(() => getFaction(99), {
    message: 'Unvalid faction id',
  });
});

test('should find faction by Id', (it) => {
  const faction = getFaction(1);
  it.is(faction.id, 1);
  it.is(faction.name, '江湖');
  it.is(faction.description, '');
});
