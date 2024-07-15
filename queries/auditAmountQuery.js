const auditAmountQuery = (type) => `
  query {
    transaction_aggregate(where: {type: {_eq: "${type}"}}) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

module.exports = auditAmountQuery;