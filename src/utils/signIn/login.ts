import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    return await axios
      .post(
        `/api/api/users/signin`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        },
      )
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};
