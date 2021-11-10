import { useHttp } from "../hooks/http.hook";
import { ifDataIsEmpty } from "../utils/ifDataIsEmpty";
import { ifDataIsZero } from "../utils/ifDataIsZero";

import {
  _apiBase,
  _apiKey,
  _apiCharacters,
  _apilimit,
  _apiOffset,
  _apiComics,
} from "../constants/fetchConstants";

export const useGetMarvelData = () => {
  const { loading, request, error, clearError } = useHttp();

  const oneChar = async (id) => {
    const resp = await request(`${_apiBase}${_apiCharacters}/${id}?${_apiKey}`);
    return {
      name: ifDataIsEmpty(resp.data.results[0].name),
      description: ifDataIsEmpty(resp.data.results[0].description),
      img: `${resp.data.results[0].thumbnail.path}.${resp.data.results[0].thumbnail.extension}`,
      homePage: resp.data.results[0].urls[0].url,
      wiki: resp.data.results[0].urls[1].url,
      comics: resp.data.results[0].comics.items,
    };
  };

  const allChar = async (limit, offset) => {
    const resp = await request(
      `${_apiBase}${_apiCharacters}?${_apilimit}${limit}&${_apiOffset}${offset}&${_apiKey}`
    );

    return resp.data.results.map((item) => {
      return {
        id: item.id,
        name: ifDataIsEmpty(item.name),
        img: `${item.thumbnail.path}.${item.thumbnail.extension}`,
      };
    });
  };

  const oneComic = async (id) => {
    const resp = await request(`${_apiBase}${_apiComics}/${id}?${_apiKey}`);

    return {
      id: resp.data.results[0].id,
      name: ifDataIsEmpty(resp.data.results[0].title),
      img: `${resp.data.results[0].thumbnail.path}.${resp.data.results[0].thumbnail.extension}`,
      price: ifDataIsZero(resp.data.results[0].price),
      description: ifDataIsEmpty(resp.data.results[0].description),
      pages: resp.data.results[0].pageCount,
      language: resp.data.results[0].textObjects.language || "en-us",
    };
  };

  const allComics = async (limit, offset) => {
    const resp = await request(
      `${_apiBase}${_apiComics}?${_apilimit}${limit}&${_apiOffset}${offset}&${_apiKey}`
    );

    return resp.data.results.map((item) => {
      return {
        id: item.id,
        name: ifDataIsEmpty(item.title),
        img: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        price: ifDataIsZero(item.prices.price),
      };
    });
  };

  return { loading, error, clearError, oneChar, allChar, oneComic, allComics };
};
