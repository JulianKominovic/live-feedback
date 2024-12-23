import Comparison from "./fragments/Comparison";
import FAQ from "./fragments/FAQ";
import Features from "./fragments/Features";
import FinalCTA from "./fragments/FinalCTA";
import FirstSteps from "./fragments/FirstSteps";
import Hero from "./fragments/Hero";
import Integration from "./fragments/Integration";
import SecurityAndPrivacy from "./fragments/SecurityAndPrivacy";
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.10:5000/bundle-dev.js"
    : "https://cdn.jsdelivr.net/gh/JulianKominovic/live-feedback@latest/build/bundle.js";

export default function IndexPage({
  searchParams,
}: {
  searchParams: undefined | Record<string, string>;
}) {
  const demo = searchParams?.["demo"];
  return (
    <>
      <Hero />
      <Integration />
      <Comparison />
      <Features />
      <FirstSteps />
      <SecurityAndPrivacy />
      <FAQ />
      <FinalCTA />
      {demo === "true" && (
        <script
          async
          // @ts-expect-error - TS doesn't know about the `repo` prop
          repo="live-feedback"
          owner="JulianKominovic"
          src={scriptSrc}
        />
      )}
    </>
  );
}
