const React = require('react');
const Layout = require('./Layout');

function Home() {
    return (
        <Layout title="Главная страница">
            <link href="/styles/homeStyles.css" rel="stylesheet" type="text/css" />

            <header className="header">
                <a href="/auth/login">Войти</a>
                <a href="/auth/registration">Регистрация</a>
                <a href="/">Главная</a>
            </header>

            <div className="content">
                <h1>Добро пожаловать на наш сайт!</h1>
                <p>Присоединяйтесь к нам и начните пользоваться всеми преимуществами нашего сайта.</p>
            </div>

            <div className="form-container">
                <h2>Зарегистрируйтесь сейчас</h2>
                <form action="/auth/registration" method="POST">
                    <input type="text" name="login" placeholder="Имя пользователя" />
                    <input type="email" name="email" placeholder="Электронная почта" />
                    <input type="password" name="password" placeholder="Пароль" />
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </Layout>
    );
}

module.exports = Home;
