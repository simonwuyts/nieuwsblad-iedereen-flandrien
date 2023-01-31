import { Zone } from '@/types'

export const zones: Zone[] = [
  {
    number: 0,
    name: 'Herstelzone',
    minHeart: 55,
    maxHeart: 65,
    minFTP: 40,
    maxFTP: 55,
  },
  {
    number: 1,
    name: 'Rustige lange duurzone',
    minHeart: 65,
    maxHeart: 75,
    minFTP: 55,
    maxFTP: 75,
  },
  {
    number: 2,
    name: 'Intensieve duurzone',
    minHeart: 75,
    maxHeart: 80,
    minFTP: 75,
    maxFTP: 90,
  },
  {
    number: 3,
    name: 'Drempelzone',
    minHeart: 80,
    maxHeart: 85,
    minFTP: 90,
    maxFTP: 105,
  },
  {
    number: 4,
    name: 'Weerstandzone',
    minHeart: 85,
    maxHeart: 90,
    minFTP: 105,
    maxFTP: 120,
  },
  {
    number: 5,
    name: 'Explosiviteitszone',
    minHeart: 90,
    maxHeart: 100,
    minFTP: 120,
    maxFTP: 200,
  },
]
