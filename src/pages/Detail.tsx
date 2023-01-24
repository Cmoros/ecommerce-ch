import ItemDetailContainer from "layout/ItemDetailContainer";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "./404";

const Detail = () => {
  const { id } = useParams();

  return id ? (
    <ItemDetailContainer id={id} />
  ) : (
    <NotFoundPage>
      ID not provided. Did you mean <Link to="/">Home Page</Link>?
    </NotFoundPage>
  );
};

export default Detail;
