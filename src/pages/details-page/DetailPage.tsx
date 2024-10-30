import { useParams } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams();

  return <div>Character ID: {id}</div>;
}

export default DetailPage;
