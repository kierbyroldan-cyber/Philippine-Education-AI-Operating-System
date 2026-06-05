import './globals.css';

export const metadata = {
  title: 'EduAI OS Dashboard',
  description: 'Teacher intelligence platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
