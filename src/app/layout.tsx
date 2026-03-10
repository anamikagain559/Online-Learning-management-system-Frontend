import "./globals.css";
import { SocketProvider } from "@/providers/SocketProvider";
import { ChatWindow } from "@/components/shared/ChatWindow";

export const metadata = {
  title: "Travel Buddy & Meetup",
  description: "Find your perfect travel companion",
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
