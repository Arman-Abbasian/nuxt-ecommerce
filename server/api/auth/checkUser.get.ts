type Response = {
  access_token: string;
  refresh_token: string;
};

export default defineEventHandler(async (event) => {
  // Parse the incoming request body
  const cookies = parseCookies(event);
  const accessToken = cookies?.access_token;
  console.log("cookies", cookies);
  return true;

  // Define the external server URL
  const externalServerUrl = "https://api.escuelajs.co/api/v1/auth/profile";

  const response: Response = await $fetch(externalServerUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer {your access token}",
    },
  });
  // Extract tokens from the response
  const { access_token, refresh_token } = response;

  try {
    // Set HttpOnly cookies for the tokens
    setCookie(event, "accessToken", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    setCookie(event, "refreshToken", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Return a success message
    return {
      statusCode: 200,
      body: {
        message: "Login successful",
      },
    };
  } catch (error) {
    console.log({ error });
    // Handle any errors
    return error;
  }
});
