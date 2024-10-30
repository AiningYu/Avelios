import React from 'react';
import CharacterTable from '../../components/characters-table/CharacterTable';

function LandingPage() {
  return (
    <div style={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
      <h1 >Character Overview</h1>
      <div style={{margin: '60px', textAlign: 'center'}}>
        <CharacterTable />
      </div>

    </div>
  );
}

export default LandingPage;
