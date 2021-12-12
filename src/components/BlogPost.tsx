import React from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import Container from "./Container";

const BlogPost: React.FC = () => {
  const location = useLocation();
  const match = useRouteMatch();
  console.log(match);
  

  return (
    <Container>
      <div className="pt-32">
xs
      </div>
    </Container>
  );
}

export default BlogPost;