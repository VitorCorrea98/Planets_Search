import React, { useEffect, useState } from 'react';
import {
  APIType, ColumnListInitial,
  FilterFormInitialValue, FilterFormType, OrderType } from './type';
import TablePlanets from './components/TablePlanets';
import PlanetContext from './context/myContext';
import FormFilter from './components/FormFilter';
import filterColumn from './services/filterColumn';
import sortFilter from './services/sortFilter';

function App() {
  const [planetsList, setPlanetsList] = useState<APIType[]>([]);
  const [backUpList, setBackUpList] = useState<APIType[]>([]);
  const [filtersList, setFiltersList] = useState<FilterFormType[]>([]);
  const [formData, setFormData] = useState<FilterFormType>(FilterFormInitialValue);
  const [columnList, setColumnList] = useState(ColumnListInitial);
  const [order, setOrder] = useState<OrderType>({ column: 'population', sort: '' });

  const APIFetch = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const data: APIType[] = results;
      data.forEach((planet) => delete planet.residents);
      setPlanetsList(data);
      setBackUpList(data);
    } catch (error) {
      return error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, id } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOrderChange = (e:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const newList = backUpList
        .filter((element) => element.name.includes(e.target.value));
      setPlanetsList(newList);
    } else {
      setPlanetsList(backUpList);
    }
  };

  const handleClickOrder = () => {
    const sortPlanetList = sortFilter(planetsList, order);
    setPlanetsList(sortPlanetList);
  };

  const checkColumn = (column: string) => {
    const check = columnList.includes(column);
    if (check) {
      setColumnList(columnList.filter((item) => item !== column));
    } else {
      setColumnList([...columnList, column]);
    }
  };

  const handleFilter = (form: FilterFormType, list: APIType[]) => {
    const { column } = form;
    const formFiltered = filterColumn(list, form);
    setPlanetsList(formFiltered);
    checkColumn(column);
  };

  const handleDelete = (form: FilterFormType) => {
    const remainingFilters = filtersList
      .filter((element) => element.column !== form.column);
    setFiltersList(remainingFilters);

    const newPlanetList = remainingFilters
      .reduce((acc, curr) => filterColumn(acc, curr), backUpList);
    setPlanetsList(newPlanetList);

    checkColumn(form.column);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilter(formData, planetsList);
    setFormData({ ...formData, column: columnList[0] });
    setFiltersList((prev) => ([
      ...prev,
      formData,
    ]));
  };

  const deleteAllFilter = () => {
    setFiltersList([]);
    setColumnList(ColumnListInitial);
    setPlanetsList(backUpList);
  };

  useEffect(() => {
    APIFetch();
  }, []);

  return (
    <PlanetContext.Provider
      value={ { planets: { planetsList },
        filters: { filter: filtersList,
          handleChange,
          columnList,
          handleDelete,
          deleteAllFilter,
          handleOrder: handleOrderChange,
        },
        order } }
    >
      <FormFilter
        handleSubmit={ handleSubmit }
        formData={ formData }
        handleName={ handleName }
        handleOrderClick={ handleClickOrder }
      />
      <TablePlanets />
    </PlanetContext.Provider>
  );
}

export default App;
