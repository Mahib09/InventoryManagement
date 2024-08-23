import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Invetox | Manage Your Inventory",
  description: "All in one web application to manage your warehouse inventory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
