import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/service";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import config from "../config/config";
export default function Post() {
  const [post, setPost] = useState(null);

  //TODO:   useParams() → to get the slug from the URL
  const { slug } = useParams();
  const navigate = useNavigate();
  //Get the current user
  const userData = useSelector((state) => state.auth.userData);
  //TODO: Check if current user is the author to only show him edit and delete buttons
  //Only if post and userData are available
  //Compares post's userId with logged-in user’s ID
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative   border-white p-2">
          <a
            href={service.getFileView(post.featuredImage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              // src={service.getFilePreview(
              //   post.featuredImage,
              //   config.appwriteBucketId,
              //   2000, // width
              //   2000, // height
              //   "top", // gravity
              //   100 // quality
              // )}
              src={service.getFileView(
                post.featuredImage,
                config.appwriteBucketId
              )}
              alt={post.title}
              className="rounded-xl max-w-lg max-h-96 object-cover shadow"
              style={{ background: "#f9f9f9" }}
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = "/placeholder.jpg"; // use a safe fallback
              // }}
            />
          </a>
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor=" bg-indigo-300 " className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor=" bg-indigo-300" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
