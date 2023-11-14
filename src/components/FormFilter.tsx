import React, { useContext } from 'react';
import RootContext from '../context/myContext';

type FormFilterProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function FormFilter({ handleSubmit }: FormFilterProps) {
  const { filters:
    { filter: { name, column, comparison, inputValue },
      handleChange } } = useContext(RootContext);
  return (
    <>
      <input
        type="text"
        id="name"
        value={ name }
        onChange={ handleChange }
        data-testid="name-filter"
      />
      <form onSubmit={ handleSubmit }>
        <select id="column" onChange={ handleChange } value={ column }>
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>

        <select id="comparison" onChange={ handleChange } value={ comparison }>
          <option value="maiorQue">maior que</option>
          <option value="menorQue">menor que</option>
          <option value="igual">igual a</option>
        </select>

        <input
          type="number"
          id="inputValue"
          onChange={ handleChange }
          value={ inputValue }
        />
        <button>Enviar</button>
      </form>
    </>
  );
}

export default FormFilter;
