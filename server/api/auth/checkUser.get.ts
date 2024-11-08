import { defineEventHandler, setCookie, getCookie } from "h3";
import { $fetch } from "ofetch";

type Response = {
  access_token: string;
  refresh_token: string;
};

export default defineEventHandler(async (event) => {
  // Parse the incoming request body
  const cookies = parseCookies(event);
  console.log({ cookies });
  const accessToken = cookies?.accessToken;

  // Define the external server URL
  const externalServerUrl = "https://api.escuelajs.co/api/v1/auth/profile";

  const response: Response = await $fetch(externalServerUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Return a success message
  return {
    statusCode: 200,
    data: {
      message: "Login successful",
      data: response,
    },
  };
});
