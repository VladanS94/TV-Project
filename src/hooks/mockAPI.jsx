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

  if (email === "vladan.nish@hotmail.com" && password === "123") {
    return [
      200,
      {
        token: "mocked-jwt-token",
        user: {
          id: 1,
          name: "Vladan Nish",
          email: "vladan.nish@hotmail.com",
        },
      },
    ];
  } else {
    return [401, { message: "Invalid email or password" }];
  }
});

export default api;
