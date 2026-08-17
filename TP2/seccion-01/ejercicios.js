// 1. Creación de un Objeto Básico
const libro = {
  titulo: "El Principito",
  autor: "Antoine de Saint-Exupéry",
  añoDePublicacion: 1943,
};
console.log("--- Ejercicio 1 ---");
console.log("Título:", libro.titulo);
console.log("Autor:", libro.autor);
console.log("Año:", libro.añoDePublicacion);

// 2. Anidación de Objetos
const estudiante = {
  nombre: "Axel",
  edad: 20,
  direccion: {
    calle: "Calle Falsa 123",
    ciudad: "Concepción del Uruguay",
    pais: "Argentina",
  },
};
console.log("\n--- Ejercicio 2 ---");
console.log("Nombre:", estudiante.nombre);
console.log("Edad:", estudiante.edad);
console.log("Dirección completa:", estudiante.direccion);

// 3. Métodos en Objetos
libro.descripcion = function () {
  return `El libro '${this.titulo}' fue escrito por ${this.autor}.`;
};
console.log("\n--- Ejercicio 3 ---");
console.log(libro.descripcion());

// 4. Iteración sobre Propiedades de un Objeto
const producto = {
  nombre: "Laptop",
  precio: 800,
  disponible: true,
};
console.log("\n--- Ejercicio 4 ---");
for (let prop in producto) {
  console.log(`${prop}: ${producto[prop]}`);
}

// 5. Actualización de Propiedades
producto.precio = 950;
console.log("\n--- Ejercicio 5 ---");
console.log("Producto actualizado:", producto);

// 6. Comprobación de Propiedades
function tienePropiedad(obj, cadena) {
  return Object.prototype.hasOwnProperty.call(obj, cadena);
}
console.log("\n--- Ejercicio 6 ---");
console.log(
  "¿Tiene la propiedad 'precio'?:",
  tienePropiedad(producto, "precio"),
);
console.log("¿Tiene la propiedad 'stock'?:", tienePropiedad(producto, "stock"));

// 7. Eliminación de Propiedades
console.log("\n--- Ejercicio 7 ---");
console.log("Antes de eliminar:", producto);
delete producto.disponible;
console.log("Después de eliminar:", producto);

// 8. Combinar Objetos
const persona1 = { nombre: "Axel", rol: "Estudiante" };
const persona2 = { carrera: "Licenciatura en Sistemas", anio: 3 };
const personaCombinada = Object.assign({}, persona1, persona2);
console.log("\n--- Ejercicio 8 ---");
console.log("Objeto combinado:", personaCombinada);

// 9. Copiar Objetos
const copiaEstudiante = JSON.parse(JSON.stringify(estudiante));
copiaEstudiante.nombre = "Carlos"; // Modificamos la copia
console.log("\n--- Ejercicio 9 ---");
console.log("Original:", estudiante.nombre);
console.log("Copia modificada:", copiaEstudiante.nombre);

// 10. Métodos Getters y Setters
const libroConGetSet = {
  _titulo: "Fahrenheit 451",
  _autor: "Ray Bradbury",
  _anio: 1953,

  get añoDePublicacion() {
    return this._anio;
  },
  set añoDePublicacion(nuevoAnio) {
    this._anio = nuevoAnio;
  },
};
console.log("\n--- Ejercicio 10 ---");
console.log("Año original (Getter):", libroConGetSet.añoDePublicacion);
libroConGetSet.añoDePublicacion = 2026; // Usamos el Setter
console.log("Año actualizado (Getter):", libroConGetSet.añoDePublicacion);
