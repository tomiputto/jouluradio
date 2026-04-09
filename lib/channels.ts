export interface Channel {
  id: string
  name: string
  label: string // shown in player bar (uppercase)
  streamUrl: string
  metadataChannel: string // SomaFM channel ID for metadata
  gradientFrom: string
  gradientTo: string
  gradientAngle: number
  currentSong: string
  currentArtist: string
}

export const channels: Channel[] = [
  {
    id: 'jouluradio',
    name: 'Jouluradio',
    label: 'JOULURADIO',
    streamUrl: 'https://ice1.somafm.com/christmas-128-mp3',
    metadataChannel: 'christmas',
    gradientFrom: '#590907',
    gradientTo: '#8d2422',
    gradientAngle: 224,
    currentSong: 'Tonttuparaati',
    currentArtist: 'Pentti Lasanen',
  },
  {
    id: 'julradion',
    name: 'Julradion',
    label: 'JULRADION',
    streamUrl: 'https://ice2.somafm.com/christmas-128-mp3',
    metadataChannel: 'christmas',
    gradientFrom: '#453261',
    gradientTo: '#624b80',
    gradientAngle: 224,
    currentSong: 'White Christmas',
    currentArtist: 'Bing Crosby',
  },
  {
    id: 'kauneimmat',
    name: 'Kauneimmat joululaulut',
    label: 'KAUNEIMMAT',
    streamUrl: 'https://ice1.somafm.com/fluid-128-mp3',
    metadataChannel: 'fluid',
    gradientFrom: '#33542e',
    gradientTo: '#4b7b43',
    gradientAngle: 224,
    currentSong: 'Sydämeeni joulun teen',
    currentArtist: 'Vesa-Matti Loiri',
  },
  {
    id: 'lasten',
    name: 'Lasten jouluradio',
    label: 'LASTEN',
    streamUrl: 'https://ice4.somafm.com/christmas-128-mp3',
    metadataChannel: 'christmas',
    gradientFrom: '#4d5b97',
    gradientTo: '#84bbf9',
    gradientAngle: 224,
    currentSong: 'Hämähäkki joulupukki',
    currentArtist: 'Tonttu Toljanteri',
  },
  {
    id: 'popjoulu',
    name: 'Popjoulu',
    label: 'POPJOULU',
    streamUrl: 'https://ice2.somafm.com/doomed-128-mp3',
    metadataChannel: 'doomed',
    gradientFrom: '#701c1a',
    gradientTo: '#bd537b',
    gradientAngle: 224,
    currentSong: 'All I Want For Christmas Is You',
    currentArtist: 'Mariah Carey',
  },
  {
    id: 'rouhea',
    name: 'Rouhea joulu',
    label: 'ROUHEA',
    streamUrl: 'https://ice1.somafm.com/doomed-128-mp3',
    metadataChannel: 'doomed',
    gradientFrom: '#000000',
    gradientTo: '#3a373d',
    gradientAngle: 224,
    currentSong: 'Fairytale of New York',
    currentArtist: 'The Pogues',
  },
  {
    id: 'klassinen',
    name: 'Klassinen joulu',
    label: 'KLASSINEN',
    streamUrl: 'https://ice1.somafm.com/fluid-128-mp3',
    metadataChannel: 'fluid',
    gradientFrom: '#3d277f',
    gradientTo: '#233062',
    gradientAngle: 224,
    currentSong: 'Pähkinänsärkijä-sarja',
    currentArtist: 'Tchaikovsky',
  },
  {
    id: 'happy',
    name: 'Happy holidays',
    label: 'HAPPY HOLIDAYS',
    streamUrl: 'https://ice6.somafm.com/christmas-128-mp3',
    metadataChannel: 'christmas',
    gradientFrom: '#957427',
    gradientTo: '#ddb446',
    gradientAngle: 224,
    currentSong: "It's Beginning to Look a Lot Like Christmas",
    currentArtist: 'Michael Bublé',
  },
]
