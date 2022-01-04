module.exports = {
  ENVIRONMENT_CONFIGURATION: {
    API_URL: JSON.stringify('$API_URL'),
    ADYEN_CLIENT_KEY: JSON.stringify('$ADYEN_CLIENT_KEY'),
    REACT_ENV: JSON.stringify('$CI_ENVIRONMENT_NAME')
  }
};
