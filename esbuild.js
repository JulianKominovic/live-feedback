import esbuild from "esbuild";

const isDev = process.env.NODE_ENV === "development";

async function watch() {
  let ctx = await esbuild.context({
    entryPoints: ["./src/index.tsx"],
    minify: !isDev,
    outfile: "./build/bundle.js",
    bundle: true,
    loader: { ".ts": "ts" },
    jsx: "automatic",
  });
  if (isDev) {
    await ctx.serve({ port: 5000, servedir: "./build" });
  } else {
    await ctx.cancel();
    await ctx.rebuild();
  }
}
watch();
