import honeysuckle_belgica from './images/honeysuckle_belgica.jpg'
import clematis_candy_stripe from './images/clematis_candy_stripe.jpg'
import passion_victoria from './images/passion_victoria.jpg'
import Clematis_Voluceau from './images/Clematis_Voluceau.jpg'

const tiles = [
  {
    title: 'Honeysuckle Belgica',
    description:
      "'Belgica' is a vigorous deciduous climber with paired ovate leaves and fragrant red-flushed white flowers, ageing to yellow, in early summer, followed by red berries",
    imageSrc: honeysuckle_belgica,
    watering: 'weekly',
    pruningTime: 'winter',
    feedingTime: 'summer',
    position: 'Full Sun',
    flowers: 'winter',
    petalColours: [{ hex: '#D099AC', name: 'Pink' }],
    scented: true,
    height: '1 meter',
    width: '2 meter',
    deciduous: true,
    family: 'Caprifoliaceae',
    genus: 'Lonicera',
    variety: 'mouse',
    cultivar: 'house',
    habit: 'Climbing',
    purchaseInfo: {
      pricePaid: '£2',
      broughtFrom: 'Morisssons',
      dateBrought: '28/08/2021',
    },
    id: 1,
  },
  {
    title: 'Clematis Candy Stripe',
    description: 'A gorgeous large flowered climber with pink and lilac striped petals.',
    imageSrc: clematis_candy_stripe,
    watering: 'Give them plenty of water once a week, rather than little and often',
    pruningTime: 'winter',
    feedingTime: 'summer',
    position: 'Full Sun or Partial Shade',
    aspect: 'South, East, West',
    shelter: 'Exposed, Sheltered',
    flowers: 'Summer',
    petalColours: [
      { hex: '#FFD3FF', name: 'Pink' },
      { hex: '#BC5EB5', name: 'Lilac' },
    ],
    leafColours: [],
    scented: true,
    soilType: 'Chalky, Clay, Loamy, Sandy',
    hardiness: 'H4',
    height: '3 meter',
    width: '2 meter',
    deciduous: true,
    family: 'Caprifoliaceae',
    genus: 'Clematis',
    variety: 'Candy Stripe',
    habit: 'Climbing',
    purchaseInfo: {
      pricePaid: '£3',
      broughtFrom: 'Tesco',
      dateBrought: '27/08/2021',
    },
    moreInfo: {
      notes: [
        'Plant with the crown of the plant 5-8cm deep to encourage new shoots to grow from below ground level. Clematis like a cool ‘root run’ so try and plant so that the roots are shaded. If you are planting in a sunny position, place some pieces of slate or flat stones on the soil after planting or use groundcover plants to keep the roots cool.',
      ],
      links: [
        {
          copy: 'Clematis pruning group info',
          url: 'https://www.gardenersworld.com/plants/clematis-groups-explained/',
        },
        {
          copy: 'Good info',
          url: 'https://www.yougarden.com/item-p-550268/large-flowered-clematis-candy-stripe',
        },
      ],
      clematisLevel: 2,
    },
    id: 2,
  },
  {
    title: 'Passion Flower Victoria',
    description:
      "Passiflora violacea 'Victoria' is a vigorous evergreen climber with stunning violet flowers that are larger than most other Passion Flowers. The beautiful blooms are followed by orange passion fruits that make a spectacular feature in late summer.",
    imageSrc: passion_victoria,
    id: 3,
  },
  {
    title: 'Clematis Voluceau',
    description:
      'Clematis Voluceau belongs to the late large flowering group, its flowers are a stunning reddish-purple colour and velvety to touch with yellow stamens. This variety belongs to the Late Large-flowered group, Prune Group 3, it blooms in late summer/autumn so you can prune it hard in early spring.  All shoots can be pruned right back to the previous years wood just above the plants base.',
    imageSrc: Clematis_Voluceau,
    id: 4,
  },
]

export { tiles }
