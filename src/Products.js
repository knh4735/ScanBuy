export const products = [
  {
    id: 880473500000,
    name: "Galaxy A30",
    price: 349800
  },
  {
    id: 880473500001,
    name: "Galaxy A50",
    price: 473000
  },
  {
    id: 880473500002,
    name: "Galaxy A90 5G",
    price: 899800
  },
  {
    id: 880473500003,
    name: "Galaxy Buds",
    price: 159500
  },
  {
    id: 880473500004,
    name: "Galaxy Fit",
    price: 118800
  },
  {
    id: 880473500005,
    name: "Galaxy Fit e",
    price: 49500
  },
  {
    id: 880473500006,
    name: "Galaxy Fold 5G",
    price: 2398000
  },
  {
    id: 880473500007,
    name: "Galaxy M20",
    price: 220000
  },
  {
    id: 880473500008,
    name: "Galaxy Note9",
    price: 1155000
  },
  {
    id: 880473500009,
    name: "Galaxy Note10 5G",
    price: 1248500
  },
  {
    id: 880473500010,
    name: "Galaxy Note10+ 5G",
    price: 1496000
  },
  {
    id: 880473500011,
    name: "Galaxy S10 5G",
    price: 1430000
  },
  {
    id: 880473500012,
    name: "Galaxy S10",
    price: 1056000
  },
  {
    id: 880473500013,
    name: "Galaxy S10+",
    price: 1749000
  },
  {
    id: 880473500014,
    name: "Galaxy Watch Active (Bluetooth)",
    price: 249700
  },
  {
    id: 880473500015,
    name: "Galaxy Watch Active2 40mm (Bluetooth)",
    price: 399300
  },
  {
    id: 880473500016,
    name: "Galaxy Watch Active2 44mm (Bluetooth)",
    price: 440000
  },
  {
    id: 880473500017,
    name: "Galaxy J4+",
    price: 264000
  },
  {
    id: 880473500018,
    name: "Galaxy J6 (2018)",
    price: 330000
  },
  {
    id: 880473500019,
    name: "Galaxy J3 (2017)",
    price: 244200
  },
  {
    id: 880473500020,
    name: "Gear VR with Controller (R3250)",
    price: 149600
  },
  {
    id: 880473500021,
    name: "Galaxy Watch 46mm (LTE)",
    price: 439200
  },
  {
    id: 880473500022,
    name: "Galaxy Watch 46mm (Bluetooth)",
    price: 359700
  },
  {
    id: 880473500023,
    name: "Galaxy Watch 42mm (Bluetooth)",
    price: 339900
  },
  {
    id: 880473500024,
    name: "Galaxy S10e",
    price: 899800
  }
];

export const getProductById = id => {
  const productId = Number(id);
  return products.find(product => product.id === productId);
};
