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
          // @ts-expect-error - TS doesn't know about the `repo` prop
          repo="live-feedback"
          owner="JulianKominovic"
          // src="https://cdn.jsdelivr.net/gh/JulianKominovic/live-feedback@latest/build/bundle.js"
          src="http://192.168.1.48:5000/bundle-dev.js"
        />
      </body>
    </html>
  );
}
