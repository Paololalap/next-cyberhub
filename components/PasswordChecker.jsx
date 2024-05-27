"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const progressColor = () => {
    switch (testResult.score) {
      case 0:
        return "bg-gray-400";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-green-700";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="h-2 overflow-hidden rounded-md bg-gray-200">
        <div
          className={`h-full ${progressColor()}`}
          style={{ width: `${num}%` }}
        ></div>
      </div>
      <p className={`mt-1 text-sm `}>{createPassLabel()}</p>
    </>
  );
};

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-screen items-center justify-center px-5 md:px-0">
      <div className="w-full max-w-md rounded-lg border-2 border-solid border-black bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Password Checker
        </h2>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform opacity-75"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          )}
        </div>
        <PasswordStrengthMeter password={password} />
      </div>
    </div>
  );
}
