const userDetailsQuery = `
  query {
    user {
      firstName
      lastName
      auditRatio
    }
  }
`;

module.exports = userDetailsQuery;