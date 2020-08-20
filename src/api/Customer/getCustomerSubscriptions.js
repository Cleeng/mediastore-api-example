import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const getCustomerSubscriptions = async () => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customers/${customerId}/subscriptions`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.json();
  });
};

export default getCustomerSubscriptions;
