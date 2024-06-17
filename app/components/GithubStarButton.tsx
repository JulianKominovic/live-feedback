import React from "react";
import { Star } from "@phosphor-icons/react/dist/ssr";
export const revalidate = 3600;
const GithubStarButton = async () => {
  const response = await fetch(
    "https://api.github.com/repos/JulianKominovic/live-feedback",
    {
      headers: {
        Authorization: `Bearer ${process.env.GH_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  const data = await response.json();
  const stars = data.stargazers_count;
  return (
    <a
      target="_blank"
      href="https://github.com/JulianKominovic/live-feedback"
      aria-label="Star JulianKominovic/live-feedback on GitHub"
      className="text-foreground bg-transparent px-3.5 py-1.5 rounded-lg text-sm group-hover:bg-white/10 flex items-center gap-2 transition-all group-hover:transition-all group-hover:shadow-white-outline duration-200"
    >
      <Star /> {stars}
    </a>
  );
};

export default GithubStarButton;
