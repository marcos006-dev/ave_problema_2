import fetch from 'node-fetch';
export const sumaTotalPokemonesPorTipo = async (tipo) => {
  try {
    if (typeof tipo !== 'string') throw Error('El tipo deberia ser un string');

    const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const { pokemon } = await response.json();

    return pokemon.length;
  } catch (error) {
    console.log(error);
  }
};

export const pokemonesSegun2Tipos = async (tipos) => {
  try {
    if (tipos.length !== 2) throw Error('Se deben enviar 2 tipos de pokemones');

    const resultPokemons = await Promise.all(
      tipos.map(async (tipo) => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
        const { name, pokemon } = await response.json();

        return { name, pokemon };
      })
    );

    return resultPokemons;
  } catch (error) {
    console.log(error);
  }
};

export const numeroPokemonSegunNombre = async (nombre) => {
  try {
    if (typeof nombre !== 'string')
      throw Error('El nombre deberia ser un string');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    const { id } = await response.json();
    return id;
  } catch (error) {
    console.log(error);
  }
};

export const estadisticasPokemonSegunNumero = async (idPokemon) => {
  try {
    if (typeof idPokemon !== 'number')
      throw Error('El idPokemon deberia ser un number');

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );
    const { stats, name } = await response.json();

    return { stats, name };
  } catch (error) {
    console.log(error);
  }
};

export const pokemonsSegunNumeros = async (idsPokemons, indicador = 'name') => {
  try {
    if (idsPokemons.length === 0 || !idsPokemons instanceof Array) {
      throw Error(
        'Se debe enviar almenos un id de pokemon y este debe estar dentro de un array'
      );
    }

    if (!['name', 'type', 'weight'].includes(indicador)) {
      throw Error(
        'Se debe seleccionar 1 de los siguiente indicadores: name, type, weight'
      );
    }

    const resultPokemons = await Promise.all(
      idsPokemons.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const { name, types, weight } = await response.json();

        return { name, types, weight };
      })
    );

    //   ordenar segun nombre
    if (indicador === 'name') {
      const pokemonsOrdenadosPorNombre = resultPokemons.sort(function (a, b) {
        const nombrePokemonA = a.name;
        const nombrePokemonB = b.name;
        if (nombrePokemonA < nombrePokemonB) return -1;
        if (nombrePokemonA > nombrePokemonB) return 1;
        return 0;
      });

      return pokemonsOrdenadosPorNombre;
    }

    //   ordenar segun tipo
    if (indicador === 'type') {
      const pokemonsOrdenadosPorTipo = resultPokemons.sort(function (a, b) {
        const tipoPokemonA = a.types[0].type.name;
        const tipoPokemonB = b.types[0].type.name;
        if (tipoPokemonA < tipoPokemonB) return -1;
        if (tipoPokemonA > tipoPokemonB) return 1;
        return 0;
      });

      return pokemonsOrdenadosPorTipo;
    }

    //   ordenar segun peso
    if (indicador === 'weight') {
      const pokemonsOrdenadosPorPeso = resultPokemons.sort(function (a, b) {
        const pesoPokemonA = a.weight;
        const pesoPokemonB = b.weight;
        if (pesoPokemonA < pesoPokemonB) return -1;
        if (pesoPokemonA > pesoPokemonB) return 1;
        return 0;
      });
      return pokemonsOrdenadosPorPeso;
    }
  } catch (error) {
    console.log(error);
  }
};

export const verificarPokemonPoseeTipo = async (idPokemon, tipo) => {
  try {
    if (typeof idPokemon !== 'number') {
      throw Error('El idPokemon deberia ser un number');
    }

    if (typeof tipo !== 'string') {
      throw Error('El tipo deberia ser un string');
    }

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );
    const { types } = await response.json();
    const resultBusquedaTipo = types.find(({ type }) => type.name === tipo);

    if (!resultBusquedaTipo) return false;

    return true;
  } catch (error) {
    console.log(error);
  }
};
