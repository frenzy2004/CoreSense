import type { Metadata } from "next";
import { SmartWatchClone } from "./SmartWatchClone";

export const metadata: Metadata = {
  title: "viAct Smart Watch | AI-IoT Worker Safety",
  description:
    "A close recreation of the viAct industrial smart watch landing page with AI-IoT safety sections, use cases, industries, reviews, and FAQ.",
};

export default function Home() {
  return <SmartWatchClone />;
}
