export interface Species {
  name: string;
}

export interface Person {
  gender: string;
  eyeColor: string;
  species?: Species;
}

export interface AllPeopleData {
  allPeople: {
    people: Person[];
  };
}

export interface Film {
  title: string;
}

export interface AllFilmsData {
  allFilms: {
    films: Film[];
  };
}
