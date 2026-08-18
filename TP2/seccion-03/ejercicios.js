// --- EJERCICIO 1: Consumo de Datos desde una API ---
async function obtenerUsuarios() {
  //le avisa a JavaScript que dentro de esta función habrá operaciones que toman su tiempo y que debe esperar por ellas.
  try {
    // Hacemos la petición HTTP GET a la API
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Verificamos si la respuesta fue exitosa (código 200-299)
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    // Convertimos la respuesta a formato JSON (un array de objetos con los usuarios)
    const usuarios = await response.json();

    // Imprimimos la lista completa en la consola
    console.log("--- Lista de Usuarios Obtenidos ---");
    console.log(usuarios);

    return usuarios; // Devolvemos el array por si lo necesitamos usar después
  } catch (error) {
    console.error("Hubo un error al obtener los usuarios:", error.message);
  }
}

// Ejecutamos la función para probarla
obtenerUsuarios();

// --- EJERCICIO 2: Procesamiento de Datos de una API ---
async function imprimirNombresDeUsuarios() {
  try {
    // Llamamos a la función del Ejercicio 1 para traer todos los datos
    const usuarios = await obtenerUsuarios();

    // Si por alguna razón no llegaron usuarios, cortamos acá
    if (!usuarios) return;

    console.log("\n--- Ejercicio 2: Nombres de Usuarios ---");

    // Recorremos el array de usuarios y creamos un nuevo array solo con los nombres
    const nombres = usuarios.map((usuario) => usuario.name);

    // Mostramos la lista de nombres en la consola
    nombres.forEach((nombre) => {
      console.log(`- ${nombre}`);
    });
  } catch (error) {
    console.error("Error al procesar los nombres:", error.message);
  }
}

// Ejecutamos la función del Ejercicio 2
imprimirNombresDeUsuarios();

// --- EJERCICIO 3: Autenticación Simulada ---

// Datos predefinidos que simulan estar guardados en una base de datos
const usuarioSistema = {
  username: "admin",
  password: "123",
};

function autenticarUsuario(credenciales) {
  console.log("\n--- Ejercicio 3: Autenticación Simulada ---");

  // Verificamos si el usuario y la contraseña coinciden con los del sistema
  if (
    credenciales.username === usuarioSistema.username &&
    credenciales.password === usuarioSistema.password
  ) {
    console.log(`Acceso permitido para: ${credenciales.username}`);
    return true; // Autenticación exitosa
  } else {
    console.log("Acceso denegado: Credenciales incorrectas.");
    return false; // Autenticación fallida
  }
}

// Pruebas de la función:
// 1. Caso exitoso
autenticarUsuario({ username: "admin", password: "123" });

// 2. Caso fallido
autenticarUsuario({ username: "admin", password: "wrong_password" });

// --- EJERCICIO 4: Transformación de Datos ---
async function mapearUsuarios() {
  try {
    // Reutilizamos la función del Ejercicio 1 para traer todos los usuarios de la API
    const usuarios = await obtenerUsuarios();

    if (!usuarios) return;

    console.log(
      "\n--- Ejercicio 4: Transformación de Datos (Nombre y Email) ---",
    );

    // Recorremos el array y devolvemos un nuevo objeto reestructurado por cada usuario
    const usuariosSimplificados = usuarios.map((usuario) => {
      return {
        nombre: usuario.name,
        email: usuario.email,
      };
    });

    // Mostramos el nuevo array transformado en la consola
    console.log(usuariosSimplificados);

    return usuariosSimplificados;
  } catch (error) {
    console.error("Error al mapear los usuarios:", error.message);
  }
}

// Ejecutamos la función del Ejercicio 4
mapearUsuarios();

// --- EJERCICIO 5: Validación de Formularios ---
function validarFormulario(datosFormulario) {
  console.log("\n--- Ejercicio 5: Validación de Formularios ---");

  // Verificamos si llegó el objeto y si cada campo tiene texto real
  const { nombre, email, password } = datosFormulario;

  if (
    nombre &&
    nombre.trim().length > 0 &&
    email &&
    email.trim().length > 0 &&
    password &&
    password.trim().length > 0
  ) {
    console.log("Formulario válido: Todos los campos están completos.");
    return true;
  } else {
    console.log("Formulario inválido: Falta completar algún campo.");
    return false;
  }
}

// Pruebas de la función:
// 1. Caso válido
validarFormulario({ nombre: "Axel", email: "axel@mail.com", password: "123" });

// 2. Caso inválido (falta el password o está vacío)
validarFormulario({ nombre: "Axel", email: "axel@mail.com", password: "" });

// --- EJERCICIO 6: Paginación de Datos ---
function obtenerPagina(datos, pagina) {
  const elementosPorPagina = 5;
  const inicio = (pagina - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;

  console.log(`\n--- Ejercicio 6: Paginación (Página ${pagina}) ---`);

  // El método slice corta el array original desde 'inicio' hasta 'fin'
  const paginaActual = datos.slice(inicio, fin);

  console.log(`Mostrando ${paginaActual.length} elementos:`);
  console.log(paginaActual);

  return paginaActual;
}

// Para probarlo, vamos a generar un array de prueba con 12 números (del 1 al 12)
const listaDePrueba = Array.from({ length: 12 }, (_, i) => `Elemento ${i + 1}`);

// Prueba: obtener la página 2 (debería mostrar del elemento 6 al 10)
obtenerPagina(listaDePrueba, 2);

// --- EJERCICIO 7: Envío de Datos a una API ---
async function enviarDatos(dataObjeto) {
  try {
    console.log("\n--- Ejercicio 7: Enviando datos a la API (POST) ---");

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", // Indicamos que es una petición para enviar/crear datos
      headers: {
        "Content-Type": "application/json; charset=UTF-8", // Avisamos que enviamos un JSON
      },
      body: JSON.stringify(dataObjeto), // Transformamos nuestro objeto a texto JSON plano
    });

    // Verificamos si la petición fue exitosa (códigos 200 al 299)
    if (!response.ok) {
      throw new Error(`Error en la petición POST: ${response.status}`);
    }

    // Convertimos la respuesta del servidor a un objeto de JavaScript
    const resultado = await response.json();

    console.log("¡Datos enviados y guardados con éxito!");
    console.log("Respuesta del servidor:", resultado);

    return resultado;
  } catch (error) {
    console.error("Hubo un error al enviar los datos:", error.message);
  }
}

// Prueba de la función enviando un post de ejemplo:
const nuevoPost = {
  title: "Aprendiendo Programación Avanzada",
  body: "Estamos completando los ejercicios de la Sección 03 en UADER.",
  userId: 19,
};

enviarDatos(nuevoPost);

// --- EJERCICIO 8: Búsqueda de Usuarios por Email ---
function buscarUsuarioPorEmail(listaUsuarios, emailBuscado) {
  console.log(
    `\n--- Ejercicio 8: Buscar usuario por email ("${emailBuscado}") ---`,
  );

  // .find() devuelve el primer elemento que cumpla con la condición
  const usuarioEncontrado = listaUsuarios.find(
    (usuario) => usuario.email === emailBuscado,
  );

  if (usuarioEncontrado) {
    console.log("¡Usuario encontrado!", usuarioEncontrado);
  } else {
    console.log("No se encontró ningún usuario con ese email.");
  }

  return usuarioEncontrado;
}

// Prueba con la lista de usuarios de prueba
const usuariosPruebaE8 = [
  { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
  { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" },
];

buscarUsuarioPorEmail(usuariosPruebaE8, "Shanna@melissa.tv");

// --- EJERCICIO 9: Generación de Token de Autenticación ---
function generarToken(usuario) {
  console.log("\n--- Ejercicio 9: Generando Token JWT simulado ---");

  // Convertimos el objeto del usuario a string y lo codificamos a Base64 con btoa
  const datosJson = JSON.stringify({ id: usuario.id, email: usuario.email });
  const tokenSimulado = btoa(datosJson);

  console.log(`Token generado para ${usuario.name}:`, tokenSimulado);
  return tokenSimulado;
}

// Prueba de la función
const usuarioParaToken = {
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
};
generarToken(usuarioParaToken);

// --- EJERCICIO 10: Actualización de Información del Usuario ---
function actualizarUsuario(usuarioOriginal, cambios) {
  console.log("\n--- Ejercicio 10: Actualizando Usuario ---");
  console.log("Usuario antes de actualizar:", usuarioOriginal);

  // Combinamos el objeto original con el objeto de cambios usando spread (...)
  // Las propiedades de 'cambios' pisan o agregan nuevas propiedades al usuario
  const usuarioActualizado = { ...usuarioOriginal, ...cambios };

  console.log("Usuario actualizado con éxito:", usuarioActualizado);
  return usuarioActualizado;
}

// Prueba de la función
const usuarioBase = {
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
  role: "user",
};
const modificaciones = { email: "nuevo.email@test.com", role: "admin" };

actualizarUsuario(usuarioBase, modificaciones);
