export default defineEventHandler(async (event) => {
  try {
    // Clear `accessToken` and `refreshToken` by setting them with expired cookies
    setCookie(event, "accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0), // Set expiration to a past date
    });

    setCookie(event, "refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0), // Set expiration to a past date
    });

    // Return a success message
    return {
      statusCode: 200,
      body: {
        message: "Logout successful",
      },
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      statusCode: 500,
      body: {
        message: "Error logging out",
      },
    };
  }
});
