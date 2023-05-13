const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    }, {
        title: 'Paradoxical Sajid - 2',
        author: 'Arif Azad',
    },
];

const authorResolver = {
    Query: {
        books: () => books,
    },
};

export default authorResolver;