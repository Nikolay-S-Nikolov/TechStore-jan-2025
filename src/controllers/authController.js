import { Router } from "express";
import authService from "../services/authService.js";
import deviceService from '../services/deviceService.js'
import { getErrorMessage } from '../utils/errorUtils.js'
import { isAuth, isGuest } from '../middlewares/authMiddleware.js'

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);
        res.cookie(process.env.AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('auth/register', { error: errorMessage, user: userData });
    }
});

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie(process.env.AUTH_COOKIE_NAME, token);

        res.redirect('/');
        // res.tempRedirect('/', {error: 'You have logged in succsessfuly'}) // from tempData middleware
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('auth/login', { error: errorMessage, user: { email } });
    }

});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(process.env.AUTH_COOKIE_NAME);
    res.redirect('/');
});

authController.get('/profile', isAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        const createdDevices = await deviceService.getAll({ owner: userId });
        const preferredDevices = await deviceService.getAll({ preferredList: userId });
        res.render('auth/profile', { createdDevices, preferredDevices });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

export default authController;