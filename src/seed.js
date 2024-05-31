const sampleUser = {
  hin: "123ABC456-DE",
  email: "email@website.com",
  password: "password",
  name: "John Smith",
  sex: "M",
  address: { street: "123 Main St", cityAndState: "Cambridge, MA" },
  phone: "617 555 1234",
  bloodType: "O+",
  weight: 170,
  bloodPressure: "110/70",
  age: 35,
  allergies: ["Pollen", "Shellfish"],
  paymentMethod: [
    { cardType: "VISA", cardNumber: "**** **** **** 1234", autopay: true },
  ],
  payments: [{ productType: "", amountDue: "", paymentDate: "" }],
  medications: [
    {
      name: "",
      dose: "",
      directions: "",
      sideEffects: "",
      prescribingDoctor: "",
    },
    {
      name: "",
      dose: "",
      directions: "",
      sideEffects: "",
      prescribingDoctor: "",
    },
  ],
  testResults: [
    { name: "", dateOrdered: "", dateReturned: "", orderedBy: "", value: "" },
    { name: "", dateOrdered: "", dateReturned: "", orderedBy: "", value: "" },
  ],
  appointments: [],
};

const products = [
  {
    id: 1,
    name: "Checkup",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 100,
    imagePath: "/checkup.svg",
  },
  {
    id: 2,
    name: "Blood Test",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 100,
    imagePath: "/bloodtest.svg",
  },
  {
    id: 3,
    name: "X-ray",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 500,
    imagePath: "/xray.svg",
  },
  {
    id: 4,
    name: "Vaccinations",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 200,
    imagePath: "/vaccinations.svg",
  },
  {
    id: 5,
    name: "Drugs",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 100,
    imagePath: "/drugs.svg",
  },
  {
    id: 6,
    name: "Surgery",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 5000,
    imagePath: "/surgery.svg",
  },
  {
    id: 7,
    name: "MRI",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 1000,
    imagePath: "/mri.svg",
  },
  {
    id: 8,
    name: "Dentist",
    description:
      "Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab. Dolore veritatis veniam rem soluta reprehenderit cumque atque sunt. Aut sit unde repudiandae impedit qui. Soluta qui et adipisci aliquid culpa quo voluptate mollitia. Non nobis cum natus qui facere soluta ab.",
    listPrice: 300,
    imagePath: "/dentist.svg",
  },
];

export { sampleUser, products };
