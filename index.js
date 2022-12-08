import {
  estadisticasPokemonSegunNumero,
  numeroPokemonSegunNombre,
  pokemonesSegun2Tipos,
  pokemonsSegunNumeros,
  sumaTotalPokemonesPorTipo,
  verificarPokemonPoseeTipo,
} from './utils/helpers.js';

(async function () {
  //* Suma total de pokemones por tipo, debe recibir el tipo en string

  const resultSumaTotal = await sumaTotalPokemonesPorTipo('normal');
  console.log(`Suma total: ${resultSumaTotal}`);

  //* Dado 2 tipos de pokémon retornar todos los pokemones que cumplen con esos 2 tipos.

  const resultTotalPokemonesTipos = await pokemonesSegun2Tipos([
    'normal',
    'fighting',
  ]);
  console.log(resultTotalPokemonesTipos);
  // resultTotalPokemonesTipos.forEach(({ name, pokemon }) => {
  //   console.log(`***Tipo Pokemon: ${name}*** \n`);
  //   pokemon.forEach(({ pokemon }) => {
  //     console.log(`Nombre Pokemon: ${pokemon.name}`);
  //   });
  // });

  // *Dado el nombre de un pokémon retornar el número del mismo.

  const resultNumeroPokemon = await numeroPokemonSegunNombre('bulbasaur');
  console.log(` numero del pokemon (ID): ${resultNumeroPokemon}`);

  // *Dado el número de un pokémon retornar un objeto con sus 6 stats base.

  const resultEstadisticasPokemon = await estadisticasPokemonSegunNumero(1);
  console.log(resultEstadisticasPokemon);

  // *Realizar una función que reciba un arreglo de números (Ids de pokémon) y un
  // *ordenador y retorne los pokémon en un arreglo con su nombre, tipo y peso
  // *ordenados según se indique por la función por uno de estos 3 indicadores

  const resultPokemonesOrdenados = await pokemonsSegunNumeros(
    [1, 2, 3, 4],
    'name'
  );
  console.log(resultPokemonesOrdenados);

  // *Recibir un número y un tipo (de pokémon) y retornar un true o false si el
  // *pokémon de ese número posee este tipo.

  const resultPokemonPoseeTipo = await verificarPokemonPoseeTipo(1, 'normal');
  console.log(resultPokemonPoseeTipo);
})();
