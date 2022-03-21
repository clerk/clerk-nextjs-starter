import { withAuth } from "@clerk/nextjs/api";

export default withAuth((req, res) => {
  const { sessionId } = req.auth;

  if (!sessionId) {
    return res.status(401).json({ id: null });
  }

  return res.status(200).json({ id: sessionId });
});
