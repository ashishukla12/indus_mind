import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    // Temporary login
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 700);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-ink grid-texture">
      <div className="w-full max-w-sm">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="border border-line bg-panel rounded-lg p-8 shadow-xl">

          {/* Clickable Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 mb-2 w-fit hover:opacity-80 transition"
          >
            <div className="w-2 h-2 rounded-full bg-signal pulse-dot"></div>

            <span className="tag-mono text-[11px] text-muted uppercase tracking-widest">
              INDUS MIND
            </span>
          </Link>

          <h1 className="text-2xl font-semibold mb-6">
            Engineer Copilot Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-xs text-muted block mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="engineer@indusmind.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-panel-2 border border-line rounded-md px-3 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-muted block mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-panel-2 border border-line rounded-md px-3 py-2.5 text-sm outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-signal text-ink rounded-md py-2.5 flex justify-center items-center gap-2 hover:bg-signal/90 transition"
            >
              <LogIn size={16} />
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-5">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-sky-400 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}