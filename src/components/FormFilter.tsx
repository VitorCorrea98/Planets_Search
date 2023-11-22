import React, { useContext } from 'react';
import RootContext from '../context/myContext';
import { ColumnListInitial, FilterFormType } from '../type';

type FormFilterProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FilterFormType;
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderClick: () => void
};

function FormFilter({
  handleSubmit, formData, handleName, handleOrderClick }: FormFilterProps) {
  const { filters: { handleChange, columnList, handleOrder },
    order } = useContext(RootContext);
  const { column, comparison, inputValue } = formData;
  const { column: columnSort } = order;
  return (
    <header className="flex flex-col items-center bg-slate-600">
      <label htmlFor="name" className="p-2">
        Pesquise o nome de um planeta:
        {' '}
        <input
          type="text"
          id="name"
          onChange={ handleName }
          data-testid="name-filter"
          className="outline-none"
        />
      </label>
      <form onSubmit={ handleSubmit }>
        <select
          id="column"
          onChange={ handleChange }
          value={ column }
          data-testid="column-filter"
        >
          {columnList.map((item) => (
            <option value={ item } key={ item }>{item}</option>
          ))}
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
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

        <select
          name="column"
          id="columnSort"
          onChange={ handleOrder }
          value={ columnSort }
          data-testid="column-sort"
        >
          {ColumnListInitial.map((item) => (
            <option value={ item } key={ item }>{item}</option>
          ))}
        </select>

        <div className="flex ">
          <label htmlFor="asc">
            Ascendente
            <input
              type="radio"
              name="sort"
              id="asc"
              value="ASC"
              onChange={ handleOrder }
              data-testid="column-sort-input-asc"
            />
          </label>
          <label htmlFor="dsc">
            Descendente
            <input
              type="radio"
              name="sort"
              id="dsc"
              value="DESC"
              onChange={ handleOrder }
              data-testid="column-sort-input-desc"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={ handleOrderClick }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>

      </form>
    </header>
  );
}

export default FormFilter;
