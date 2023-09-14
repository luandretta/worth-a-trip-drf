import { rest } from "msw";

const baseURL = "https://worth-a-trip-drf-40e2fa952827.herokuapp.com/api/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 8,
        username: "Anna",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 8,
        profile_pic:
          "https://res.cloudinary.com/dtqse76ok/image/upload/v1/media/../user-icon",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
