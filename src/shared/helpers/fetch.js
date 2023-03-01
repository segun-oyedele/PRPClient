const baseURL = 'https://apps.cdldelivers.com/prpserver';

export const getToken = async() => {
  const tokenUrl = 'https://apps.cdldelivers.com/authentication/connect/token';
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: new URLSearchParams({
      'client_id': 'PRP.WebClient',
      'scope': 'api.full',
      'client_secret': process.env.jwtSecretKey,
      'grant_type': 'client_credentials',
    }),
  });
  const { access_token } = await tokenResponse.json();
  return access_token;
}

export const fetchPartnerQuery = async(endpoint, token, method = 'GET') => {

  const url = `${baseURL}/${endpoint}`;

  return await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

};

export const fetchPartner = async(endpoint, token, data, method = 'GET') => {

  const url = `${baseURL}/${endpoint}`;

  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

};