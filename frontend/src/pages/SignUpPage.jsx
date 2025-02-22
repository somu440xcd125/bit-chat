import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Mail,
  MessageSquare,
  User,
  Lock,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../conponentrs/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  console.log(formData)

  const { signUp, isSignUp } = useAuthStore();
  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("full name is require")
    if(!formData.email.trim()) return toast.error("email is require")
    if(!formData.password) return toast.error("Password is require")
    if(formData.password.length<6) return toast.error("password must be 6 charecter")
      return true


  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success=validateForm()
    if(success===true) signUp(formData);
  };


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* leftside */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSignUp}
            >
              {isSignUp ? (
                <>
                  {" "}
                  <Loader2 className="size-5 animate-spin" />
                  loading...
                </>
              ) : (
                "create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-/60">
              Already have an account?{""}
              <Link to="/login" className="link link-primary">
                sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
                  <AuthImagePattern
                  title='join our community'
                  subtitle='connect with friends,share moment,and stay in touch with your loved ones'
                  />
    </div>
  );
};

export default SignUpPage;
