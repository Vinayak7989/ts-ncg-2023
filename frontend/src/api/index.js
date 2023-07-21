import axios from "axios";

export const base_url = "http://localhost:8088";

export const getCountries = async () => {
  let res = [];
  for (let i = 1; i < 419; i++) {
    const { data } = await axios.get(
      `https://api.worldbank.org/v2/country?format=json&page=${i}`
    );
    if (data[1]?.length) res = [...res, ...data[1]];
    else break;
  }
  return res;
};

export const getIndicators = async () => {
  let res = [];
  for (let i = 1; i < 10; i++) {
    const { data } = await axios.get(
      `https://api.worldbank.org/v2/indicator?format=json&page=${i}`
    );
    if (data[1]?.length) res = [...res, ...data[1]];
    else break;
  }
  return res;
};

export const saveView = async (viewData) => {
  const res = await axios.post(`${base_url}/views`, viewData);
  return res;
};

export const editView = async (viewData, id) => {
  const res = await axios.put(`${base_url}/view/${id}`, viewData);
  return res;
};

export const deleteView = async (id) => {
  const res = await axios.delete(`${base_url}/view/${id}`);
  return res;
};
