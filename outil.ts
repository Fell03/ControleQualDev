type TestFunction = (...args: any[]) => any;

interface Algorithm {
  name: string;
  func: TestFunction;
}

class PerformanceTester {
  private testSuites: Map<string, { algorithms: Algorithm[], iterations: number }> = new Map();

  // Créer une suite de tests
  createTestSuite(name: string, iterations: number = 1000) {
    this.testSuites.set(name, { algorithms: [], iterations });
  }

  // Ajouter une version d'algorithme à une suite
  addAlgorithm(testSuiteName: string, name: string, func: TestFunction) {
    const suite = this.testSuites.get(testSuiteName);
    if (!suite) {
      console.error(`Suite de test '${testSuiteName}' introuvable.`);
      return;
    }
    suite.algorithms.push({ name, func });
  }

  // Exécuter les tests
  runTests(testSuiteName: string, ...args: any[]) {
    const suite = this.testSuites.get(testSuiteName);
    if (!suite) {
      console.error(`Suite de test '${testSuiteName}' introuvable.`);
      return;
    }

    console.log(`🔬 Exécution des tests pour '${testSuiteName}' (${suite.iterations} itérations)...`);
    
    let results: { name: string; avgTime: number }[] = [];

    for (const { name, func } of suite.algorithms) {
      let totalTime = 0;

      for (let i = 0; i < suite.iterations; i++) {
        const start = performance.now();
        func(...args);
        const end = performance.now();
        totalTime += (end - start);
      }

      const avgTime = totalTime / suite.iterations;
      results.push({ name, avgTime });

      console.log(`⚡ ${name}: ${avgTime.toFixed(4)} ms`);
    }

    // Trier les résultats
    results.sort((a, b) => a.avgTime - b.avgTime);

    console.log(`🏆 Version la plus rapide: ${results[0].name} (${results[0].avgTime.toFixed(4)} ms)`);
    console.log(`🐢 Version la plus lente: ${results[results.length - 1].name} (${results[results.length - 1].avgTime.toFixed(4)} ms)`);
  }
}

// Création de l'outil de test
const tester = new PerformanceTester();

// Ajout d'une suite de test "ContainsDuplicate"
tester.createTestSuite("Contains Duplicate", 1000);
tester.addAlgorithm("Contains Duplicate", "Bruteforce", function containsDuplicate(array: number[]) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
});
tester.addAlgorithm("Contains Duplicate", "Set Optimized", function containsDuplicateSet(array: number[]) {
  return new Set(array).size !== array.length;
});

// Ajout d'une suite de test "Common Elements"
tester.createTestSuite("Common Elements", 100);
tester.addAlgorithm("Common Elements", "Bruteforce", function findCommonElements(array1: number[], array2: number[]) {
  let commonElements: number[] = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        commonElements.push(array1[i]);
      }
    }
  }
  return commonElements;
});
tester.addAlgorithm("Common Elements", "Set Optimized", function findCommonElementsSet(array1: number[], array2: number[]) {
  const set1 = new Set(array1);
  return array2.filter(x => set1.has(x));
});

// Ajout d'une suite de test "Fibonacci"
tester.createTestSuite("Fibonacci", 30);
tester.addAlgorithm("Fibonacci", "Recursive", function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
tester.addAlgorithm("Fibonacci", "Memoized", function fibonacciMemoized(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  memo.set(n, result);
  return result;
});

// Données de test
const testArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
const testArray2 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

// Lancement des tests
tester.runTests("Contains Duplicate", testArray);
tester.runTests("Common Elements", testArray, testArray2);
tester.runTests("Fibonacci", 30);
