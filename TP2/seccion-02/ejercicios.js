// 1. Función Suma
function sumar(a, b) {
  return a + b;
}
console.log("--- Ejercicio 1 ---");
console.log("Suma (5 + 3):", sumar(5, 3));
console.log("Suma (10 + 20):", sumar(10, 20));

// 2. Función que Multiplica
function multiplicar(a, b) {
  return a * b;
}
console.log("\n--- Ejercicio 2 ---");
console.log("Multiplicación (4 * 6):", multiplicar(4, 6));
console.log("Multiplicación (7 * 8):", multiplicar(7, 8));

// 3. Función con Parámetro por Defecto
function saludar(nombre = "Invitado") {
  return `Hola, ${nombre}`;
}
console.log("\n--- Ejercicio 3 ---");
console.log(saludar("Axel"));
console.log(saludar());

// 4. Función que Devuelve un Objeto
function crearPersona(nombre, edad) {
  return { nombre, edad };
}
console.log("\n--- Ejercicio 4 ---");
console.log(crearPersona("Axel", 19));

// 5. Función que Modifica un Objeto
function actualizarEdad(persona, nuevaEdad) {
  persona.edad = nuevaEdad;
  return persona;
}
console.log("\n--- Ejercicio 5 ---");
const p = { nombre: "Carlos", edad: 25 };
console.log("Antes:", p);
actualizarEdad(p, 30);
console.log("Después:", p);

// 6. Función Recursiva (Factorial)
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
console.log("\n--- Ejercicio 6 ---");
console.log("Factorial de 5:", factorial(5));

// 7. Función con Función Interna
function despedir() {
  function adios() {
    return "¡Adiós, hasta luego!";
  }
  return adios();
}
console.log("\n--- Ejercicio 7 ---");
console.log(despedir());

// 8. Función que Usa Otra Función
function procesarArray(array, fn) {
  let resultado = [];
  for (let i = 0; i < array.length; i++) {
    resultado.push(fn(array[i]));
  }
  return resultado;
}
console.log("\n--- Ejercicio 8 ---");
const numeros = [1, 2, 3, 4];
const duplicados = procesarArray(numeros, function (n) {
  return n * 2;
});
console.log("Array original:", numeros);
console.log("Array multiplicado por 2:", duplicados);

// 9. Función que Devuelve Otra Función
function crearMultiplicador(x) {
  return function (numero) {
    return numero * x;
  };
}
console.log("\n--- Ejercicio 9 ---");
const doble = crearMultiplicador(2);
console.log("Aplicar duplicador a 5:", doble(5));

// 10. Función Anónima asignada a una variable
const sumarAnonima = function (a, b) {
  return a + b;
};
console.log("\n--- Ejercicio 10 ---");
console.log("Suma anónima (10 + 20):", sumarAnonima(10, 20));
