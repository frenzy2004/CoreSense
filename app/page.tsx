import type { Metadata } from "next";
import { SmartWatchClone } from "./SmartWatchClone";

export const metadata: Metadata = {
  title: "CoreSense — Heat-health actions workers can use",
  description:
    "CoreSense is a privacy-limited worker heat-strain advisory system that combines an action-first wrist display, site heat context, supervisor response and a reviewable evidence trail.",
  openGraph: {
    title: "CoreSense — Heat-health actions workers can use",
    description:
      "From invisible heat strain to one clear action: work safely, pause, or rest now.",
  },
  twitter: {
    title: "CoreSense — Heat-health actions workers can use",
    description:
      "From invisible heat strain to one clear action: work safely, pause, or rest now.",
  },
};

export default function Home() {
  return <SmartWatchClone />;
}
