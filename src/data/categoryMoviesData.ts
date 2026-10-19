import { Movie } from '../types';

// Curated high quality cinematic posters
const POSTERS = {
  masterplan: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  loveOfLife: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  hope: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
  matchbox: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=600&q=80',
  carrie: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80',
  fall2: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
  onslaught: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
  spiderman: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
  oneNightOnly: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
  mobland: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
  florist: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  retribution: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80',
  sardar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
  kifeesi: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  uprising: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80',
  omuzigo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
  underWater: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
  nirvana: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  snowEagle: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
  soloLeveling: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
  demonSlayer: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
  nun2: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80',
  smile2: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  quietPlace: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  terrifier3: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80',
  squidGame: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
  zhanZhao: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
  kungFuPanda: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
};

// Create a placeholder movie with mountain placeholder
export function makePlaceholderMovie(id: string, vj = 'Vj Junior'): Movie {
  return {
    id: `ph-${id}`,
    title: 'Upcoming Release',
    vj,
    genre: 'MunoWatch',
    duration: '01h 45m',
    description: 'Upcoming translated blockbuster streaming exclusively on MunoWatch.',
    posterUrl: '',
    isLocked: true,
  };
}

// 1. Exact VJ JUNIOR list matching Screenshot_20261018_201123_Munowatch.jpg
export const VJ_JUNIOR_MOVIES: Movie[] = [
  {
    id: 'vjj-masterplan',
    title: 'Masterplan',
    vj: 'Vj Junior',
    genre: 'Crime / Heist',
    duration: '01h 41m',
    fileSize: '1.5 GB',
    description: 'A master thief enlists two strangers for an audacious Louvre heist.',
    posterUrl: POSTERS.masterplan,
    isLocked: true,
  },
  {
    id: 'vjj-love-of-life',
    title: 'Love of Your Life',
    vj: 'Vj Junior',
    genre: 'Drama',
    duration: '01h 43m',
    fileSize: '1.54 GB',
    description: 'Maya, a smart wry nurse, is swept up in an immersive love.',
    posterUrl: POSTERS.loveOfLife,
    isLocked: true,
  },
  {
    id: 'vjj-hope-1',
    title: 'Hope',
    vj: 'Vj Junior',
    genre: 'Sci-Fi / Thriller',
    duration: '02h 10m',
    fileSize: '1.8 GB',
    description: 'A mysterious alien discovery on the outskirts of an isolated harbor village.',
    posterUrl: POSTERS.hope,
    isLocked: true,
  },
  {
    id: 'vjj-matchbox',
    title: 'Matchbox: The Movie',
    vj: 'Vj Junior',
    genre: 'Action',
    duration: '01h 55m',
    fileSize: '1.65 GB',
    description: 'High-octane desert convoy warfare with modified armored transports.',
    posterUrl: POSTERS.matchbox,
    isLocked: true,
  },
  {
    id: 'vjj-carrie',
    title: 'Carrie',
    vj: 'Vj Junior',
    genre: 'Series / Horror',
    duration: '48m / ep',
    episodesCount: 'EPS',
    description: 'A shy teenager sheltered by religious upbringing discovers a shocking telekinetic power.',
    posterUrl: POSTERS.carrie,
    isLocked: true,
  },
  {
    id: 'vjj-fall2',
    title: 'Fall 2: Deadpoint',
    vj: 'Vj Junior',
    genre: 'Thriller',
    duration: '01h 48m',
    fileSize: '1.38 GB',
    description: 'Trapped on an overhang 2,000 feet above the clouds with failing carabiners.',
    posterUrl: POSTERS.fall2,
    isLocked: true,
  },
  {
    id: 'vjj-onslaught',
    title: 'Onslaught (A24)',
    vj: 'Vj Junior',
    genre: 'Action / Thriller',
    duration: '01h 38m',
    fileSize: '1.2 GB',
    description: 'A relentless siege on a remote tactical outpost.',
    posterUrl: POSTERS.onslaught,
    isLocked: true,
  },
  {
    id: 'vjj-spiderman',
    title: 'Spider-Man',
    vj: 'Vj Junior',
    genre: 'Action / Superhero',
    duration: '02h 15m',
    fileSize: '2.1 GB',
    description: 'Miles Morales traverses the dimensions to save the multiverse.',
    posterUrl: POSTERS.spiderman,
    isLocked: true,
  },
  makePlaceholderMovie('vjj-ph-1', 'Vj Junior'),
  makePlaceholderMovie('vjj-ph-2', 'Vj Junior'),
  {
    id: 'vjj-one-night-only',
    title: 'One Night Only',
    vj: 'Vj Junior',
    genre: 'Drama / Romance',
    duration: '01h 36m',
    fileSize: '1.1 GB',
    description: 'Two estranged lovers cross paths under neon night lights.',
    posterUrl: POSTERS.oneNightOnly,
    isLocked: true,
  },
  makePlaceholderMovie('vjj-ph-3', 'Vj Junior'),
  {
    id: 'vjj-mobland',
    title: 'Mobland Season 2',
    vj: 'Vj Junior',
    genre: 'Series / Crime',
    duration: '52m / ep',
    episodesCount: 'EPS 2.1',
    description: 'Maeve and Conrad leave Harry to deal with messy gang fallout.',
    posterUrl: POSTERS.mobland,
    isLocked: true,
  },
  makePlaceholderMovie('vjj-ph-4', 'Vj Junior'),
  makePlaceholderMovie('vjj-ph-5', 'Vj Junior'),
];

// 2. Exact ACTION list matching Screenshot_20261018_201136_Munowatch.jpg
export const ACTION_CATEGORY_MOVIES: Movie[] = [
  {
    id: 'act-florist',
    title: 'The Florist',
    vj: 'Vj Junior',
    genre: 'Action',
    duration: '01h 45m',
    fileSize: '1.4 GB',
    description: 'An elite assassin posing as a quiet town florist is pulled back into conflict.',
    posterUrl: POSTERS.florist,
    isLocked: true,
  },
  {
    id: 'act-retribution',
    title: 'Retribution',
    vj: 'Vj Ice P',
    genre: 'Action',
    duration: '01h 36m',
    fileSize: '1.25 GB',
    description: 'Underworld betrayal leads to an explosive revenge across the desert.',
    posterUrl: POSTERS.retribution,
    isLocked: true,
  },
  {
    id: 'act-hope-1',
    title: 'Hope',
    vj: 'Vj Junior',
    genre: 'Action / Sci-Fi',
    duration: '02h 10m',
    fileSize: '1.8 GB',
    description: 'Survivors defend their coastal harbor from an ancient subterranean creature.',
    posterUrl: POSTERS.hope,
    isLocked: true,
  },
  {
    id: 'act-masterplan',
    title: 'Masterplan',
    vj: 'Vj Junior',
    genre: 'Action / Heist',
    duration: '01h 41m',
    fileSize: '1.5 GB',
    description: 'High-tech thieves stage an impossible museum heist.',
    posterUrl: POSTERS.masterplan,
    isLocked: true,
  },
  {
    id: 'act-sardar',
    title: 'Sardar',
    vj: 'Vj Ice P',
    genre: 'Action / Spy',
    duration: '01h 27m',
    fileSize: '867 MB',
    episodesCount: 'EPS',
    description: 'A spy estranged from his family meets his upright police officer son.',
    posterUrl: POSTERS.sardar,
    isLocked: true,
  },
  {
    id: 'act-kifeesi',
    title: 'Kifeesi: The Law Breakers',
    vj: 'Vj Junior',
    genre: 'Action / Kampala Crime',
    duration: '01h 50m',
    fileSize: '1.35 GB',
    description: 'Two gangs, one mission, one city, no mercy in the downtown alleys of Kampala.',
    posterUrl: POSTERS.kifeesi,
    isLocked: true,
  },
  {
    id: 'act-hope-2',
    title: 'Hope (Director Cut)',
    vj: 'Vj Emmy',
    genre: 'Action / Sci-Fi',
    duration: '02h 15m',
    fileSize: '1.9 GB',
    description: 'Extended cut of the explosive alien confrontation.',
    posterUrl: POSTERS.hope,
    isLocked: true,
  },
  {
    id: 'act-matchbox-1',
    title: 'Matchbox: The Movie',
    vj: 'Vj Junior',
    genre: 'Action',
    duration: '01h 55m',
    fileSize: '1.65 GB',
    description: 'Armored desert transports clash in a canyon convoy rescue.',
    posterUrl: POSTERS.matchbox,
    isLocked: true,
  },
  {
    id: 'act-hope-3',
    title: 'Hope (Special Edition)',
    vj: 'Vj Ice P',
    genre: 'Action',
    duration: '02h 08m',
    fileSize: '1.8 GB',
    description: 'Luganda translation by Vj Ice P.',
    posterUrl: POSTERS.hope,
    isLocked: true,
  },
  {
    id: 'act-matchbox-apple',
    title: 'Matchbox: The Movie (Apple TV)',
    vj: 'Vj Junior',
    genre: 'Action',
    duration: '01h 55m',
    fileSize: '1.7 GB',
    description: 'John Cena and cartel pursuit in full cinematic 4K HDR.',
    posterUrl: POSTERS.matchbox,
    isLocked: true,
  },
  {
    id: 'act-uprising',
    title: 'The Uprising',
    vj: 'Vj Ice P',
    genre: 'Action / History',
    duration: '02h 05m',
    fileSize: '1.8 GB',
    description: 'Rebel fighters take sword in hand against an oppressive dynasty.',
    posterUrl: POSTERS.uprising,
    isLocked: true,
  },
  {
    id: 'act-onslaught',
    title: 'Onslaught (A24)',
    vj: 'Vj Junior',
    genre: 'Action / Thriller',
    duration: '01h 38m',
    fileSize: '1.2 GB',
    description: 'A relentless siege on a remote tactical outpost.',
    posterUrl: POSTERS.onslaught,
    isLocked: true,
  },
  {
    id: 'act-spiderman-1',
    title: 'Spider-Man: Brand New Day',
    vj: 'Vj Junior',
    genre: 'Action',
    duration: '02h 10m',
    fileSize: '2.0 GB',
    description: 'Web-slinging rooftop action across the Manhattan skyline.',
    posterUrl: POSTERS.spiderman,
    isLocked: true,
  },
  makePlaceholderMovie('act-ph-1', 'Vj Junior'),
  {
    id: 'act-spiderman-2',
    title: 'Spider-Man: Multiverse War',
    vj: 'Vj Ice P',
    genre: 'Action',
    duration: '02h 20m',
    fileSize: '2.2 GB',
    description: 'Peter Parker and Miles Morales unite against sinister forces.',
    posterUrl: POSTERS.spiderman,
    isLocked: true,
  },
];

// Helper to generate a 15-movie grid for any Genre or Veejay
export function getCategoryGridMovies(categoryName: string, type: 'genre' | 'veejay'): Movie[] {
  const norm = categoryName.toLowerCase().trim();

  if (type === 'veejay') {
    if (norm.includes('junior')) {
      return VJ_JUNIOR_MOVIES;
    }

    // Curate bespoke titles per Veejay
    const veejayTitles: Record<string, string[]> = {
      'vj emmy': [
        'Lilian on Music & Healing', 'Blossoms of Power', '2 Generations One Laugh', 'Mobland Season 2',
        'Last Seen', 'Hope (Director Cut)', 'Kampala Night Tales', 'The Heist Master',
        'Placeholder 1', 'Placeholder 2', 'Queen of Katwe Returns', 'Silent Echoes',
        'Shadows in the Mist', 'Placeholder 3', 'Destiny Bond'
      ],
      'vj ice p': [
        'Sardar: The Untold Spy', 'Beauty in Black', 'Retribution', 'The Uprising',
        'Hope (Special Edition)', 'Spider-Man: Multiverse War', 'Tactical Strike', 'Night Raid',
        'Placeholder 1', 'Desert Storm Falcon', 'Cold Blood Revenge', 'Placeholder 2',
        'Bloodline Dynasty', 'Placeholder 3', 'Iron Fist Legend'
      ],
      'vj tom': [
        'Cyber Hunter 2099', 'The Mechanic Return', 'Under Siege Africa', 'Speed Chase Highway',
        'Rogue Agent Zero', 'The Bounty Hunter', 'Black Sky Horizon', 'Placeholder 1',
        'Placeholder 2', 'Sniper: Final Ghost', 'Border Patrol Fury', 'Silent Kill',
        'Placeholder 3', 'Redemption Road', 'The Assassin Guild'
      ],
      'vj ulio': [
        'King of the Ring', 'Street Fighter Extreme', 'War Dogs Command', 'Deep Ocean Danger',
        'The Lost Treasure', 'Jungle Ambush', 'Placeholder 1', 'Delta Force Strike',
        'Placeholder 2', 'Cobra Strike', 'The Fortress Gate', 'Placeholder 3',
        'Warrior Spirit', 'Last Warrior Standing', 'Vanguard Elite'
      ],
      'vj jingo': [
        'Legend of the Drunken Master', 'Shaolin Temple Heroes', 'Twin Dragons Revenge', 'Fist of Fury 2',
        'The Golden Armor', 'Secret of Wudang', 'Placeholder 1', 'Tiger Claw Legend',
        'Placeholder 2', 'Snake in Eagle Shadow', 'The Iron Body', 'Placeholder 3',
        'Flying Daggers Return', 'Master of Zen', 'Wu Tang Clan Legacy'
      ],
      'vj shao khan': [
        'Mortal Battle Reign', 'Sub-Zero Chronicles', 'Scorpion Revenge', 'Outworld Tournament',
        'The Netherrealm Gate', 'Elder Gods War', 'Placeholder 1', 'Shadow Realm Infiltration',
        'Placeholder 2', 'Thunder God Fury', 'Dragon Blade Destiny', 'Placeholder 3',
        'Blood and Sand Arena', 'Chaos Realm Odyssey', 'Final Combat Apocalypse'
      ],
      'vj sammy': [
        'Dream to You', 'Melody of My Heart', 'Starlight Symphony', 'Two Hearts One Song',
        'Rain on Sunset Boulevard', 'The Sound of Tomorrow', 'Placeholder 1', 'Echoes of Joy',
        'Placeholder 2', 'A Song for Grace', 'Kampala Romance', 'Placeholder 3',
        'Whispers in the Wind', 'Rhythm of the Soul', 'Harmony of Love'
      ],
      'vj nelly': [
        'The Royal Heiress', 'Secrets of the Palace', 'Diamond in the Rough', 'Golden Sunset Manor',
        'The Billionaire Bet', 'Destiny Calling', 'Placeholder 1', 'Love Across Borders',
        'Placeholder 2', 'Forbidden Romance', 'Heartstrings in Paris', 'Placeholder 3',
        'A Promise Kept', 'Wedding Season Bell', 'Eternal Affection'
      ],
      'vj soul': [
        'Soulful Journey', 'Deep Reflections', 'The Road Back Home', 'Midnight Blues Kampala',
        'Healing Hands', 'Voices in the Dark', 'Placeholder 1', 'The Forgotten Melody',
        'Placeholder 2', 'Grace and Truth', 'Walking With Shadows', 'Placeholder 3',
        'Morning Light Dawning', 'The Peace Within', 'Serenity Bay'
      ],
      'vj kevo': [
        'High Velocity 9', 'Nitro Burnout Street', 'Turbo Drift Express', 'Underground Racers',
        'Maximum Overdrive', 'Asphalt King', 'Placeholder 1', 'Midnight Racer 4',
        'Placeholder 2', 'Gear Shift Frenzy', 'Street Legends Kampala', 'Placeholder 3',
        'Speed Zone Hazard', 'Adrenaline Rush', 'Burnout Revenge'
      ],
      'vj kevin': [
        'Tactical Breach', 'Covert Operation Delta', 'Ghost Protocol Entebbe', 'The Blackout Mission',
        'Urban Defense Force', 'Strike Team Alpha', 'Placeholder 1', 'Target Acquired',
        'Placeholder 2', 'Stealth Recon', 'No Man Land', 'Placeholder 3',
        'Hostage Extraction', 'Behind Enemy Wires', 'Final Extraction'
      ],
      'vj kriss sweet': [
        'Sweet Love Chronicles', 'Cupid Arrow Strike', 'Falling for the Enemy', 'The Matchmaker Secret',
        'Love on the Airwaves', 'Heart to Heart Date', 'Placeholder 1', 'Sunset Kisses Kampala',
        'Placeholder 2', 'The Wedding Singer', 'Sweetest Mistake', 'Placeholder 3',
        'Love in the Afternoon', 'Forever Yours Truly', 'Romantic Escape'
      ],
      'vj hd': [
        'Ultra Definition Action', '4K Combat Command', 'Neon Cyberpunk 2088', 'Hyper Vision Force',
        'Quantum Strike Force', 'Crystal Clear Revenge', 'Placeholder 1', 'Future War HD',
        'Placeholder 2', 'High Resolution Fury', 'Techno Samurai', 'Placeholder 3',
        'Apex Predator Matrix', 'Zero Gravity Shock', 'Digital Fortress'
      ],
      'vj dan de': [
        'Safari Hunters', 'Wild Africa Outback', 'The Nile Mystery', 'Savannah Warriors',
        'Serengeti Lions Pride', 'Rift Valley Expedition', 'Placeholder 1', 'Jungle River Escape',
        'Placeholder 2', 'Mountain Gorilla Guard', 'Secrets of Victoria', 'Placeholder 3',
        'Equator Trail Blazer', 'African Odyssey', 'The Wild Frontier'
      ]
    };

    const postersPool = [
      POSTERS.retribution,
      POSTERS.sardar,
      POSTERS.hope,
      POSTERS.masterplan,
      POSTERS.carrie,
      POSTERS.fall2,
      POSTERS.onslaught,
      POSTERS.uprising,
      POSTERS.spiderman,
      POSTERS.oneNightOnly,
      POSTERS.mobland,
      POSTERS.snowEagle,
      POSTERS.nirvana,
      POSTERS.florist,
      POSTERS.soloLeveling,
    ];

    const titlesList = veejayTitles[norm] || Array.from({ length: 15 }, (_, i) => `${categoryName} Hit #${i + 1}`);

    return titlesList.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder') || i === 8 || i === 13) {
        return makePlaceholderMovie(`${categoryName}-${i}`, categoryName);
      }
      return {
        id: `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${i}`,
        title,
        vj: categoryName,
        genre: 'Action / Drama',
        duration: '01h 45m',
        fileSize: '1.45 GB',
        episodesCount: i === 3 ? 'EPS' : i === 7 ? 'EPS 2.1' : undefined,
        description: `Exclusive Ugandan Luganda translated release translated by ${categoryName}.`,
        posterUrl: postersPool[i % postersPool.length],
        isLocked: true,
      };
    });
  }

  // Handle Specific Genres
  if (norm === 'action') {
    return ACTION_CATEGORY_MOVIES;
  }

  if (norm === 'horror') {
    const horrorPool = [
      POSTERS.nun2, POSTERS.smile2, POSTERS.quietPlace, POSTERS.terrifier3,
      POSTERS.carrie, POSTERS.hope, POSTERS.fall2, POSTERS.onslaught,
      POSTERS.retribution, POSTERS.masterplan
    ];
    const horrorTitles = [
      'The Nun 2', 'Smile 2: Final Grin', 'A Quiet Place: Day One', 'Terrifier 3: Christmas Blood',
      'Carrie: Unleashed', 'Hope in the Fog', 'Fall 2: Abyss', 'Onslaught in Shadows',
      'Placeholder 1', 'Midnight Haunting', 'The Cursed Manor', 'Placeholder 2',
      'Dark Whispers', 'Placeholder 3', 'Sinister Harvest'
    ];
    return horrorTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) {
        return makePlaceholderMovie(`hor-ph-${i}`, 'Vj Junior');
      }
      return {
        id: `hor-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Ice P',
        genre: 'Horror',
        duration: '01h 50m',
        fileSize: '1.45 GB',
        episodesCount: i === 4 ? 'EPS' : undefined,
        description: 'Chilling horror thriller streaming in English to Luganda translation.',
        posterUrl: horrorPool[i % horrorPool.length],
        isLocked: true,
      };
    });
  }

  if (norm === 'series' || norm === 'tv shows') {
    const seriesPool = [
      POSTERS.mobland, POSTERS.carrie, POSTERS.squidGame, POSTERS.zhanZhao,
      POSTERS.nirvana, POSTERS.snowEagle, POSTERS.sardar, POSTERS.florist
    ];
    const seriesTitles = [
      'Sardar: The Syndicate', 'Allegiance', 'Last Seen', 'Dream to You',
      'Carrie: Series', 'Blossoms of Power', 'Beauty in Black (EPS 3.1)', '2 Generations One Laugh',
      'Mobland Season 2', 'Placeholder 1', 'Squid Game: The Challenge', 'Placeholder 2',
      'Snow Eagle Lord', 'Placeholder 3', 'Nirvana in Fire'
    ];
    return seriesTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) {
        return makePlaceholderMovie(`ser-ph-${i}`, 'Vj Junior');
      }
      return {
        id: `ser-${i}`,
        title,
        vj: i % 3 === 0 ? 'Vj Junior' : i % 3 === 1 ? 'Vj Emmy' : 'Vj Ice P',
        genre: 'Series',
        duration: '45m / ep',
        episodesCount: i === 6 ? 'EPS 3.1' : i === 8 ? 'EPS 2.1' : `EPS`,
        description: 'Episodic TV series streaming exclusively on MunoWatch with full translation.',
        posterUrl: seriesPool[i % seriesPool.length],
        isLocked: i !== 3 && i !== 7,
      };
    });
  }

  if (norm === 'kungu fu') {
    const kfPool = [
      POSTERS.zhanZhao, POSTERS.snowEagle, POSTERS.nirvana, POSTERS.uprising,
      POSTERS.kungFuPanda, POSTERS.retribution
    ];
    const kfTitles = [
      'Imperial Guard: Zhan Zhao', 'Snow Eagle Hero', 'Nirvana Fire Blade', 'The Uprising Samurai',
      'Legend of the Shadow Fist', 'Master of the Five Venoms', 'Placeholder 1', 'Dragon Claws Fury',
      'Placeholder 2', 'Shaolin Wooden Men', 'Drunken Swordmaster', 'Placeholder 3',
      'The Flying Daggers', 'Iron Body Technique', 'Wu Dang Mountain Legend'
    ];
    return kfTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) {
        return makePlaceholderMovie(`kf-ph-${i}`, 'Vj Ice P');
      }
      return {
        id: `kf-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Ice P',
        genre: 'Kungu Fu',
        duration: '01h 40m',
        fileSize: '1.35 GB',
        episodesCount: i === 2 ? 'EPS' : undefined,
        description: 'High flying martial arts action and ancient sword battles translated in Luganda.',
        posterUrl: kfPool[i % kfPool.length],
        isLocked: true,
      };
    });
  }

  if (norm === 'animation') {
    const animePool = [
      POSTERS.soloLeveling, POSTERS.demonSlayer, POSTERS.spiderman, POSTERS.kungFuPanda
    ];
    const animeTitles = [
      'Solo Leveling: Arise', 'Demon Slayer: Hashira Training', 'Spider-Man: Across the Spider-Verse',
      'Kung Fu Panda 4', 'Attack on Fortress Katuni', 'Dragon Warrior Rebirth',
      'Placeholder 1', 'Jujutsu Sorcerers', 'Placeholder 2', 'Ninja Scroll Kampala',
      'Legend of the Blue Sea', 'Placeholder 3', 'Cyber Katuni 2077', 'Phoenix Princess', 'Gundam Steel'
    ];
    return animeTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) {
        return makePlaceholderMovie(`ani-ph-${i}`, 'Vj Junior');
      }
      return {
        id: `ani-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Emmy',
        genre: 'Animation',
        duration: '25m / ep',
        episodesCount: i % 2 === 0 ? 'EPS' : undefined,
        description: 'Popular anime & katuni animation voiced over in Luganda.',
        posterUrl: animePool[i % animePool.length],
        isLocked: true,
      };
    });
  }

  if (norm === 'adventure') {
    const advPool = [POSTERS.matchbox, POSTERS.fall2, POSTERS.hope, POSTERS.uprising, POSTERS.snowEagle];
    const advTitles = [
      'Matchbox: The Sahara Run', 'Fall 2: Peak Survival', 'Hope in Antarctica', 'The Uprising Expedition',
      'Jungle of the Ancient Kings', 'Amazon River Rogue', 'Placeholder 1', 'The Lost City of Gold',
      'Placeholder 2', 'Canyon Crossing', 'Isle of Serpents', 'Placeholder 3',
      'Desert Caravan', 'The Deep Trench', 'Alpine Rescue'
    ];
    return advTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) return makePlaceholderMovie(`adv-ph-${i}`, 'Vj Junior');
      return {
        id: `adv-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Ice P',
        genre: 'Adventure',
        duration: '01h 55m',
        fileSize: '1.5 GB',
        description: 'Thrilling adventure expedition streaming in English to Luganda translation.',
        posterUrl: advPool[i % advPool.length],
        isLocked: true,
      };
    });
  }

  if (norm === 'love story' || norm === 'romance') {
    const romPool = [POSTERS.loveOfLife, POSTERS.oneNightOnly, POSTERS.florist, POSTERS.sardar];
    const romTitles = [
      'Love of Your Life', 'One Night Only', 'The Florist Secret', 'Whispers in Kampala',
      'Autumn Rain Romance', 'Letters to Maya', 'Placeholder 1', 'When Hearts Collide',
      'Placeholder 2', 'Second Chance at Love', 'Moonlight Serenade', 'Placeholder 3',
      'Dance With Me Again', 'Love by Sunset', 'Forever and a Day'
    ];
    return romTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) return makePlaceholderMovie(`rom-ph-${i}`, 'Vj Sammy');
      return {
        id: `rom-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Sammy',
        genre: 'Romance / Love Story',
        duration: '01h 42m',
        fileSize: '1.25 GB',
        description: 'Heartwarming love story and romantic drama with Luganda commentary.',
        posterUrl: romPool[i % romPool.length],
        isLocked: true,
      };
    });
  }

  if (norm === 'comedy') {
    const comPool = [POSTERS.spiderman, POSTERS.kungFuPanda, POSTERS.masterplan, POSTERS.loveOfLife];
    const comTitles = [
      '2 Generations One Laugh', 'Kampala Boda Boda Hustle', 'Uncle Kato Goes to Town', 'Crazy Wedding Day',
      'Roommates from Heaven', 'The Fake Pastor', 'Placeholder 1', 'Trouble in the Village',
      'Placeholder 2', 'Market Day Madness', 'The Million Dollar Bet', 'Placeholder 3',
      'Two Wives One House', 'School Reunion Chaos', 'Kampala Night Fever'
    ];
    return comTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) return makePlaceholderMovie(`com-ph-${i}`, 'Vj Emmy');
      return {
        id: `com-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Emmy' : 'Vj Junior',
        genre: 'Comedy',
        duration: '01h 35m',
        fileSize: '1.15 GB',
        description: 'Hilarious comedy with vibrant Luganda punchlines and translation.',
        posterUrl: comPool[i % comPool.length],
        isLocked: false,
      };
    });
  }

  if (norm === 'crime') {
    const crimePool = [POSTERS.masterplan, POSTERS.mobland, POSTERS.retribution, POSTERS.kifeesi, POSTERS.florist];
    const crimeTitles = [
      'Masterplan: Louvre Heist', 'Mobland Season 2', 'Kifeesi: Law Breakers', 'Retribution City',
      'The Florist Assassin', 'Kampala Underworld', 'Placeholder 1', 'Dockyard Smugglers',
      'Placeholder 2', 'Bank Vault Zero', 'The Informant Game', 'Placeholder 3',
      'Cartel Alley', 'Highway Hijackers', 'The Don of Katwe'
    ];
    return crimeTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) return makePlaceholderMovie(`crm-ph-${i}`, 'Vj Junior');
      return {
        id: `crm-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Ice P',
        genre: 'Crime',
        duration: '01h 50m',
        fileSize: '1.6 GB',
        episodesCount: i === 1 ? 'EPS 2.1' : undefined,
        description: 'Gritty crime saga and high-stakes criminal warfare translated into Luganda.',
        posterUrl: crimePool[i % crimePool.length],
        isLocked: true,
      };
    });
  }

  if (norm === 'sci fi') {
    const scifiPool = [POSTERS.hope, POSTERS.underWater, POSTERS.spiderman, POSTERS.soloLeveling];
    const scifiTitles = [
      'Hope: Alien Harbor', 'Under Water Drilling Disaster', 'Spider-Man Multiverse', 'Solo Leveling Portal',
      'Cybernetic Frontier 2088', 'Solar Storm Warning', 'Placeholder 1', 'The Time Traveler Paradox',
      'Placeholder 2', 'Artificial Mind Strike', 'Black Hole Odyssey', 'Placeholder 3',
      'Lunar Colony Rebellion', 'Genetic Drift', 'The Andromeda Signal'
    ];
    return scifiTitles.map((title, i) => {
      if (title.toLowerCase().startsWith('placeholder')) return makePlaceholderMovie(`sci-ph-${i}`, 'Vj Junior');
      return {
        id: `sci-${i}`,
        title,
        vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Tom',
        genre: 'Sci FI',
        duration: '02h 05m',
        fileSize: '1.85 GB',
        description: 'Mind-bending science fiction epic with full Luganda voice narration.',
        posterUrl: scifiPool[i % scifiPool.length],
        isLocked: true,
      };
    });
  }

  // Fallback for any other genre (Drama, Sport, Thriller, Family, Latest on Munowatch, etc.)
  const generalPool = [
    POSTERS.masterplan,
    POSTERS.loveOfLife,
    POSTERS.hope,
    POSTERS.matchbox,
    POSTERS.carrie,
    POSTERS.fall2,
    POSTERS.onslaught,
    POSTERS.spiderman,
    POSTERS.oneNightOnly,
    POSTERS.mobland,
    POSTERS.florist,
    POSTERS.retribution,
    POSTERS.sardar,
  ];

  return Array.from({ length: 15 }).map((_, i) => {
    if (i === 8 || i === 11 || i === 13) {
      return makePlaceholderMovie(`${categoryName}-${i}`, 'Vj Junior');
    }
    return {
      id: `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      title: `${categoryName} Release #${i + 1}`,
      vj: i % 2 === 0 ? 'Vj Junior' : 'Vj Ice P',
      genre: categoryName,
      duration: '01h 45m',
      fileSize: '1.35 GB',
      description: `${categoryName} blockbuster streaming in English to Luganda translation.`,
      posterUrl: generalPool[i % generalPool.length],
      isLocked: true,
    };
  });
}

