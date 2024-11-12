export type Person = {
  gender: string;
  eyeColor: string;
  species?: {
    name: string;
  };
};

export type AllPeopleData = {
  allPeople: {
    people: Person[];
  };
};

export type Film = {
  title: string;
};

export type AllFilmsData = {
  allFilms: {
    films: Film[];
  };
};