import Comparison from "./fragments/Comparison";
import FAQ from "./fragments/FAQ";
import Features from "./fragments/Features";
import FinalCTA from "./fragments/FinalCTA";
import FirstSteps from "./fragments/FirstSteps";
import Hero from "./fragments/Hero";
import Integration from "./fragments/Integration";
import SecurityAndPrivacy from "./fragments/SecurityAndPrivacy";

export default function IndexPage() {
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
    </>
  );
}
