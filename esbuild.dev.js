import esbuild from "esbuild";

async function watch() {
  let ctx = await esbuild.context({
    entryPoints: ["./src/index.tsx"],
    minify: false,
    outfile: "./build/bundle.js",
    bundle: true,
    loader: { ".ts": "ts" },
    jsx: "automatic",
  });
  await ctx.serve({ port: 5000, servedir: "./build" });
}
watch();
