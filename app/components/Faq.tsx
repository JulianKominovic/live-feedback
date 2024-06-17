export default function FAQItem({
  question,
  answer,
}: {
  question: React.ReactNode;
  answer: React.ReactNode;
}) {
  return (
    <details className="max-w-screen-sm overflow-hidden transition-all duration-300 border group max-h-16 open:max-h-[100ch] border-white/10 rounded-2xl open:transition-all w-full">
      <summary className="block px-4 py-5 border-b cursor-pointer border-white/10">
        {question}
      </summary>
      <div className="px-4 pt-2 pb-5 text-foreground-muted bg-white/[0.05]">
        {answer}
      </div>
    </details>
  );
}
