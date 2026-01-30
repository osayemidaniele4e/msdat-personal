import axios from 'axios';

const BASE = 'https://msdat-api.fmohconnect.gov.ng/api';
// const BASE2 = "https://msdat2api.e4eweb.space/api";
// const DATABASE = "https://msdat-fmoh-default-rtdb.firebaseio.com/custom/public";

export function getIndicators() {
  const url = `${BASE}/indicators?size=3000`;
  return axios.get(url);
}

export function getDatasources() {
  const url = `${BASE}/datasources?size=1500`;
  return axios.get(url);
}

export function getValueTypes() {
  const url = `${BASE}/valuetypes/?size=1500`;
  return axios.get(url);
}

export function getLocations() {
  const url = `${BASE}/location/?size=1500`;
  return axios.get(url);
}

export function getData(payload) {
  if (payload.url) {
    return axios.get(payload.url.replace('http', 'https'));
  }
  const payloadCopy = { ...payload };
  delete payloadCopy.url;
  let query = 'ordering=-updated_at&size=100000';
  Object.keys(payload).forEach((param) => {
    if (Object.prototype.hasOwnProperty.call(payload, param)) {
      query += `&${param}=${payload[param]}`;
    }
  });
  const url = `${BASE}/data/?${query}`;
  return axios.get(url);
}

export function updateData(payload) {
  const url = `${BASE}/data/${payload.id}`;
  return axios.patch(url, payload);
}

export function deleteData(id) {
  const url = `${BASE}/data/${id}`;
  return axios.delete(url);
}

export function saveDashboard(payload) {
  if (payload.id) {
    const url = `${BASE}/dashboards/${payload.id}/`;
    const payloadCopy = { ...payload };
    delete payloadCopy.id;
    return axios.put(url, payloadCopy);
  }
  const payloadCopy = { ...payload };
  delete payloadCopy.id;
  const url = `${BASE}/dashboards/`;
  return axios.post(url, payloadCopy);
}

export function deleteDashboard(id) {
  const url = `${BASE}/dashboards/${id}/`;
  return axios.delete(url);
}

export function getDashboards() {
  const url = `${BASE}/dashboards`;
  return axios.get(url);
}

// not currently in use
export function getDashboard(id) {
  const url = `${BASE}/dashboards/${id}`;
  return axios.get(url);
}
