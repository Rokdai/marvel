import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./comicsList.scss";
import { Error } from "../error/error";
import { Spiner } from "../spiner/spiner";
import { Btn } from "../btn/btn";
import { useGetMarvelData } from "../../services/getMarvelService";

export const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [respSettings, setRespSettings] = useState({ limit: 8, offset: 0 });
  const [comicsLoadingEnd, setCComicsLoadingEnd] = useState(false);
  const [newComicsLoading, setNewComicsLoading] = useState(false);

  const { loading, error, clearError, allComics } = useGetMarvelData();

  useEffect(() => {
    getData(true);
  }, []);

  const getData = (initail) => {
    initail ? setNewComicsLoading(false) : setNewComicsLoading(true);

    clearError();
    allComics(respSettings.limit, respSettings.offset).then((resp) => {
      onComicsListLoaded(resp);
    });
  };

  const onComicsListLoaded = (data) => {
    if (data.length < respSettings.limit) {
      setCComicsLoadingEnd(true);
    }

    setComicsList((comicsList) => [...comicsList, ...data]);
    setRespSettings(({ limit, offset }) => {
      return {
        ...respSettings,
        offset: offset + limit,
      };
    });
    setNewComicsLoading(false);
  };

  const checkContent = () => {
    if (loading && !newComicsLoading) {
      return <Spiner />;
    } else if (error) {
      return <Error />;
    } else {
      return setComicsListToJSX();
    }
  };

  const checkAddBtn = () => {
    return comicsLoadingEnd ? null : (
      <Btn
        disabled={newComicsLoading ? true : false}
        onClick={() => getData(false)}
        nameClass={"button__main button__long"}
        text={"load more"}
      />
    );
  };

  const setComicsListToJSX = () => {
    return comicsList.map((item, i) => {
      return (
        <li key={i} className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img src={item.img} alt={item.name} className="comics__item-img" />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="comics__list">
      <ul className="comics__grid">{checkContent()}</ul>
      {checkAddBtn()}
    </div>
  );
};
