export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          async
          // @ts-ignore - TS doesn't know about the `repo` prop
          repo="live-feedback"
          owner="JulianKominovic"
          // src="https://cdn.jsdelivr.net/gh/JulianKominovic/live-feedback@latest/build/bundle.js"
          src="http://localhost:5000/bundle-dev.js"
        />
      </body>
    </html>
  );
}
