import MockAdapter from "axios-mock-adapter";

export const initializeMockInstance = (axiosInstance) => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 4000 });

  mock.onPost("/").reply((config) => {
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
};
