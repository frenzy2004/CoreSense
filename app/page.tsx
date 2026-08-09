import type { Metadata } from "next";
import { SmartWatchClone } from "./SmartWatchClone";

export const metadata: Metadata = {
  title: "CoreSense | Personal Heat-Risk Safety",
  description:
    "Individual heat-strain guidance for industrial workers, with edge intelligence, clear escalation, and an accountable supervisor trail.",
};

export default function Home() {
  return <SmartWatchClone />;
}
