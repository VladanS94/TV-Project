import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const api = axios.create({
  baseURL: "https://example.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const mock = new MockAdapter(api, { delayResponse: 3000 });

mock.onPost("/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  const users = JSON.parse(localStorage.getItem("User")) || [];

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    return [
      200,
      {
        token: "mocked-jwt-token",
        user: {
          id: foundUser.id,
          email: foundUser.email,
          password: foundUser.password,
        },
      },
    ];
  } else {
    return [
      401,
      {
        message: "Invalid email or password.",
      },
    ];
  }
});

export default api;
