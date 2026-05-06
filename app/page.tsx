import { NextResponse } from "next/server";

export default function Home() {
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem", maxWidth: "640px" }}>
      <h1>Paidly API</h1>
      <p>Backend is running. Available endpoints:</p>
      <ul>
        <li><code>POST /api/auth/signup</code> — Create account</li>
        <li><code>POST /api/auth/login</code> — Login</li>
        <li><code>GET /api/auth/me</code> — Get current user (requires Bearer token)</li>
      </ul>
    </main>
  );
}
