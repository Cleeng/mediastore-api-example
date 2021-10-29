import fetchWithJWT from 'util/fetchHelper';

const getTransactionReceipt = transactionId => {
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/receipt/${transactionId}`;

  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => {
    return res.json();
  });
};

export default getTransactionReceipt;
