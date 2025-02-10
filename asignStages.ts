interface Artist {
    id: string;
    name: string;
    genre: string;
    stage?: string;
}
  
  interface Stage {
    id: string;
    name: string;
    genres: Array<string>;
}

//version pas opti
  
  function assignStages(artists, stages) {
    for (let stage of stages) {
      for (let artist of artists) {
        if (stage.genres.includes(artist.genre)) {
          artist.stage = stage.id;
          break;
        }
      }
    }
}

//version opti

function assignStagesOpti(artists: Artist[], stages: Stage[]): void {
    // Étape 1 : Construire un dictionnaire { genre -> stageId }
    const genreToStageMap = new Map<string, string>();
    for (const stage of stages) {
      for (const genre of stage.genres) {
        genreToStageMap.set(genre, stage.id);
      }
    }

    // Étape 2 : Assigner chaque artiste à sa scène en O(1)
    for (const artist of artists) {
      const stageId = genreToStageMap.get(artist.genre);
      if (stageId) {
        artist.stage = stageId;
      }
    }
}

// Génération de 100 000 artistes avec 10 genres différents
const genres = ["Rock", "Jazz", "Pop", "Hip-Hop", "Metal", "Reggae", "Classical", "Electronic", "Blues", "Country"];
const artists2: Artist[] = [];
for (let i = 0; i < 100000; i++) {
  artists2.push({
    id: (i + 1).toString(),
    name: `Artist ${i}`,
    genre: genres[i % genres.length],
  });
}

// Génération de 10 scènes (une pour chaque genre)
const stages: Stage[] = genres.map((genre, index) => ({
  id: `S${index + 1}`,
  name: `${genre} Stage`,
  genres: [genre],
}));

// Copie des artistes pour éviter de fausser les résultats
const artistsOriginal = JSON.parse(JSON.stringify(artists2));
const artistsOptimized = JSON.parse(JSON.stringify(artists2));

// Test de l'algorithme pas opti
const startOriginal = performance.now();
assignStages(artistsOriginal, stages);
const endOriginal = performance.now();
console.log(`Temps de l'algorithme original: ${endOriginal - startOriginal} ms`);

// Test de l'algorithme opti
const startOptimized = performance.now();
assignStagesOpti(artistsOptimized, stages);
const endOptimized = performance.now();
console.log(`Temps de l'algorithme optimisé: ${endOptimized - startOptimized} ms`);