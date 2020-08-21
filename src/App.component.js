/* istanbul ignore file */
import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Register from 'components/RegisterPage/Register';
import { isHosted } from 'util/layoutHelper';
import { listenForPayPalUrls } from 'util/appConfigHelper';
import { AppStyled, AppContentStyled } from './AppStyled';
import history from './history';
import './i18NextInit';
import OfferContainer from './containers/OfferContainer';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import Login from './components/LoginPage/Login';
import PasswordReset from './components/PasswordReset';
import ErrorPage from './components/ErrorPage';
import PasswordResetSuccess from './components/PasswordResetSuccess';
import RedirectWithQuery from './components/RedirectWithQuery';
import Loader from './components/Loader';
import PrivateRoute from './services/privateRoute';
import PublicRoute from './services/publicRoute';
import MyAccount from './containers/MyAccount/MyAccount.container';

const App = () => {
  const path = history.location.hash.slice(1);
  if (path) {
    history.replace(path);
  }

  listenForPayPalUrls();
  const isAppHosted = isHosted();

  return (
    <Suspense fallback={<Loader />}>
      <Router history={history}>
        <AppStyled hosted={isAppHosted}>
          <AppContentStyled hosted={isAppHosted}>
            <Switch>
              <PublicRoute path="/" exact component={RedirectWithQuery} />
              <PublicRoute
                path="/login"
                component={urlProps => <Login urlProps={urlProps} />}
              />
              <PublicRoute
                path="/my-account/login"
                isMyAccount
                component={urlProps => (
                  <Login urlProps={urlProps} isMyAccount />
                )}
              />
              <PublicRoute
                path="/register"
                component={urlProps => <Register urlProps={urlProps} />}
              />
              <PublicRoute
                path="/reset-password/"
                component={urlProps => (
                  <PasswordReset
                    onSuccess={value =>
                      history.push(
                        `/password-reset-success/${encodeURIComponent(value)}`
                      )
                    }
                    urlProps={urlProps}
                  />
                )}
              />
              <PublicRoute
                path="/password-reset-success/:email"
                component={urlProps => (
                  <PasswordResetSuccess
                    email={decodeURIComponent(urlProps.match.params.email)}
                  />
                )}
              />
              <PrivateRoute
                path="/offer"
                component={urlProps => (
                  <OfferContainer
                    onPaymentComplete={() => history.push('/thankyou')}
                    urlProps={urlProps}
                  />
                )}
              />
              <PrivateRoute
                path="/thankyou"
                component={() => <ThankYouPage />}
              />
              <PrivateRoute
                isMyAccount
                path="/my-account"
                component={({ match }) => <MyAccount routeMatch={match} />}
              />
              <Route
                path="*"
                render={() => {
                  return <ErrorPage type="generalError" />;
                }}
              />
            </Switch>
          </AppContentStyled>
        </AppStyled>
      </Router>
    </Suspense>
  );
};

export default App;