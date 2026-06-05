import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../core/providers/AuthProvider.jsx";
import AuthCard from "../../../shared/components/AuthCard.jsx";
import FormInput from "../../../shared/components/FormInput.jsx";
import PrimaryButton from "../../../shared/components/PrimaryButton.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await login(form);
    setIsSubmitting(false);
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthCard
      title="Login"
      subtitle="Sign in first, then your private and group chats will open."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={handleChange}
        />
        <FormInput
          id="password"
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          required
          minLength={6}
          value={form.password}
          onChange={handleChange}
        />

        <PrimaryButton disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        New here?{" "}
        <Link className="font-semibold text-[#2b7f74]" to="/register">
          Create account
        </Link>
      </p>
    </AuthCard>
  );
}

export default LoginPage;
