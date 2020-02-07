var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        posts: [Post]
        author(id: Int!): Author
    }
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
`);

const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
  ];
  
  const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
  ];

  const author = (args)=>{
        var  author = authors.filter((author)=>{
               return author.id === args.id
        })[0];
        var post =()=>{
          var post = posts.filter((post)=>{
            return args.id === post.authorId
          })
          return post
        }
        var authorInfo = {
          id : author.id,
          firstName : author.firstName,
          lastName : author.lastName,
          posts : post
        }
        return authorInfo
  }
var root = { 
        posts : posts,
        author :author
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('🚀 Server running at localhost:4000/graphql'));