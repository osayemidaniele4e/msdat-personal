import instance from '@/config/axios';

type selectType = { [key: string]: string | number };

const getDataSources = async (id?: number) => {
  const urlSource = `datasources/${id || '?size=1000'}`;
  try {
    const { data } = await instance.get(urlSource);
    if (id) {
      return data;
    }
    const dataArray = await data.results.map((el: selectType) => ({
      id: el.id,
      name: el.datasource,
    }));
    return dataArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPeriodsByDs = async (id: number) => {
  try {
    const response = await getDataSources(id);
    console.log(response.year_available, 'hello');
    // const { data } = await instance.get(urlSource);
    // const dataArray = await data.results.map((el: selectType) => ({
    //   id: el.id,
    //   name: el.datasource,
    // }));
    // console.log(dataArray);
    // return dataArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getDataSources, getPeriodsByDs };
