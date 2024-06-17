import FAQItem from "../components/Faq";

const FAQConst = [
  {
    question: "Why you need access to my Github account?",
    answer: (
      <>
        <p>
          We don't use our own backend or database to keep integration simple.
          Building our own auth admin system would cost a huge amount of time
          and using an existing auth solution would cost $$$.
        </p>
        <br />
        <p>
          Insted, we use Github Issues to store your feedback. This solution is
          virtually free for everyone but because of that we need permissions to
          act on your behalf.
        </p>
      </>
    ),
  },
  {
    question:
      "If I give you permissions you have full access to my Github account?",
    answer:
      "Short answer, no. When Live Feedback asks you for permissions you can see what permissions were requested. Live Feedback permissions are limited to: create and read issues and pull requests read, anything else is prohibited.",
  },
  {
    question: "Live Feedback is like Vercel's preview comments?",
    answer:
      "Kind of. It's not a copy for sure, but it's based on Vercel's preview comments. The main difference is that vercel's preview comments only exists in Vercel platform. On the other hand, Live Feedback works everywhere, on every platform, tech stack or site in browser context of course.",
  },
  {
    question: "Why is there a server in the middle when I try to log in?",
    answer: (
      <>
        <p>
          Don't worry, this is because of how Github user access token
          generation for a Github App works. Live Feedback server owns the Live
          Feedback Github App credentials.
        </p>
        <br />
        <p>
          These credentials are secret. When you start the authentication flow
          the server sends to Github a login request to Live Feedback Github
          App. At this point you will see the github login screen on a popup
          window and it will ask you for permissions. Once you give permissions
          the popup window will send the token to Live Feedback script and
          close. This generated token will have very limited permissions.
        </p>
        <br />
        <p>
          If you have doubts you can see the source code of the server here:{" "}
          <a
            href="https://github.com/JulianKominovic/live-feedback/tree/master/app/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            API Routes
          </a>
        </p>
      </>
    ),
  },
  {
    question: "Can I use this in production?",
    answer:
      "Please no, this script is not suited for production environments. You should only activate Live Feedback only in test environments. It was designed as an internal tool for developers, designers, collaborators and very specific clients. I take no responsibility for improper use of this tool.",
  },
  {
    question: "Live Feedback is still in beta?",
    answer:
      "No, but still under heavy development. Some major features are missing but it's a competent first version.",
  },
];

export default function FAQ() {
  return (
    <section className="relative flex flex-col items-center max-w-screen-lg gap-4 px-8 pt-4 pb-32 mx-auto overflow-hidden">
      {FAQConst.map((item) => (
        <FAQItem
          key={item.question}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </section>
  );
}
