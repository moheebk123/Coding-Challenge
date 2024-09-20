import React, { useState, useRef, useLayoutEffect } from "react";
import Header from "../components/Header";

function OtpForm() {
  const [verificationStatus, setVerificationStatus] =
    useState("Verify Account");
  const [isCheckable, setCheckable] = useState(true);
  const inputRef = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  useLayoutEffect(() => {
    alert("OTP is 1234. You can check it by wrong OPT as well.");
    inputRef.current[0].current.readOnly = false;
    inputRef.current[0].current.focus();
  }, []);

  const handleInput = (event, index) => {
    const value = event.target.value.slice(0, 1);
    event.target.value = value;
    if (!value) {
      setCheckable(true);
      setVerificationStatus("Verify Account");
      if (index > 0) {
        inputRef.current[index].current.blur();
        inputRef.current[index].current.readOnly = true;
        inputRef.current[index - 1].current.focus();
        inputRef.current[index - 1].current.readOnly = false;
      }
    } else {
      if (index < inputRef.current.length - 1) {
        inputRef.current[index].current.blur();
        inputRef.current[index + 1].current.focus();
        inputRef.current[index + 1].current.readOnly = false;
      } else {
        setCheckable(false);
      }
    }
  };

  const handleVerification = () => {
    const otp = "1234";
    const userOtp = inputRef.current.map((ref) => ref.current.value).join("");
    if (otp === userOtp) {
      setVerificationStatus("Verified");
    } else {
      setVerificationStatus("Verification failed");
    }
  };

  return (
    <div className="opt-box p-5 w-full h-screen bg-sky-600 flex justify-center items-center">
      <div className="max-w-[450px] h-fit p-5 bg-white text-center flex items-center justify-center gap-3 flex-col rounded-xl shadow-lg">
        <Header
          heading="Mobile Phone Verification"
          para="Enter the 4-digit verification code that was sent to your phone number."
        />
        <div className="flex gap-3 justify-center items-center">
          {inputRef.current.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              readOnly={true}
              className={`input-box w-11 h-12 rounded-md bg-sky-600/15 border-0 shadow-md outline-0 text-center text-xl text-semibold ${
                verificationStatus === "Verified"
                  ? "border-1 border-teal-300"
                  : verificationStatus === "Verification failed" &&
                    "border-1 border-red-300"
              }`}
              type="number"
              onInput={(event) => handleInput(event, index)}
            />
          ))}
        </div>
        <button
          disabled={isCheckable}
          onClick={handleVerification}
          type="button"
          className={`w-56 rounded-md text-white font-semibold m-2 px-5 py-2 ${
            !isCheckable ? "cursor-pointer" : "cursor-default opacity-80"
          } ${
            verificationStatus === "Verify Account"
              ? "bg-[#112d4e]"
              : verificationStatus === "Verified"
              ? "bg-teal-500"
              : "bg-red-500"
          }`}
        >
          {verificationStatus}
        </button>
        {verificationStatus !== "Verified" && (
          <div className="font-semibold text-slate-500">
            Don&#39;t receive code?{" "}
            <span className="text-[#112d4e]">Resend</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OtpForm;
