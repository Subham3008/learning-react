import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../core/providers/AuthProvider.jsx";
import AlertMessage from "../../../shared/components/AlertMessage.jsx";
import AuthCard from "../../../shared/components/AuthCard.jsx";
import FormInput from "../../../shared/components/FormInput.jsx";
import PrimaryButton from "../../../shared/components/PrimaryButton.jsx";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Register"
      subtitle="Create a user account before entering the chat workspace."
    >
      <AlertMessage>{error}</AlertMessage>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput
          id="name"
          label="Full name"
          name="name"
          type="text"
          placeholder="Subham Samanta"
          required
          value={form.name}
          onChange={handleChange}
        />
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
          placeholder="At least 6 characters"
          required
          minLength={6}
          value={form.password}
          onChange={handleChange}
        />

        <PrimaryButton disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link className="font-semibold text-[#2b7f74]" to="/login">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}

export default RegisterPage;
