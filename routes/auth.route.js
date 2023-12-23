const authRouter = require('express').Router();
const React = require('react');
const bcrypt = require('bcrypt');
const ReactDomServer = require('react-dom/server');
const Registration = require('../views/Registration.jsx');
const Login = require('../views/Login');
const { User } = require('../db/models');
const checkSesions = require('../middleware/getUser');

// registration
authRouter.get('/registration', checkSesions, (req, res) => {
  try {
    if (res.locals.user) {
      res.redirect('/');
    } else {
      res.renderComponent(Registration);
    }
  } catch (error) {
    res.send('err.message');
  }
});

authRouter.post('/registration', async (req, res) => {
  try {
    const {
      login, email, password, passwordCheck, secretWord,
    } = req.body;
    const isAdminWord = 'a';
    let isAdmin = false;
    if (secretWord === isAdminWord) {
      isAdmin = true;
    }
    if (login.length > 20) {
      res.send('Error: login is so long');
    }
    const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = regexpEmail.test(email);
    if (!emailCheck) {
      res.send('Error: Неверно указан почтовый адрес');
    }
    if (password.length < 8) {
      res.send('Error: password is not strong');
    } else {
      if (password === passwordCheck) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          name: login,
          email,
          password: hashedPassword,
          is_Admin: isAdmin,
        });
        req.session.user_id = newUser.id;
      } else {
        res.send('Error: Passwords do not match');
      }
      res.send('Access: Registration ok');
    }
  } catch (error) {
    console.log(error);
  }
});

// login
authRouter.get('/login', checkSesions, (req, res) => {
  try {
    if (res.locals.user) {
      res.redirect('/');
    } else {
      res.renderComponent(Login);
    }
  } catch (error) {
    res.send('err.message');
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const {
      login, email, password,
    } = req.body;
    if (!login || !email || !password) {
      return res.send('Error: Fields cannot be empty');
    }
    const user = await User.findOne({
      where: {
        name: login,
      },
    });
    if (user) {
      // валидация почты
      const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailCheck = regexpEmail.test(email);
      if (!emailCheck) {
        res.send('Error: Неверно указан почтовый адрес');
      }
      // проверка пароля
      if (password) {
        const passIsOk = await bcrypt.compare(password, user.password);
        if (!passIsOk) {
          res.send('Error: Ivalid password!');
        }
      }
      req.session.user_id = user.id;
      res.send('Good: you are logged in');
    }
    // else {
    //   res.send('Error: User alredy exists!');
    // }
  } catch (error) {
    res.send('Error: oshibka');
  }
});

authRouter.get('/logout', (req, res) => {
  // удаление сессии на сервере
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }
    res
      .clearCookie('user_sid') // серверное удаление куки по имени
      // .json({ message: 'Успешный выход' });
      .redirect('/');
  });
});

module.exports = authRouter;