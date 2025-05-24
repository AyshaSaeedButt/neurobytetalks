import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/service";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
