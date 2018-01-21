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
    description: 'The doctor uses a stethoscope on you.',
    listPrice: 100,
  },
  {
    id: 2,
    name: 'Ambulance Ride',
    description: 'The siren goes weeeeoooo weeeeoooo.',
    listPrice: 1000,
  },
  {
    id: 3,
    name: 'X-ray',
    description: 'The technician zaps you with rays.',
    listPrice: 500,
  },
  {
    id: 4,
    name: 'Physical Therapy',
    description: 'You learn to walk again.',
    listPrice: 250,
  },
];

export { sampleUser, products, plans };
