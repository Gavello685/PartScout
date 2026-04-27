import test from 'node:test';
import assert from 'node:assert/strict';

import { searchSupplierParts } from './supplier-search-service';

test('groups supplier results by normalized manufacturer part number', async () => {
  const result = await searchSupplierParts('ne555p');

  assert.equal(result.normalizedQuery, 'NE555P');
  assert.equal(result.parts.length, 1);

  const [part] = result.parts;

  assert.equal(part.normalizedManufacturerPartNumber, 'NE555P');
  assert.equal(part.manufacturer, 'Texas Instruments');
  assert.equal(part.offers.length, 3);
  assert.deepEqual(
    part.offers.map((offer) => offer.supplierId).sort(),
    ['digikey', 'mouser', 'nexar'],
  );
});

test('normalizes part numbers with punctuation across suppliers', async () => {
  const result = await searchSupplierParts('ESP32-WROOM-32');

  assert.equal(result.parts.length, 1);
  assert.equal(result.parts[0].normalizedManufacturerPartNumber, 'ESP32WROOM32');
  assert.equal(result.parts[0].offers.length, 3);
});

test('search can be limited to selected enabled adapters', async () => {
  const result = await searchSupplierParts('LM358', { enabledAdapterIds: ['digikey'] });

  assert.equal(result.parts.length, 1);
  assert.equal(result.parts[0].offers.length, 1);
  assert.equal(result.parts[0].offers[0].supplierId, 'digikey');
});
