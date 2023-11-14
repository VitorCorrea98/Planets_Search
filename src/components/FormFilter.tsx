import React, { useContext } from 'react';
import RootContext from '../context/myContext';
import { FilterFormType } from '../type';

type FormFilterProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FilterFormType;
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void
};

function FormFilter({ handleSubmit, formData, handleName }: FormFilterProps) {
  const { filters: { handleChange } } = useContext(RootContext);
  const { column, comparison, inputValue } = formData;
  return (
    <>
      <input
        type="text"
        id="name"
        onChange={ handleName }
        data-testid="name-filter"
      />
      <form onSubmit={ handleSubmit }>
        <select
          id="column"
          onChange={ handleChange }
          value={ column }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          id="comparison"
          onChange={ handleChange }
          value={ comparison }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual">igual a</option>
        </select>

        <input
          type="number"
          id="inputValue"
          onChange={ handleChange }
          value={ inputValue }
          data-testid="value-filter"
        />
        <button data-testid="button-filter">Enviar</button>
      </form>
    </>
  );
}

export default FormFilter;
