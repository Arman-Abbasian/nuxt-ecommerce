// server/middleware/auth.js
export default defineEventHandler((event) => {
  const token = useCookie(event, "access_token");
  console.log("token in middleware", token);
  if (token) {
    event.node.req.headers["authorization"] = `Bearer ${token}`;
  }
});
