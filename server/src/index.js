require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");
const isEmail = require("isemail");

const EventAPI = require("./datasources/event");
const UserAPI = require("./datasources/user");

const store = createStore();

const dataSources = () => ({
  eventAPI: new EventAPI(),
  userAPI: new UserAPI({ store }),
});

const userContext = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || "";
  const email = Buffer.from(auth, "base64").toString("ascii");

  //Checks valid email, if not valid return null user
  if (!isEmail.validate(email)) return { user: null };

  // find user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: userContext,
  dataSources,
});

server.listen().then(() => {
  console.log(`🚀 Server is Running! 
  👀 Listening on port 4000`);
});
