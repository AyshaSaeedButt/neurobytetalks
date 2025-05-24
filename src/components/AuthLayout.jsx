import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // FIXME:
    // Logic in plain words:
    //
    // authentication	       authStatus                  	What Happens
    // true	                        false	                Not allowed → redirect to /login
    // false	                     true                  	Not allowed → redirect to /
    // Match	                     Match	                Show the content

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  // TODO:
  return loader ? <h1>Loading.........</h1> : <>{children}</>;
}
