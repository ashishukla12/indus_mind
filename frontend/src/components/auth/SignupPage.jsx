import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function SignupPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.organization ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    // Temporary signup
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 800);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-ink grid-texture">

      <div className="w-full max-w-md border border-line bg-panel rounded-lg p-8 shadow-xl">

        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-signal pulse-dot"></div>

          <span className="tag-mono text-[11px] text-muted uppercase tracking-widest">
            INDUS MIND
          </span>
        </div>

        <h1 className="text-2xl font-semibold mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-panel-2 border border-line rounded-md px-3 py-2.5"
          />

          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={form.organization}
            onChange={handleChange}
            className="w-full bg-panel-2 border border-line rounded-md px-3 py-2.5"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-panel-2 border border-line rounded-md px-3 py-2.5"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-panel-2 border border-line rounded-md px-3 py-2.5"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full bg-panel-2 border border-line rounded-md px-3 py-2.5"
          />

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
            <UserPlus size={16} />

            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}