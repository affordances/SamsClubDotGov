const sampleUser = {
  hin: '123ABC456-DE',
  email: 'email@website.com',
  password: 'password',
  name: 'John Smith',
  marital_status: true,
  pregnant: false,
  income: 20000,
  employed: true,
  plan: 'Bronze',
  cart: [],
}

const products = [
  {
    id: 1,
    name: 'Checkup',
    description: 'The doctor uses a stethoscope on you.',
    listPrice: 100,
    imagePath: '/checkup.jpg',
  },
  {
    id: 2,
    name: 'Ambulance Ride',
    description: 'The siren goes weeeeoooo weeeeoooo.',
    listPrice: 1000,
    imagePath: '/ambulance.jpg',
  },
  {
    id: 3,
    name: 'X-ray',
    description: 'The technician zaps you with rays.',
    listPrice: 500,
    imagePath: '/x-ray.jpg',
  },
];

export { sampleUser, products };
