const sampleUser = {
  hin: '123ABC456-DE',
  email: 'email@website.com',
  password: 'password',
  name: 'John Smith',
  sex: 'male',
  dependents: 0,
  marital_status: true,
  pregnant: false,
  income: 20000,
  employed: true,
  plan: 'Bronze',
  cart: [],
}

const plans = [
  {
    name: 'Bronze',
    discount: 100,
    description: "Enjoy some health care... on us!",
  },
]

const products = [
  {
    id: 1,
    name: 'Checkup',
    description: 'Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.',
    listPrice: 100,
  },
  {
    id: 2,
    name: 'Ambulance Ride',
    description: 'Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.',
    listPrice: 1000,
  },
  {
    id: 3,
    name: 'X-ray',
    description: 'Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.',
    listPrice: 500,
  },
  {
    id: 4,
    name: 'Physical Therapy',
    description: 'Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.',
    listPrice: 250,
  },
];

export { sampleUser, products, plans };
