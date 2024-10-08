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

  // Retrieve the array of users from localStorage
  const users = JSON.parse(localStorage.getItem("User")) || [];

  // Find the user whose email and password match the input
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    // Return a 200 response with user data if found
    return [
      200,
      {
        token: "mocked-jwt-token",
        user: {
          id: foundUser.id,
          email: foundUser.email,
        },
      },
    ];
  } else {
    // Return a 401 response if no user is found
    return [
      401,
      {
        message: "Invalid email or password.",
      },
    ];
  }
});

export default api;
