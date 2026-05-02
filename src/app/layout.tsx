import "./globals.css";
import { SocketProvider } from "@/providers/SocketProvider";
import { ChatWindow } from "@/components/shared/ChatWindow";

export const metadata = {
  title: "LearnHub | Online Learning Management System",
  description: "Master new skills with industry-leading online courses and professional certification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SocketProvider>
          {children}
          <ChatWindow />
        </SocketProvider>
      </body>
    </html>
  );
}
