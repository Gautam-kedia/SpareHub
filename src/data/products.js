// Static data for now. Later this will come from the backend API.
import { jaggiParts } from './jaggiParts';
import { masterCylinders, calipers } from './aaaParts';
import { oroParts } from './oroParts';
import { mkParts } from './mkParts';

export const companies = [
  { id: 'swiss', name: 'Swiss Indicators', color: '#d97706' },
  { id: 'techlon', name: 'Techlon', color: '#0f766e' },
  { id: 'ngk', name: 'NGK Plugs', color: '#b91c1c' },
  { id: 'bosch', name: 'Bosch Plugs', color: '#374151' },
  { id: 'jaggi', name: 'Jaggi Cables', color: '#4338ca' },
  { id: 'jesco', name: 'Jesco Tanks', color: '#15803d' },
  { id: 'rolon', name: 'Rolon', color: '#9333ea' },
  { id: 'jogindra', name: 'Jogindra Metal', color: '#57534e' },
  { id: 'aaa', name: 'AAA Spares', color: '#1e3a8a' },
  { id: 'oro', name: 'ORO Filters', color: '#0f9d76' },
  { id: 'mk', name: 'MK Lide', color: '#b91c1c' },
];

// Each entry: [name, price, image?]. Images live in public/images/.
// Without an image, a placeholder is drawn.
const swissImg = (n) => `/images/swiss/swiss-${n}.jpeg`;

const partsByCompany = {
  swiss: [
    ['Blinker DEUS-1019XE - Glamor 2017 (Rear Right, Natural Lens)', 148, swissImg(0)],
    ['Blinker DEUS-1038U - Bullet Hunter 350 2022 (Rear Left)', 320, swissImg(1)],
    ['Blinker DEUS-1038V - Bullet Hunter 350 2022 (Rear Right)', 320, swissImg(1)],
    ['Blinker DEUS-1019FU - Glamor / Achiever / iSmart Universal', 260, swissImg(2)],
    ['Blinker DEUS-1035NS - Bullet Electra / Classic 350/500 (Front, Natural Lens)', 412, swissImg(3)],
    ['Blinker DEUS-1035MS - Bullet Electra / Classic 350/500 (Front, 2 Pin)', 412, swissImg(3)],
    ['Blinker DEUS-1021KU - Karizma ZMR Universal', 344, swissImg(4)],
    ['Blinker DEUS-1019YU - Passion Pro / Glamor BS-VI 2020 Universal', 230, swissImg(5)],
    ['Blinker DEUS-1018ZU - Splendor Pro Universal (Front/Rear, Natural Lens)', 264, swissImg(6)],
    ['Blinker DEUS-1020JU - Hunk / Glamor Universal (Natural Lens)', 368, swissImg(7)],
    ['Blinker DEUS-1019WU - Passion Pro 2015 Universal (Natural Lens)', 310, swissImg(8)],
    ['Blinker DEUS-1019FNU - Glamor / Achiever / iSmart Universal (Natural Lens)', 294, swissImg(9)],
    ['Blinker DEUS-1019EU - Splendor+ Universal (Front/Rear)', 266, swissImg(10)],
    ['Blinker DEUS-1019ER - Splendor+ (Rear Right)', 240, swissImg(11)],
    ['Blinker DEUS-1019EL - Splendor+ (Rear Left)', 262, swissImg(11)],
    ['Blinker DEUS-1019QNU - Passion Pro Universal (Front/Rear, Natural Lens)', 296, swissImg(12)],
    ['Blinker DEUS-1021SU - Shine Universal (Front/Rear)', 286, swissImg(13)],
    ['Blinker DEUS-1019QU - Passion+ / CD Deluxe / Super Splendor Universal', 310, swissImg(14)],
  ],
  techlon: [
    ['Clutch Lever - Splendor', 110], ['Brake Lever - Pulsar', 135],
    ['Rear View Mirror Set - Activa', 290], ['Side Panel Set - Passion Pro', 640],
    ['Headlight Visor - Shine', 380], ['Mudguard Front - HF Deluxe', 450],
    ['Chain Cover - Splendor', 325], ['Handle Grip Pair', 95],
  ],
  ngk: [
    ['NGK Spark Plug CPR8EA-9', 165], ['NGK Spark Plug CR7HSA', 145],
    ['NGK Spark Plug BKR6E', 210], ['NGK Iridium IX CR8EIX', 720],
    ['NGK Spark Plug C7HSA', 130], ['NGK Spark Plug DPR8EA-9', 175],
    ['NGK G-Power Platinum CR7HGP', 395], ['NGK Spark Plug Cap', 85],
  ],
  bosch: [
    ['Bosch Spark Plug - Pulsar', 145, '/images/bosch/bosch-plug.png'],
    ['Bosch Spark Plug - Hero Honda', 120, '/images/bosch/bosch-plug.png'],
    ['Bosch Spark Plug - Chetak', 110, '/images/bosch/bosch-plug.png'],
  ],
  jesco: [
    ['Fuel Tank - Splendor Plus', 2850], ['Fuel Tank - Pulsar 150', 3650],
    ['Fuel Tank - Passion Pro', 3100], ['Fuel Tank - HF Deluxe', 2690],
    ['Fuel Tank - Discover 125', 3290], ['Fuel Tank Cap with Lock', 340],
    ['Petrol Tank Cock (Fuel Tap)', 185], ['Fuel Tank - CD 100', 2480],
  ],
  rolon: [
    ['Chain Sprocket Kit - Splendor', 980], ['Chain Sprocket Kit - Pulsar 150', 1450],
    ['Chain Sprocket Kit - Apache 160', 1390], ['Timing Chain - Splendor', 310],
    ['Cam Chain - Pulsar', 365], ['Drive Chain 428H 130L', 720],
    ['Chain Sprocket Kit - Royal Enfield 350', 1980], ['Chain Tensioner', 245],
  ],
  jogindra: [
    ['Crash Guard - Splendor', 690], ['Footrest Assembly - Pulsar', 540],
    ['Silencer Guard - Passion', 260], ['Rear Carrier - HF Deluxe', 480],
    ['Side Stand - Splendor', 195], ['Main Stand - Shine', 465],
    ['Saree Guard - Activa', 380], ['Leg Guard - Royal Enfield Classic', 1650],
  ],
};

// Discount off M.R.P. per company (0.25 = 25% off). For these, the listed price is the M.R.P.
const discounts = { swiss: 0.25, jaggi: 0.5 };

let nextId = 1;
const listedParts = Object.entries(partsByCompany).flatMap(([companyId, list]) =>
  list.map(([name, listedPrice, image]) => {
    const discount = discounts[companyId];
    const price = discount ? Math.round(listedPrice * (1 - discount)) : listedPrice;
    return {
      id: nextId++,
      companyId,
      name,
      price,
      mrp: discount ? listedPrice : undefined,
      discount,
      image,
    };
  })
);

// Jaggi Cables: real catalogue items, sold at M.R.P. (less any discount in `discounts`).
// `price: null` = price on request.
const jaggiDiscount = discounts.jaggi;
const jaggi = jaggiParts.map((p) => ({
  id: nextId++,
  companyId: 'jaggi',
  name: `${p.type} - ${p.fits}`,
  partNo: p.partNo,
  price: p.mrp == null || !jaggiDiscount ? p.mrp : Math.round(p.mrp * (1 - jaggiDiscount)),
  mrp: jaggiDiscount && p.mrp != null ? p.mrp : undefined,
  discount: jaggiDiscount,
  image: p.image,
}));

// AAA Spares: one product per vehicle from the AAA price list, at M.R.P.
const aaaProduct = (type, image) => ([partNo, vehicle, mrp]) => ({
  id: nextId++,
  companyId: 'aaa',
  name: `${type} - ${vehicle}`,
  partNo,
  price: mrp,
  image,
});
const aaa = [
  ...masterCylinders.map(aaaProduct('Master Cylinder Assembly', '/images/aaa/master-cylinder.png')),
  ...calipers.map(aaaProduct('Caliper Assembly', '/images/aaa/caliper.png')),
];

// ORO Filters: grouped by vehicle brand (category). M.R.P. not added yet -> price on request.
const oro = oroParts.map((p) => ({
  id: nextId++,
  companyId: 'oro',
  category: p.category,
  name: /filter/i.test(p.name) ? p.name : `${p.name} Filter`,
  partNo: p.partNo,
  price: p.mrp ?? null,
  image: p.image,
}));

// MK Lide: inner clutch assemblies grouped by vehicle brand. M.R.P. not added yet.
const mk = mkParts.map((p) => ({
  id: nextId++,
  companyId: 'mk',
  category: p.category,
  name: `Clutch Assembly (${p.plates} FP) - ${p.fits}`,
  partNo: p.partNo,
  price: p.mrp ?? null,
  image: p.image,
}));

export const parts = [...listedParts, ...jaggi, ...aaa, ...oro, ...mk];

export const formatPrice = (n) =>
  '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
