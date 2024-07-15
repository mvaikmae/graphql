const axios = require('axios');
const userDetailsQuery = require('../queries/userDetailsQuery');

const url = 'https://01.kood.tech/api/graphql-engine/v1/graphql';


// GraphQL query function
const getQuery = async (url, token, query, variables = {}) => {
    try {
        const response = await axios.post(url, {
            query: query,
            variables: variables
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error performing GraphQL query');
    }
};


module.exports = getQuery;
