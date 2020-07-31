import React from "react";

import "./Item.styles.css";

const Item = ({ data, handleDelete }) => {
  return (
    <div className="item">
      <div className="content">
        <p>
          {/* {`${
            data.Title.length >= 20
              ? `${data.Title.substring(0, 20)}...`
              : data.Title
          }`} */}
          {data.Title}
        </p>
        <p>{data.Year}</p>
        <p>{data.imdbID}</p>
        <p>
          <i
            className="fas fa-trash-alt"
            onClick={() => {
              handleDelete(data.imdbID);
            }}
          ></i>
        </p>
      </div>
    </div>
  );
};

export default Item;
