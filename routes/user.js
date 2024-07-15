const express = require('express');
const router = express.Router();
const getQuery = require('./getQuery');
const userDetailsQuery = require('../queries/userDetailsQuery');
const auditAmountQuery = require('../queries/auditAmountQuery');
const xpQuery = require('../queries/xpQuery');


const url = 'https://01.kood.tech/api/graphql-engine/v1/graphql';

router.get('/', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.redirect(303, '/');
    }

    try {
        const data = await getQuery(url, token, userDetailsQuery);
        const upAudits = await getQuery(url, token, auditAmountQuery('up'));
        const downAudits = await getQuery(url, token, auditAmountQuery('down'));
        const projectsAndXp = await getQuery(url, token, xpQuery);

        const user = data.data.user[0];
        const name = `${user.firstName} ${user.lastName}`;

        const result = {
            user: null,
            auditRatio: 0,
            auditSumUp: 0,
            auditSumDown: 0,
            totalXP: 0,
            XP_Transfers: [],
        };
        result.user = { name, auditRatio: user.auditRatio };
        result.auditSumUp = upAudits.data.transaction_aggregate.aggregate.sum.amount;
        result.auditSumDown = downAudits.data.transaction_aggregate.aggregate.sum.amount;
        result.totalXP = projectsAndXp.data.transaction_aggregate.aggregate.sum.amount;
        result.XP_Transfers = projectsAndXp.data.transaction;

        res.render('user', { result });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.redirect(303, '/');
    }
});

module.exports = router;
