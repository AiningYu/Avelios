import { useParams } from 'react-router-dom';
import CharacterDetail from '../../components/character-details/CharacterDetails.tsx';

function DetailPage() {

  return (
    <div>
      <CharacterDetail/>
    </div>
  );
}

export default DetailPage;