import React from "react";

import Lottie from "react-lottie-player";

import lottieJson from "@/public/404.json";

export default function ErrorAnimation() {
  // 미작동
  return <Lottie loop animationData={lottieJson} play />;
}
