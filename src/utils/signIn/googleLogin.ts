export const googleLogin = () => {
  const clientId = `856675445990-jen1s6k2hibe8hm9qobu55k89nmgl50i.apps.googleusercontent.com`;
  const redirectURi = `http://localhost:5173/sign-up`;
  const scope = `https://www.googleapis.com/auth/userinfo.email`;
  const endPoint = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&scope=${scope}&
response_type=token&redirect_uri=${redirectURi}`;
  window.location.assign(endPoint);
};
