import React, { useState } from "react";
import CharacterTable from "../../components/character-table/CharacterTable";

const LandingPage: React.FC = () => {
   const [page, setPage] = useState(1);

   // Pagination handlers
   const handlePrevious = () => {
      if (page > 1) setPage(page - 1);
   };

   const handleNext = () => {
      setPage(page + 1);
   };

   return (
       <div style={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
          <h1>Character Overview</h1>

          <CharacterTable page={page} />

          <div style={{ marginTop: '20px' }}>
             <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
             <button onClick={handleNext} style={{ marginLeft: '10px' }}>Next</button>
          </div>
       </div>
   );
};

export default LandingPage;
