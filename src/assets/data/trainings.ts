import { Trainings } from '@/types'

const descriptions = {
  basisconditie:
    'Verbeter je basisconditie met deze training in de rustige duurzone. Kies steeds voor een vlak of licht golvend terrein, zodat je zo veel mogelijk met een soepele cadans met ongeveer 90 - 95 pedaalomwentelingen per minuut mooi in je hartslagzone blijft. Kies voor een beperkte koolhydraatinname om een optimaal effect op onze basisconditie te garanderen.',
  maximaleVetverbranding:
    'Je rijdt nuchter: je hebt minstens 6 uur niks gegeten. Dus deze training moet niet altijd ’s ochtends zijn. Rustig opwarmen met 90 pedaalomwentelingen per minuut in de rustige duurzone. Dertig minuten in de intensieve duurzone. Zet iets meer kracht met ongeveer 80 omwentelingen. Eindig weer in de rustige duurzone met 90 pedaalomwentelingen. Deze training wil je vetverbranding verbeteren. Beperkt koolhydraten innemen kan pas na een uur trainen en is ook echt noodzakelijk vanaf dan om de kwaliteit van de training te garanderen.',
  maximaleVetverbrandingLang:
    'Deze training rijd je niet volledig nuchter, omdat je twee uur op de fiets zit. De prikkel voor je lichaam duurt te lang. Je neemt daarom vooraf een zeer lichte maaltijd met maximum 30 g koolhydraten. Dat kan bestaan uit 1 banaan of twee toasts met een dun laagje confituur, of een eitje en wat magere yoghurt. Je kan ook combineren met bijvoorbeeld een halve banaan en één toastje.',
  krachtopbouwMan:
    'Een korte intensieve training, waarbij je na een korte opwarming in de rustige duurzone met 90 omwentelingen, voor een aantal korte maar stevige intervals gaat in je drempelzone. Tijdens die krachtinterval kies je voor een lage cadans met 65 omwentelingen. Na elke krachtinterval, geef je je lichaam en spieren even de tijd om te bekomen, met soepel fietsen in de rustige duurzone met 95 omwentelingen. Je fietst ook soepel uit in diezelfde rustige duurzone.',
  krachtopbouwVrouw:
    'Een korte intensieve training, waarbij je na een korte opwarming in de rustige duurzone met 90 omwentelingen, voor een aantal korte maar stevige intervals gaat in je drempelzone. Tijdens die krachtinterval kies je voor een lage cadans met 65 omwentelingen. Na elke krachtinterval, geef je je lichaam en spieren even de tijd om te bekomen, met soepel fietsen in de rustige duurzone met 95 omwentelingen. Je fietst ook soepel uit in diezelfde rustige duurzone.',
  herstel:
    'Dit is een echt rustige training, waarmee je voor een goede doorbloeding van de spieren zorgt. Je lichaam mag geen trainingsprikkels krijgen. Je rijdt met een cadans met 95-100 omwentelingen, zonder kracht op je pedalen te zetten. Een opwarming of uitfietsen zijn niet nodig. Tijdens een hersteltraining van 45 tot 60 minuten heb je geen koolhydraten nodig, wat water volstaat. Bij de iets langere hersteltraining mag je een beetje eiwitten nemen. Na een hersteltraining moet je een beter gevoel hebben dan bij het begin van de rit.',
  drempelMan:
    'Je begint met een opwarming in de rustige duurzone met 90 omwentelingen. Nadien volgen een reeks langere intervals van 6 minuten tot 10 minuten in je drempelzone met een hartslag van 80 tot 85% van je maximum. Bouw je intensiteit in elke interval op tijdens de eerste twee minuten, en kom dan op een tempo dat je ook de volledige interval zal kunnen volhouden. Halverwege de interval moet je hartslag op de gewenste intensiteit (80-85% van je max) zitten. Begin niet te enthousiast aan de interval, bouw gelijkmatig op, en hou vooral vol ! Je zorgt tussen de intervals voor maximaal herstel in de rustige duurzone. Je fietst ook soepel uit in diezelfde rustige duurzone.',
  drempelVrouw:
    'Je begint met een opwarming in de rustige duurzone met 90 omwentelingen. Nadien volgen een reeks langere intervals van 5 tot 6 minuten in je drempelzone met een hartslag van 80 tot 80% van je maximum. Bouw je intensiteit in elke interval op tijdens de eerste twee minuten, en kom dan op een tempo dat je ook de volledige interval zal kunnen volhouden. Halverwege de interval moet je hartslag op de gewenste intensiteit (80-85% van je max) zitten. Begin niet te enthousiast aan de interval, bouw gelijkmatig op, en vooral : hou vol ! Je zorgt tussen de intervals voor maximaal herstel in de rustige duurzone. Je fietst ook soepel uit in diezelfde rustige duurzone.',
  explosiviteit:
    'Je begint met een korte opwarming in de rustige duurzone met 90 omwentelingen. Daarna ga je naar heel korte, maar wel zeer explosieve intervals van 30 seconden tot 1 minuut. Je lichaam mag deze intervals als een zeer zware, maximale inspanning aanvoelen. Na elke interval is wel een lang herstel van minstens 9 minuten nodig, opdat je lichaam volledig zou kunnen herstellen. Alleen zo zal je de volgende interval weer met maximale explosiviteit kunnen doen. Je doet een aantal intervals best zittend, een aantal best staand. Deze explosietraining bereidt je goed voor op de korte Vlaamse hellingen. Je fietst soepel uit in de rustige duurzone.',
  weerstandMan:
    'Je begint met een opwarming in de rustige duurzone met 90 omwentelingen. Nadien begin je aan intervals met telkens 30 seconden zeer hoge intensiteit en 30 seconden zeer lage intensiteit. Tijdens die dertig seconden geef je alles, maar zorg wel dat je het een halve minuut volhoudt. De volgende dertig seconden fiets je zeer passief, je laat de pedalen ronddraaien zonder spanning op je spieren te zetten. Tussen de intervals zorg je voor een rustig herstel van vijf minuten. Je fietst ook soepel uit in de rustige duurzone.',
  weerstandVrouw:
    'Je begint met een opwarming in de rustige duurzone met 90 omwentelingen. Nadien begin je aan intervals met telkens 15 seconden zeer hoge intensiteit en 15 seconden zeer lage intensiteit. Tijdens die dertig seconden geef je alles, maar zorg wel dat je het een halve minuut volhoudt. De volgende dertig seconden fiets je zeer passief, je laat de pedalen ronddraaien zonder spanning op je spieren te zetten. Tussen de intervals zorg je voor een rustig herstel van vijf minuten. Je fietst ook soepel uit in de rustige duurzone.',
}

export const trainings: Trainings = {
  '111.111': {
    name: 'Testtraining',
    description: 'Dit is een snelle testtraining.',
    time: 5.6,
    series: 4,
    repeats: 5,
    interval: 0.2,
    rest: 0.1,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 30,
    totalCarbs: 45,
    fluidUnits: 1.5,
  },
  '1.1': {
    name: 'Basisconditie',
    description: descriptions.basisconditie,
    time: 90,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 30,
    totalCarbs: 45,
    fluidUnits: 1.5,
  },
  '1.2': {
    name: 'Basisconditie',
    description: descriptions.basisconditie,
    time: 120,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 30,
    totalCarbs: 60,
    fluidUnits: 2,
  },
  '1.3': {
    name: 'Basisconditie',
    description: descriptions.basisconditie,
    time: 150,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 45,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '1.4': {
    name: 'Basisconditie',
    description: descriptions.basisconditie,
    time: 180,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 45,
    totalCarbs: 150,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '1.5': {
    name: 'Basisconditie',
    description: descriptions.basisconditie,
    time: 210,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 45,
    totalCarbs: 180,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '1.6': {
    name: 'Basisconditie',
    description: descriptions.basisconditie,
    time: 240,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 45,
    totalCarbs: 180,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '1.7': {
    name: 'Basisconditie',
    description: descriptions.basisconditie,
    time: 300,
    minIntensity: 65,
    maxIntensity: 75,
    carbs: 45,
    totalCarbs: 240,
    solidUnits: 4,
    fluidUnits: 4,
  },
  '2.1': {
    name: 'Maximale vetverbranding',
    description: descriptions.maximaleVetverbranding,
    time: 45,
    repeats: 1,
    interval: 15,
    minIntensity: 75,
    maxIntensity: 80,
    carbs: 0,
    totalCarbs: 0,
    waterUnits: 1,
  },
  '2.2': {
    name: 'Maximale vetverbranding',
    description: descriptions.maximaleVetverbranding,
    time: 60,
    repeats: 1,
    interval: 20,
    minIntensity: 75,
    maxIntensity: 80,
    carbs: 0,
    totalCarbs: 0,
    waterUnits: 1,
  },
  '2.3': {
    name: 'Maximale vetverbranding',
    description: descriptions.maximaleVetverbranding,
    time: 60,
    repeats: 2,
    interval: 15,
    rest: 10,
    minIntensity: 75,
    maxIntensity: 80,
    carbs: 0,
    totalCarbs: 0,
    waterUnits: 1,
  },
  '2.4': {
    name: 'Maximale vetverbranding',
    description: descriptions.maximaleVetverbranding,
    time: 90,
    repeats: 1,
    interval: 30,
    minIntensity: 75,
    maxIntensity: 80,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
    waterUnits: 1,
  },
  '2.5': {
    name: 'Maximale vetverbranding',
    description: descriptions.maximaleVetverbranding,
    time: 90,
    repeats: 2,
    interval: 20,
    rest: 10,
    minIntensity: 75,
    maxIntensity: 80,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
    waterUnits: 1,
  },
  '2.6': {
    name: 'Maximale vetverbranding',
    description: descriptions.maximaleVetverbrandingLang,
    time: 120,
    repeats: 1,
    interval: 30,
    minIntensity: 75,
    maxIntensity: 80,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
    waterUnits: 1,
  },
  '2.7': {
    name: 'Maximale vetverbranding',
    description: descriptions.maximaleVetverbrandingLang,
    time: 120,
    repeats: 2,
    interval: 30,
    rest: 10,
    minIntensity: 75,
    maxIntensity: 80,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
    waterUnits: 1,
  },
  '3.1': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwMan,
    time: 60,
    repeats: 6,
    interval: 2,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
  },
  '3.2': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwMan,
    time: 60,
    repeats: 8,
    interval: 2,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
  },
  '3.3': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwMan,
    time: 60,
    repeats: 10,
    interval: 2,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '3.4': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwMan,
    time: 60,
    repeats: 6,
    interval: 4,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '3.5': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwMan,
    time: 60,
    repeats: 8,
    interval: 4,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '3.6': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwMan,
    time: 60,
    repeats: 5,
    interval: 4,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '4.1': {
    name: 'Herstel',
    description: descriptions.herstel,
    time: 45,
    minIntensity: 55,
    maxIntensity: 65,
    totalCarbs: 0,
    waterUnits: 1,
  },
  '4.2': {
    name: 'Herstel',
    description: descriptions.herstel,
    time: 60,
    repeats: 2,
    interval: 5,
    rest: 10,
    minIntensity: 65,
    maxIntensity: 75,
    totalCarbs: 0,
    waterUnits: 1,
  },
  '4.3': {
    name: 'Herstel',
    description: descriptions.herstel,
    time: 90,
    repeats: 3,
    interval: 5,
    rest: 10,
    minIntensity: 65,
    maxIntensity: 75,
    totalCarbs: 0,
    waterUnits: 1,
  },
  '5.1': {
    name: 'Explosiviteit',
    description: descriptions.explosiviteit,
    time: 90,
    repeats: 6,
    interval: 0.5,
    rest: 9.5,
    minIntensity: 90,
    maxIntensity: 100,
    carbs: 60,
    totalCarbs: 90,
    solidUnits: 2,
    fluidUnits: 1,
  },
  '5.2': {
    name: 'Explosiviteit',
    description: descriptions.explosiviteit,
    time: 90,
    repeats: 6,
    interval: 1,
    rest: 9,
    minIntensity: 90,
    maxIntensity: 100,
    carbs: 60,
    totalCarbs: 90,
    solidUnits: 2,
    fluidUnits: 1,
  },
  '5.3': {
    name: 'Explosiviteit',
    description: descriptions.explosiviteit,
    time: 120,
    repeats: 8,
    interval: 1,
    rest: 9,
    minIntensity: 90,
    maxIntensity: 100,
    carbs: 90,
    totalCarbs: 180,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '5.4': {
    name: 'Explosiviteit',
    description: descriptions.explosiviteit,
    time: 150,
    repeats: 8,
    interval: 1,
    rest: 4,
    minIntensity: 90,
    maxIntensity: 100,
    carbs: 90,
    totalCarbs: 240,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '5.5': {
    name: 'Explosiviteit',
    description: descriptions.explosiviteit,
    time: 180,
    repeats: 10,
    interval: 1,
    rest: 4,
    minIntensity: 90,
    maxIntensity: 100,
    carbs: 90,
    totalCarbs: 270,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '6.1': {
    name: 'Drempeltraining',
    description: descriptions.drempelMan,
    time: 120,
    repeats: 3,
    interval: 6,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '6.2': {
    name: 'Drempeltraining',
    description: descriptions.drempelMan,
    time: 120,
    repeats: 4,
    interval: 6,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '6.3': {
    name: 'Drempeltraining',
    description: descriptions.drempelMan,
    time: 150,
    repeats: 3,
    interval: 8,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 90,
    totalCarbs: 240,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '6.4': {
    name: 'Drempeltraining',
    description: descriptions.drempelMan,
    time: 150,
    repeats: 4,
    interval: 8,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 90,
    totalCarbs: 240,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '6.5': {
    name: 'Drempeltraining',
    description: descriptions.drempelMan,
    time: 180,
    repeats: 3,
    interval: 10,
    rest: 5,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 90,
    totalCarbs: 270,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '6.6': {
    name: 'Drempeltraining',
    description: descriptions.drempelMan,
    time: 180,
    repeats: 4,
    interval: 10,
    rest: 5,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 90,
    totalCarbs: 270,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '7.1': {
    name: 'Weerstand',
    description: descriptions.weerstandMan,
    time: 120,
    series: 3,
    seriesRest: 10,
    repeats: 5,
    interval: 0.5,
    rest: 0.5,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '7.2': {
    name: 'Weerstand',
    description: descriptions.weerstandMan,
    time: 120,
    series: 4,
    seriesRest: 10,
    repeats: 5,
    interval: 0.5,
    rest: 0.5,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '7.3': {
    name: 'Weerstand',
    description: descriptions.weerstandMan,
    time: 150,
    series: 4,
    seriesRest: 5,
    repeats: 5,
    interval: 0.5,
    rest: 0.5,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 150,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '7.4': {
    name: 'Weerstand',
    description: descriptions.weerstandMan,
    time: 150,
    series: 5,
    seriesRest: 5,
    repeats: 5,
    interval: 0.5,
    rest: 0.5,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 150,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '7.5': {
    name: 'Weerstand',
    description: descriptions.weerstandMan,
    time: 180,
    series: 5,
    seriesRest: 5,
    repeats: 5,
    interval: 0.5,
    rest: 0.5,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 90,
    totalCarbs: 270,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '7.6': {
    name: 'Weerstand',
    description: descriptions.weerstandMan,
    time: 180,
    series: 6,
    seriesRest: 5,
    repeats: 5,
    interval: 0.5,
    rest: 0.5,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 90,
    totalCarbs: 270,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '8.1': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwVrouw,
    time: 60,
    repeats: 4,
    interval: 2,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
  },
  '8.2': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwVrouw,
    time: 60,
    repeats: 6,
    interval: 2,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 30,
    totalCarbs: 30,
    fluidUnits: 1,
  },
  '8.3': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwVrouw,
    time: 60,
    repeats: 8,
    interval: 2,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '8.4': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwVrouw,
    time: 60,
    repeats: 4,
    interval: 4,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '8.5': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwVrouw,
    time: 60,
    repeats: 6,
    interval: 4,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '8.6': {
    name: 'Krachtopbouw',
    description: descriptions.krachtopbouwVrouw,
    time: 60,
    repeats: 8,
    interval: 4,
    rest: 2,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 60,
    solidUnits: 1,
    fluidUnits: 1,
  },
  '9.1': {
    name: 'Weerstand',
    description: descriptions.weerstandVrouw,
    time: 120,
    series: 3,
    seriesRest: 10,
    repeats: 10,
    interval: 0.25,
    rest: 0.25,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '9.2': {
    name: 'Weerstand',
    description: descriptions.weerstandVrouw,
    time: 120,
    series: 4,
    seriesRest: 10,
    repeats: 10,
    interval: 0.25,
    rest: 0.25,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '9.3': {
    name: 'Weerstand',
    description: descriptions.weerstandVrouw,
    time: 150,
    series: 4,
    seriesRest: 5,
    repeats: 10,
    interval: 0.25,
    rest: 0.25,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 150,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '9.4': {
    name: 'Weerstand',
    description: descriptions.weerstandVrouw,
    time: 150,
    series: 5,
    seriesRest: 5,
    repeats: 10,
    interval: 0.25,
    rest: 0.25,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 60,
    totalCarbs: 150,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '9.5': {
    name: 'Weerstand',
    description: descriptions.weerstandVrouw,
    time: 180,
    series: 5,
    seriesRest: 5,
    repeats: 10,
    interval: 0.25,
    rest: 0.25,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 90,
    totalCarbs: 270,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '9.6': {
    name: 'Weerstand',
    description: descriptions.weerstandVrouw,
    time: 180,
    series: 6,
    seriesRest: 5,
    repeats: 10,
    interval: 0.25,
    rest: 0.25,
    minIntensity: 85,
    maxIntensity: 90,
    carbs: 90,
    totalCarbs: 270,
    solidUnits: 3,
    fluidUnits: 3,
  },
  '10.1': {
    name: 'Drempeltraining',
    description: descriptions.drempelVrouw,
    time: 120,
    repeats: 3,
    interval: 5,
    rest: 5,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '10.2': {
    name: 'Drempeltraining',
    description: descriptions.drempelVrouw,
    time: 120,
    repeats: 4,
    interval: 5,
    rest: 5,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 60,
    totalCarbs: 120,
    solidUnits: 2,
    fluidUnits: 2,
  },
  '10.3': {
    name: 'Drempeltraining',
    description: descriptions.drempelVrouw,
    time: 150,
    repeats: 3,
    interval: 6,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 90,
    totalCarbs: 240,
    solidUnits: 3,
    fluidUnits: 2,
  },
  '10.4': {
    name: 'Drempeltraining',
    description: descriptions.drempelVrouw,
    time: 150,
    repeats: 4,
    interval: 6,
    rest: 4,
    minIntensity: 80,
    maxIntensity: 85,
    carbs: 90,
    totalCarbs: 240,
    solidUnits: 3,
    fluidUnits: 2,
  },
}
