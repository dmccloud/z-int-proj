const { gql } = require("apollo-server");

const typeDefs = gql`
  ## Event Schema
  type Event {
    id: ID!
    name: String
    url: String
    image: String
    start: String
    Venue: Venue
    isBooked: Boolean!
  }

  ## Venue Schema
  type Venue {
    name: String
    city: String
    address: String
    lat: Float
    lon: Float
  }

  type User {
    id: ID!
    email: String!
    events: [Event]!
    token: String
  }

  type Query {
    events(pageNum: Int): [Event]!
    event(id: ID!): Event
    me: User
  }

  type Mutation {
    bookEvents(eventIds: [ID]!): EventUpdateResponse!
    cancelEvent(eventId: ID!): EventUpdateResponse!
    login(email: String): User
  }

  type EventUpdateResponse {
    success: Boolean!
    message: String
    events: [Event]
  }
`;

module.exports = typeDefs;
