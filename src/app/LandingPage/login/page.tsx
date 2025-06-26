"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const PhoneOutlined = () => <span>📱</span>;
const EyeOutlined = () => <span>👁️</span>;
const EyeInvisibleOutlined = () => <span>🙈</span>;

interface LoginResponse {
  userId?: string;
  message?: string;
  success?: boolean;
  expiresAt?: string;
  userType?: string;
}

interface OTPValidationResponse {
  accessToken?: string;
  user?: {
    id: string;
    name: string;
    mobile: string;
    userType?: string;
  };
  message?: string;
  success?: boolean;
  userType?: string;
}

// User type configuration
const USER_TYPES = {
  "7093081512": { type: "superadmin", route: "/SuperAdmin/app/dashboard" },
  "7093081518": { type: "admin", route: "/Admin/app/dashboard" },
  "8096147427": { type: "doctor", route: "/Doctor/dashboard" },
  "8886063950": { type: "receptionist", route: "/Receptionist/dashboard" },
  // '9490219063': { type: 'Super Admin', route: '/SuperAdmin/app/dashboard' },
};

const Login = () => {
  const router = useRouter();
  const API_BASE_URL = "http://192.168.1.42:3000";

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<string>("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((timer) => timer - 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [otpTimer]);

  const validatePhone = (phoneNumber: string) => {
    return /^[0-9]{10}$/.test(phoneNumber);
  };

  const getUserTypeFromPhone = (phoneNumber: string) => {
    const userConfig = USER_TYPES[phoneNumber as keyof typeof USER_TYPES];
    return userConfig?.type || "admin"; // default to admin if not found
  };

  const getRouteFromPhone = (phoneNumber: string) => {
    const userConfig = USER_TYPES[phoneNumber as keyof typeof USER_TYPES];
    return userConfig?.route || "/Admin/app/dashboard"; // default route
  };

  const makeAPIRequest = async (endpoint: string, data: any) => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        requestOptions
      );
      const responseText = await response.text();

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        responseData = { message: responseText, success: false };
      }

      if (!response.ok) {
        if (response.status === 401 && endpoint === "/auth/validateOtp") {
          return {
            ...responseData,
            success: false,
            message: responseData.message || "Invalid OTP. Please try again.",
          };
        }
        throw new Error(
          responseData.message ||
            `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  };

  const handleSendOTP = async () => {
    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    // Check if phone number is registered
    const userType = getUserTypeFromPhone(phone);
    if (!USER_TYPES[phone as keyof typeof USER_TYPES]) {
      setError(
        "This mobile number is not registered. Please contact your administrator."
      );
      return;
    }

    setCurrentUserType(userType);
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const requestData = {
        mobile: phone,
        userType: userType,
        language: "tel",
      };

      console.log("Sending OTP request:", requestData);

      const data: LoginResponse = await makeAPIRequest(
        "/auth/login",
        requestData
      );

      if (data.userId || data.success !== false) {
        setUserId(data.userId || `temp-${Date.now()}`);
        setOtpSent(true);
        setOtpTimer(60);
        setSuccessMessage(data.message || "OTP sent successfully!");
        setError("");
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error instanceof Error) {
        if (
          error.message.includes("NetworkError") ||
          error.message.includes("Failed to fetch")
        ) {
          setError(
            "Network Error: Unable to connect to server. Please check your connection."
          );
        } else if (error.message.includes("401")) {
          setError("Authentication failed. Please contact support.");
        } else if (error.message.includes("400")) {
          setError("Invalid request. Please check your mobile number format.");
        } else if (error.message.includes("500")) {
          setError("Server error. Please try again later.");
        } else {
          setError(error.message || "Failed to send OTP. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    if (!userId) {
      setError("Session expired. Please request OTP again.");
      resetPhoneLogin();
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const requestData = {
        userId: userId,
        OTP: otp,
        mobile: phone,
      };

      console.log("Verifying OTP:", requestData);

      const data: OTPValidationResponse = await makeAPIRequest(
        "/auth/validateOtp",
        requestData
      );

      if (data.accessToken) {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", data.accessToken);
          // Store user info
          localStorage.setItem("userType", currentUserType);
          localStorage.setItem("mobile", phone);
          if (data.user) {
            localStorage.setItem("userData", JSON.stringify(data.user));
          }
        }

        const redirectRoute = getRouteFromPhone(phone);
        setSuccessMessage(
          `Login successful! Redirecting to ${currentUserType} dashboard...`
        );

        setTimeout(() => {
          router.push(redirectRoute);
        }, 1500);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error instanceof Error) {
        if (error.message.includes("401")) {
          setError("Invalid OTP. Please try again.");
        } else if (
          error.message.includes("NetworkError") ||
          error.message.includes("Failed to fetch")
        ) {
          setError("Network Error: Unable to connect to server.");
        } else {
          setError(error.message || "Verification failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPhoneLogin = () => {
    setOtpSent(false);
    setOtpTimer(0);
    setError("");
    setSuccessMessage("");
    setPhone("");
    setOtp("");
    setUserId("");
    setCurrentUserType("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  // Get user type display name
  const getUserTypeDisplay = () => {
    if (!phone || phone.length !== 10) return "";
    const userConfig = USER_TYPES[phone as keyof typeof USER_TYPES];
    return userConfig
      ? ` (${
          userConfig.type.charAt(0).toUpperCase() + userConfig.type.slice(1)
        })`
      : "";
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Side - Illustration */}
        <div
          className={`${
            isMobile ? "hidden" : "flex"
          } flex-1 items-center justify-center p-8 bg-white`}
        >
          <div className="max-w-md text-center">
            {/* Healthcare Illustration */}
            <div className="mb-8">
              <img
                src="/images/login_img.jpg"
                alt="Login Visual"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Vydhyo
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Your trusted healthcare companion. Secure, reliable, and always
              here for you.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img
                    src="/images/vydh_logo.png"
                    alt="Logo"
                    className="h-20 w-40"
                    style={{ maxWidth: 90 }}
                  />
                  <h1 className="text-3xl font-bold text-gray-900">
                    {otpSent ? "Enter OTP" : "Login"}
                  </h1>
                </div>
              {!otpSent && (
                <p className="text-gray-600">
                  Enter your registered mobile number to continue
                </p>
              )}
            </div>

            {/* User Type Indicator */}
            {phone.length === 10 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm text-center">
                <span className="font-medium">
                  User Type: {getUserTypeDisplay().slice(2, -1)}
                </span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                ✅ {successMessage}
              </div>
            )}

            {!otpSent ? (
              /* Phone Number Input */
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your 10-digit mobile number"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  {/* <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label> */}
                  <button className="text-sm text-blue-600 hover:text-blue-500">
                    Login with OTP
                  </button>
                </div>

                {/* Send OTP Button */}
                <button
                  onClick={handleSendOTP}
                  disabled={!phone || phone.length !== 10 || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            ) : (
              /* OTP Input */
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-2">
                    OTP sent to +91 {phone}
                    {getUserTypeDisplay()}
                  </p>
                  <button
                    onClick={resetPhoneLogin}
                    className="text-blue-600 hover:text-blue-500 text-sm underline"
                  >
                    ← Change number
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-mono letter-spacing-wider focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    style={{ letterSpacing: "0.5em" }}
                  />
                </div>

                {/* Resend OTP */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {otpTimer > 0
                      ? `Resend OTP in ${otpTimer}s`
                      : "Didn't receive OTP?"}
                  </span>
                  {otpTimer === 0 && (
                    <button
                      onClick={handleSendOTP}
                      disabled={isLoading}
                      className="text-blue-600 hover:text-blue-500 underline disabled:opacity-50"
                    >
                      {isLoading ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleOTPVerification}
                  disabled={!otp || otp.length !== 6 || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? "Verifying..." : "Verify & Sign In"}
                </button>
              </div>
            )}

            {/* Terms and Privacy */}
            <div className="mt-8 text-center text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
