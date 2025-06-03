import "./globals.css";

export const metadata = {
  title: "Inventory App",
  description: "A simple inventory management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
