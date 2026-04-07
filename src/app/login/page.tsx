"use client";

import React, { useState } from "react";
import LoginLayout from "../../components/Login/LoginLayout";
import PhoneStep from "../../components/Login/PhoneStep";
import OtpStep from "../../components/Login/OtpStep";
import DetailsStep from "../../components/Login/DetailsStep";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Completed, redirect? For now alert.
      alert("Login Complete!");
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <PhoneStep
            onContinue={nextStep}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case 2:
        return (
          <OtpStep
            onContinue={nextStep}
            phoneNumber={phoneNumber}
            otp={otp}
            setOtp={setOtp}
          />
        );
      case 3:
        return <DetailsStep onContinue={nextStep} isFilled={false} />;
      case 4:
        return <DetailsStep onContinue={nextStep} isFilled={true} />;
      default:
        return null;
    }
  };

  return <LoginLayout>{renderCurrentStep()}</LoginLayout>;
}
