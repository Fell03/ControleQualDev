//version pas opti

interface Artist {
    id: string;
    name: string;
}
  
function findArtistIndex(artists, name) {
    for (let i = 0; i < artists.length; i++) {
      if (artists[i].name === name) {
        return artists[i].id;
      }
    }
    return -1;
}

//version opti, recherche dichotomique

function findArtistIndexOpti(artists, name) {
  let left = 0;
  let right = artists.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midName = artists[mid].name;

    if (midName === name) {
      return artists[mid].id;
    } else if (midName < name) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// Tableau fixe de 100 000 artistes triés
const artists: Artist[] = [];
// Artiste à rechercher
const targetArtist = artists[75000].name; // Un artiste vers la fin du tableau

// Test de la recherche pas opti
const startLinear = performance.now();
const resultLinear = findArtistIndexOpti(artists, targetArtist);
const endLinear = performance.now();
console.log(`Recherche pas opti : ${endLinear - startLinear} ms, ID trouvé : ${resultLinear}`);

// Test de la recherche opti
const startBinary = performance.now();
const resultBinary = findArtistIndexOpti(artists, targetArtist);
const endBinary = performance.now();
console.log(`Recherche opti : ${endBinary - startBinary} ms, ID trouvé : ${resultBinary}`);
