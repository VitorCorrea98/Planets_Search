import { APIType, FilterFormType } from '../type';

const filterColumn = (
  list: APIType[],
  form: FilterFormType,
) => {
  const { column, comparison, inputValue } = form;
  const formFiltered = list.filter((planet) => {
    const columnToBeFiltered = planet[column as keyof APIType];
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
  return formFiltered;
};

export default filterColumn;
