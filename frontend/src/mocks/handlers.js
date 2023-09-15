import { rest } from "msw";

const baseURL = "https://worth-a-trip-drf-40e2fa952827.herokuapp.com/api/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: "admin",
        email: "luandretta@hotmail.com",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_pic:
          "https://res.cloudinary.com/dtqse76ok/image/upload/v1/media/images/logo_2_qtqcqa",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
