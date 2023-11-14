import React, { useEffect, useState } from 'react';
import './App.css';
import { APIType, FilterFormInitialValue, FilterFormType } from './type';
import TablePlanets from './components/TablePlanets';
import PlanetContext from './context/myContext';
import FormFilter from './components/FormFilter';

function App() {
  const [planetsList, setPlanetsList] = useState<APIType[]>([]);
  const [backUpList, setBackUpList] = useState<APIType[]>([]);
  const [filtersList, setFiltersList] = useState<FilterFormType[]>([]);
  const [formData, setFormData] = useState<FilterFormType>(FilterFormInitialValue);

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

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const newList = backUpList
        .filter((element) => element.name.includes(e.target.value));
      setPlanetsList(newList);
    } else {
      setPlanetsList(backUpList);
    }
  };

  const handleFilter = () => {
    const { column, comparison, inputValue } = formData;
    const formFiltered = backUpList.filter((planet: any) => {
      const columnToBeFiltered = planet[column];
      switch (comparison) {
        case 'maior que':
          return Number(columnToBeFiltered) > Number(inputValue);
        case 'menor que':
          return Number(columnToBeFiltered) < Number(inputValue);
        case 'igual':
          return Number(columnToBeFiltered) === Number(inputValue);
        default:
          return false;
      }
    });
    setPlanetsList(formFiltered);
    setFiltersList((prev) => ([
      ...prev,
      formData,
    ]));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilter();
  };

  useEffect(() => {
    APIFetch();
  }, []);

  return (
    <PlanetContext.Provider
      value={ { planets: { planetsList },
        filters: { filter: filtersList, handleChange } } }
    >
      <FormFilter
        handleSubmit={ handleSubmit }
        formData={ formData }
        handleName={ handleName }
      />
      <TablePlanets />
    </PlanetContext.Provider>
  );
}

export default App;
