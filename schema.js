export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!] 
    }
    # the ! means that it cant be null
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
        # now these are the achors to the different resources to this resource 
        # so for that we actually have to reflect it to the resolver function also 
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!] # see how there is now ! outside it means the reviews can be 
        # empty list
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review # this is just to return a specific review and also to show how to add query variable 
        # you can check that the variable is also need to specified type 
        # so  for that we also have to add it in the resolver function 
        games: [Game]
        game(id: ID!): Game # this is just to return a specific game
        authors: [Author]
        author(id: ID!): Author # this is just to return a specific author
    }

` 