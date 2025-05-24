import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/service";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-200 rounded-xl shadow-2xl p-4">
        <div className="w-full justify-center mb-4 ">
          <img
            src={service.getFileView(featuredImage)}
            alt={title}
            className="rounded-xl "
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.src = "/placeholder.jpg"; // use a safe fallback
            // }}
          />
        </div>
        <h1 className="text-xl font-serif font-bold"> {title}</h1>
      </div>
    </Link>
  );
}

export default PostCard;
