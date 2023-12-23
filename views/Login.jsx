const React = require('react');
const Layout = require('./Layout');

function Login({ user }) {
  return (
    <Layout title="Login">
      <div className="container_one">
        {/* <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
          <circle cx="170" cy="170" r="160" stroke="#E2007C" />
          <circle cx="170" cy="170" r="135" stroke="#404041" />
          <circle cx="170" cy="170" r="110" stroke="#E2007C" />
          <circle cx="170" cy="170" r="85" stroke="#404041" />
        </svg> */}
      </div>
      <div className="log-container">
        <h3>Login</h3>
        <div className="login">
          <form className="loginForm" method="POST" action="/auth/login">
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">Login</span>
              <input type="text" className="form-control" placeholder="Login" aria-label="Username" aria-describedby="addon-wrapping" name="login" />
            </div>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">Email</span>
              <input type="email" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" name="email" />
            </div>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">Password</span>
              <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" name="password" />
            </div>
            {/* <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">Confirm Password</span>
              <input type="password" className="form-control" placeholder="Confirm Password" aria-label="Username" aria-describedby="addon-wrapping" name="passwordCheck" />
            </div> */}
            <button type="submit" className="btn btn-outline-success formBtn">Success</button>
            <div className="access" />
            <div className="error" />
          </form>
        </div>
        <script defer src="/js/login.js" />
      </div>
    </Layout>
  );
}
module.exports = Login;