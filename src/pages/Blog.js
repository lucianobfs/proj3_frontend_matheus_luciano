import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// imports
import hero from "../assets/images/hero-img.jpg";
import Button from "@restart/ui/esm/Button";
import api from "../apis/api";

function Blog() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/blog");

        setPostList(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPosts();
  }, []);

  console.log(postList);

  return (
    <div className="container container-fluid">
      {postList.map((item) => {
        return (
          <Link to={`/${item._id}`} className="text-decoration-none text-dark">
            <div className="card mb-3">
              <img src={item.image} className="card-img-top img-fluid mh-100 " alt="..."  style={{width: "1300px"}} />
              <div className="card-body">
                <h1 className="card-title text-center">{item.title}</h1>
                <p className="card-text">{item.body}</p>
                <p className="card-text">
                  <Link
                    to={`/${item._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <small className="text-muted">Read More</small>
                  </Link>
                </p>
              </div>
              <div className="card-footer">
                  <small className="text-muted">
                    {item.date.split("T")[0]}
                  </small>
                </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Blog;

{
  /* <Link to={`/${item._id}`} className="text-decoration-none text-dark">
<div className="align-items-center">
  <div className="card text-center">
    <img src={item.image} className="card-img-top" alt="..." />
    <div className="card-body">
      <h3 className="card-title">{item.title}</h3>
      <p className="card-text">{item.body}</p>
    </div>
    <div className="card-footer">
      <small className="text-muted">
        {item.date.split("T")[0]}
      </small>
    </div>
  </div>
</div>
</Link> */
}
