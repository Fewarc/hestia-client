import gql from "graphql-tag";

const IMAGE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`;

export default IMAGE_UPLOAD;