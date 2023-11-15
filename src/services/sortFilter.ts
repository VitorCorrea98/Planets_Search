import { APIType, OrderType } from '../type';

const sortFilter = (list: APIType[], order: OrderType) => {
  const { column, sort } = order;
  const fakeList = list.slice();

  const columnSorted = fakeList.sort((a, b) => {
    const columnToBeSortedA = Number(a[column as keyof APIType]);
    const columnToBeSortedB = Number(b[column as keyof APIType]);
    switch (sort) {
      case 'ASC': {
        if (Number.isNaN(columnToBeSortedB)) {
          return -1;
        }
        return columnToBeSortedA - columnToBeSortedB;
      }

      case 'DESC': {
        if (Number.isNaN(columnToBeSortedB)) {
          return -1;
        }
        return columnToBeSortedB - columnToBeSortedA;
      }

      default:
        return 0;
    }
  });

  return columnSorted;
};

export default sortFilter;
