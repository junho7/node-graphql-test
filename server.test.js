const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { typeDefs, resolvers } = require('./server.js');

const server = new ApolloServer({ typeDefs, resolvers });

const { query } = createTestClient(server);

describe('GraphQL Resolver Tests', () => {
  test('should return correct menu for valid name', async () => {
    const GET_MENU_QUERY = gql`
      query GetMenu($name: String!) {
        menu(name: $name) {
          name
          description
        }
      }
    `;
    
    const variables = { name: 'tacos' };
    
    const { data, errors } = await query({ query: GET_MENU_QUERY, variables });
    
    expect(errors).toBeUndefined();
    
    expect(data).toEqual({
      menu: {
        name: 'tacos',
        description: 'Served with red rice, black beans, corn & romaine salad, tortilla chips 9.95Beer Battered Fish with Jalapeño Remoulade, Roasted Salsa, CabbageCarne Asada (marinated sirloin) with Guacamole, Tomatillo SalsaCitrus Marinated Chicken with Guacamole, Tomatillo SalsaGrilled Veggie with Zucchini, Yellow Squash, Bell Peppers, Onion, Guacamole, Tomatillo Salsa ',
      }
    });
  });

});
