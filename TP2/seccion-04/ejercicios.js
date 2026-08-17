// 1. Agregar y Eliminar Elementos (push y pop)
let frutas = ["manzana", "banana", "pera"];
frutas.push("naranja"); // Agrega al final
console.log("--- Ejercicio 1 ---");
console.log("Frutas:", frutas);
let frutaEliminada = frutas.pop(); // Elimina el último
console.log("Fruta eliminada:", frutaEliminada);
console.log("Frutas después de eliminar:", frutas);

// 2. Array Bidimensional
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log("\n--- Ejercicio 2 ---");
console.log("Accediendo al elemento 5 (fila 1, columna 1):", matriz[1][1]);

// 3. Iterar sobre un Array
console.log("\n--- Ejercicio 3 ---");
for (let i = 0; i < frutas.length; i++) {
  console.log(`Fruta en índice ${i}:`, frutas[i]);
}

// 4. Uso de map (Elevar al cuadrado)
function elevarAlCuadrado(numeros) {
  return numeros.map((num) => num ** 2);
}
console.log("\n--- Ejercicio 4 ---");
console.log("Al cuadrado [2, 4, 6]:", elevarAlCuadrado([2, 4, 6]));

// 5. Uso de filter (Mayores de un valor)
function filtrarMayoresDe(numeros, referencia) {
  return numeros.filter((num) => num > referencia);
}
console.log("\n--- Ejercicio 5 ---");
console.log(
  "Mayores que 5 en [2, 4, 6, 8, 10]:",
  filtrarMayoresDe([2, 4, 6, 8, 10], 5),
);

// 6. Uso de reduce (Sumar elementos)
function sumarElementos(numeros) {
  return numeros.reduce((acumulador, actual) => acumulador + actual, 0);
}
console.log("\n--- Ejercicio 6 ---");
console.log("Suma de [10, 20, 30]:", sumarElementos([10, 20, 30]));

// 7. Uso de some (Verificar si alguno cumple)
const numerosParaSome = [3, 7, 12, 5];
const hayMayorA10 = numerosParaSome.some((num) => num > 10);
console.log("\n--- Ejercicio 7 ---");
console.log("¿Hay algún número mayor a 10?:", hayMayorA10);

// 8. Uso de every (Verificar si todos cumplen)
const numerosParaEvery = [2, 4, 6, 8];
const todosPositivos = numerosParaEvery.every((num) => num > 0);
console.log("\n--- Ejercicio 8 ---");
console.log("¿Son todos positivos?:", todosPositivos);

// 9. Uso de find (Buscar objeto)
const personas = [
  { nombre: "Ana", edad: 25 },
  { nombre: "Juan", edad: 35 },
  { nombre: "Sofía", edad: 28 },
  { nombre: "Carlos", edad: 40 },
];
const primeraMayor30 = personas.find((p) => p.edad > 30);
console.log("\n--- Ejercicio 9 ---");
console.log("Primera persona mayor de 30:", primeraMayor30);

// 10. Uso de sort (Ordenar alfabéticamente)
const palabras = ["perro", "gato", "elefante", "aguila"];
palabras.sort();
console.log("\n--- Ejercicio 10 ---");
console.log("Palabras ordenadas alfabéticamente:", palabras);
