import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";


// imports
import hero from "../assets/images/hero-img.jpg";
import Button from "@restart/ui/esm/Button";
import api from "../apis/api";

function Blog() {
  const { loggedInUser } = useContext(AuthContext);
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
    {loggedInUser.user.role === "ADMIN" ?       <div className="container container-fluid">
        <Link to="/AddPost">
          <Button className="btn btn-primary ms-2 mb-4 mt-4">
            Add a Blog Post
          </Button>
        </Link>
      </div> : null}
      {postList.map((item) => {
        return (
          <Link to={`/blog/${item._id}`} className="text-decoration-none text-dark" key={item._id}>
            <div className="card mb-3">
              <img src={item.image} className="card-img-top img-fluid mh-100 " alt="..."  style={{width: "1300px"}} />
              <div className="card-body">
                <h1 className="card-title text-center">{item.title}</h1>
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
      }).reverse()}
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
