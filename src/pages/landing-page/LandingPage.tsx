import React from 'react';
import CharacterTable from '../../components/character-table/CharacterTable';

function LandingPage() {
  return (
    <div style={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
      <h1>Character Overview</h1>
      <CharacterTable />
    </div>
  );
}

export default LandingPage;
