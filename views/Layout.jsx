const React = require('react');

function Layout({ title, user, children }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        {/* <link rel="stylesheet" href="/css/style1.css" /> */}
        <script defer src="/js/bootstrap.bundle.min.js" />
        {/* <script defer src="/js/application.js" /> */}
      </head>
      <body>
        <header>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <h2>Store Anything</h2>
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                </ul>
                {user && user ? (
                  <div className="collapse navbar-collapse menu" id="navbarNav">
                    <div>
                      <ul className="navbar-nav">
                        <li className="nav-item nav-link active" id="login_hello">
                          Hello,&nbsp;
                          {user.name}
                        </li>
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="/auth/logout">logout</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="/lk">Edit profile</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="/additem">Add Item</a>
                        </li>
                        {user.is_Admin ? (
                          <li className="nav-item">
                            <a className="nav-link active" id="isAdmin" aria-current="page" href="/admin">ADMIN AREA</a>
                          </li>
                        ) : (
                          null
                        )}
                      </ul>
                    </div>
                    <div />
                  </div>
                )
                  : (
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link" href="/auth/registration">Registration</a>
                        </li>
                      </ul>
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link" href="/auth/login">Login</a>
                        </li>
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

module.exports = Layout;