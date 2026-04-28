import type { SupplierPartResult } from './types';

export const DIGIKEY_MOCK_PARTS: SupplierPartResult[] = [
  {
    manufacturerPartNumber: 'NE555P',
    manufacturer: 'Texas Instruments',
    description: 'IC OSC SINGLE TIMER 100KHZ 8-DIP',
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/ne555.pdf',
    offers: [
      {
        supplierId: 'digikey',
        supplierName: 'Digi-Key',
        supplierSku: '296-1411-5-ND',
        stockQuantity: 18234,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 0.58 },
          { minQuantity: 25, unitPrice: 0.41 },
          { minQuantity: 100, unitPrice: 0.32 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'LM358',
    manufacturer: 'Texas Instruments',
    description: 'IC OPAMP GP 2 CIRCUIT 8-DIP',
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm358.pdf',
    offers: [
      {
        supplierId: 'digikey',
        supplierName: 'Digi-Key',
        supplierSku: '296-1395-5-ND',
        stockQuantity: 15492,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 0.44 },
          { minQuantity: 50, unitPrice: 0.29 },
          { minQuantity: 200, unitPrice: 0.22 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'ATMEGA328P',
    manufacturer: 'Microchip Technology',
    description: 'IC MCU 8BIT 32KB FLASH 32-TQFP',
    datasheetUrl: 'https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P-Data-Sheet-DS40002061B.pdf',
    offers: [
      {
        supplierId: 'digikey',
        supplierName: 'Digi-Key',
        supplierSku: 'ATMEGA328P-AU-ND',
        stockQuantity: 6320,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 2.95 },
          { minQuantity: 25, unitPrice: 2.51 },
          { minQuantity: 100, unitPrice: 2.28 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'ESP32-WROOM-32',
    manufacturer: 'Espressif Systems',
    description: 'RF TXRX MODULE WIFI TRACE ANT',
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32_datasheet_en.pdf',
    offers: [
      {
        supplierId: 'digikey',
        supplierName: 'Digi-Key',
        supplierSku: '1904-1025-1-ND',
        stockQuantity: 8930,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 4.2 },
          { minQuantity: 50, unitPrice: 3.87 },
          { minQuantity: 250, unitPrice: 3.49 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
];

export const MOUSER_MOCK_PARTS: SupplierPartResult[] = [
  {
    manufacturerPartNumber: 'NE-555P',
    manufacturer: 'Texas Instruments',
    description: 'Precision Timer, Bipolar, 100 kHz, DIP-8',
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/ne555.pdf',
    offers: [
      {
        supplierId: 'mouser',
        supplierName: 'Mouser',
        supplierSku: '595-NE555P',
        stockQuantity: 12100,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 0.61 },
          { minQuantity: 25, unitPrice: 0.45 },
          { minQuantity: 100, unitPrice: 0.34 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'LM-358',
    manufacturer: 'Texas Instruments',
    description: 'Dual Operational Amplifier, PDIP-8',
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm358.pdf',
    offers: [
      {
        supplierId: 'mouser',
        supplierName: 'Mouser',
        supplierSku: '595-LM358N/NOPB',
        stockQuantity: 13480,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 0.47 },
          { minQuantity: 50, unitPrice: 0.32 },
          { minQuantity: 200, unitPrice: 0.24 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'ATMEGA328P-AU',
    manufacturer: 'Microchip Technology',
    description: '8-bit AVR Microcontroller, TQFP-32',
    datasheetUrl: 'https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P-Data-Sheet-DS40002061B.pdf',
    offers: [
      {
        supplierId: 'mouser',
        supplierName: 'Mouser',
        supplierSku: '556-ATMEGA328P-AU',
        stockQuantity: 4100,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 3.05 },
          { minQuantity: 25, unitPrice: 2.65 },
          { minQuantity: 100, unitPrice: 2.37 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'ESP32 WROOM 32',
    manufacturer: 'Espressif Systems',
    description: 'WiFi+BT Module, PCB Antenna',
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32_datasheet_en.pdf',
    offers: [
      {
        supplierId: 'mouser',
        supplierName: 'Mouser',
        supplierSku: '356-ESP32-WROOM-32',
        stockQuantity: 5710,
        moq: 1,
        priceBreaks: [
          { minQuantity: 1, unitPrice: 4.35 },
          { minQuantity: 50, unitPrice: 3.95 },
          { minQuantity: 250, unitPrice: 3.62 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
];

export const NEXAR_MOCK_PARTS: SupplierPartResult[] = [
  {
    manufacturerPartNumber: 'NE555P ',
    manufacturer: 'Texas Instruments',
    description: 'Single precision timer',
    offers: [
      {
        supplierId: 'nexar',
        supplierName: 'Nexar/Octopart',
        supplierSku: 'OCTO-NE555P',
        stockQuantity: 25600,
        moq: 10,
        priceBreaks: [
          { minQuantity: 10, unitPrice: 0.39 },
          { minQuantity: 100, unitPrice: 0.3 },
          { minQuantity: 500, unitPrice: 0.24 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'LM358',
    manufacturer: 'Texas Instruments',
    description: 'General-purpose dual op amp',
    offers: [
      {
        supplierId: 'nexar',
        supplierName: 'Nexar/Octopart',
        supplierSku: 'OCTO-LM358',
        stockQuantity: 21100,
        moq: 5,
        priceBreaks: [
          { minQuantity: 5, unitPrice: 0.31 },
          { minQuantity: 100, unitPrice: 0.23 },
          { minQuantity: 500, unitPrice: 0.19 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'ATMEGA-328P',
    manufacturer: 'Microchip Technology',
    description: 'AVR 8-bit MCU family ATmega328P',
    offers: [
      {
        supplierId: 'nexar',
        supplierName: 'Nexar/Octopart',
        supplierSku: 'OCTO-ATMEGA328P',
        stockQuantity: 9800,
        moq: 5,
        priceBreaks: [
          { minQuantity: 5, unitPrice: 2.42 },
          { minQuantity: 100, unitPrice: 2.17 },
          { minQuantity: 500, unitPrice: 2.01 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
  {
    manufacturerPartNumber: 'ESP32WROOM32',
    manufacturer: 'Espressif Systems',
    description: '2.4 GHz Wi-Fi + Bluetooth combo module',
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32_datasheet_en.pdf',
    offers: [
      {
        supplierId: 'nexar',
        supplierName: 'Nexar/Octopart',
        supplierSku: 'OCTO-ESP32WROOM32',
        stockQuantity: 14300,
        moq: 20,
        priceBreaks: [
          { minQuantity: 20, unitPrice: 3.71 },
          { minQuantity: 200, unitPrice: 3.4 },
          { minQuantity: 1000, unitPrice: 3.2 },
        ],
        currency: 'USD',
        lastCheckedAt: '2026-04-27T00:00:00.000Z',
      },
    ],
  },
];
