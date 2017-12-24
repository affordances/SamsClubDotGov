const knex = require('../db/connection');

const products = [
  {
    name: 'Checkup',
    description: 'The doctor uses a stethoscope on you.',
    listPrice: 100,
    imagePath: '/checkup.jpg',
  },
  {
    name: 'Ambulance Ride',
    description: 'The siren goes weeeeoooo weeeeoooo.',
    listPrice: 1000,
    imagePath: '/ambulance.jpg',
  },
  {
    name: 'X-ray',
    description: 'The technician zaps you with rays.',
    listPrice: 500,
    imagePath: '/x-ray.jpg',
  },
];

knex('products').insert(products).then(() => {
  console.log('done')
});

// knex.destroy();
