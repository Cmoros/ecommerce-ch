import ItemDetailContainer from "layout/ItemDetailContainer";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  return (
    <>
      {id ? <ItemDetailContainer id={id} /> : <p>No se encontró el producto</p>}
    </>
  );
};

export default Detail;
