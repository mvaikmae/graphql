const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
        const response = await axios.post('https://01.kood.tech/api/auth/signin', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        });
        // log the result for debugging
        // console.log('Response from sign-in:', response); 

        const token = response.data;

        // set the token as a cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(Date.now() + 1000 * 60 * 20) // set the timer for 20 min
        });
        res.json({ token });

    } catch (error) {
        if (error.response && error.response.status === 401) {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


// main page router
router.get('/', (req, res) => {
    // const token = req.cookies.jwt;
    // if (token) {
    //     res.redirect('/user');
    // } else {
    //     res.render('login');
    // }
    res.send('Index route is working');

});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt', { path: '/' });
    res.redirect('/');
});

module.exports = router;