import { read } from './httpService';

export async function apiGetAll(rota) {
  const json = await read(`/${rota}`);
  return json;
}
