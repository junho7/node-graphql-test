// import { ApolloServer, gql } from "apollo-server";
const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');

function parseRestaurantMenu(menuText) {
  const menu = {};

  const lines = menuText.split("\n");
  let currentCategory = null;
  let tempDescription = null;

  for (const line of lines) {
    if (line.startsWith("-") && line.endsWith("-")) {
      if (currentCategory !== null) {
        menu[currentCategory] = tempDescription;
        tempDescription = null;
      }
      currentCategory = line.slice(1, -1).toLowerCase().replace(/\s/g, "_");
    } else {
      if (tempDescription !== null) {
        tempDescription += line;
      } else {
        tempDescription = line;
      }
    }
  }

  return menu;
}

let menuText;
try {
  menuText = fs.readFileSync("menu.txt", "utf8");
} catch (error) {
  console.error("Error reading menu file:", error);
  process.exit(1);
}

const typeDefs = gql`
  type Category {
    name: String
    description: String
  }

  type Query {
    menu(name: String!): Category
  }
`;

const resolvers = {
  Query: {
    menu: (parent, args, context, info) => {
      const { name } = args;
      const parsedMenu = parseRestaurantMenu(menuText);
      const description = parsedMenu[name] || "";
      return { name, description };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

module.exports = { typeDefs, resolvers };