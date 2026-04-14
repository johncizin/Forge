import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Anvil, Eye, EyeOff } from "lucide-react";



export default function LoginPage() {
  //
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false) //eye off

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEyeToggle = () => {

  }

  return (
    // page container
    <div className="min-h-screen bg-forge-bg flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 gap-3">
          <div className="w-9 h-9 rounded-lg bg-forge-accent flex items-center justify-center">
            <Anvil size={18} color="white" className = "block shrink-0" />
          </div>
        </div>

        {/* Card Body */}
        <div className="bg-forge-sidebar border border-forge-border rounded-2xl p-8">
          <h1 className="text-forge-login-text text-xl mb-1">
            {mode === "login" ? "Welcome back" : "Create an account"} {/* default mode is login */}
          </h1>
          <p className="text-forge-muted text-sm mb-6">
            {mode === "login"
              ? "Sign in to your Forge workspace" 
              : "Get started with Forge today"} 
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name field - only showed on register mode */}
            {mode === "register" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-forge-login-text">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="bg-forge-bg border border-forge-border rounded-lg px-3 py-2 text-sm text-forge-login-text placeholder-forge-muted/50 focus:outline-none focus:border-forge-login-focus-border transition-colors"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-forge-login-text">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-forge-bg border hover:bg-forge-login-hover border-forge-border rounded-lg px-3 py-2 text-sm text-shadow-forge-login-text placeholder-forge-muted/50 focus:border-forge-login-focus-border transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-forge-login-text">Password</label>
              <div className="relative">
              <input
                type= {showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
                autoComplete="current-password"
                required
                className="bg-forge-bg border hover:bg-forge-login-hover border-forge-border rounded-lg px-3 py-2 pr-10 text-sm text-forge-login-text placeholder-forge-muted/50 focus:outline-none focus:border-forge-login-focus-border transition-colors w-full"
              />
               <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-forge-muted" onClick={() => setShowPassword(!showPassword)}>
                 { showPassword ? <Eye size={16}/> : <EyeOff size={16} /> }
              </span>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 border border-black hover:border-white disabled:opacity-50 text-white font-medium text-sm py-2 rounded-lg transition-all mt-1"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign in"
                : "Create account"}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-forge-muted text-sm text-center mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setName(""); }}
              className="text-forge-accent font-bold hover:text-forge-login-focus-border hover:underline transition-colors transition-underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}