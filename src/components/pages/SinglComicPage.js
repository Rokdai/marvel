import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetMarvelData } from "../../services/getMarvelService";

import { Spiner } from "../spiner/spiner";
import { Error } from "../error/error";

import "./singleComicPage.scss";

export const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comicInfo, setComicInfo] = useState({});
  const { loading, error, oneComic, clearError } = useGetMarvelData();

  useEffect(() => {
    clearError();
    oneComic(comicId).then((resp) => {
      setComicInfo((comicInfo) => {
        return { ...comicInfo, ...resp };
      });
    });
  }, [comicId]);

  const setComicListToJSX = () => {
    return (
      <>
        <img src={comicInfo.img} alt="x-men" className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{comicInfo.name}</h2>
          <p className="single-comic__descr">{comicInfo.description}</p>
          <p className="single-comic__descr">{comicInfo.pages} pages</p>
          <p className="single-comic__descr">Language: {comicInfo.language}</p>
          <div className="single-comic__price">{comicInfo.price}</div>
        </div>
      </>
    );
  };

  const checkComicList = () => {
    if (loading) {
      return <Spiner />;
    } else if (error) {
      return <Error />;
    } else {
      return setComicListToJSX();
    }
  };

  return (
    <div className="single-comic">
      {checkComicList()}
      <Link to="/comicsList" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};
