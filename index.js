import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js'
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        authors() {
            return db.authors
        },
        reviews() {
            return db.reviews
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id)
        },
        author(_, args) {
            return db.authors.find((author) => author.id == args.id)
        },
        review(_, args) {
            // return db.reviews.filter((review) => review.id === args.id)[0]
            return db.reviews.find((review) => review.id === args.id)
        }
    }
    // now to get connected componenet 
    // we need to enter the entry point to that also 
    // query ExampleQuery($reviewId: ID!) {
            // review(id: $reviewId) {
            //     content,
            //     rating
            //     game {
            //           platform
            //      }
            // }
    // }
    // you can see where for Query entry we created the resolver for each scenario
    // now inside the nested query game is another entry point cause 
    ,
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    }
    , 
    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        }
    }

    
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
  
console.log(`🚀  Server ready at: ${url}`);