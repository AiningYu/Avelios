type CharacterNode = {
    id: string;
    name: string;
    height: string;
    mass: string;
    homeworld?: { name: string };
    species?: { name: string };
    gender: string;
    eyeColor: string;
};

type CharacterEdge = {
    node: CharacterNode;
    cursor: string;
};