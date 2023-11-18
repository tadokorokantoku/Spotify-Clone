import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import Sidebar from '@/domain/Sidebar/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import { MantineProvider, createTheme } from '@mantine/core';

const font = Figtree({ subsets: ['latin'] });

const theme = createTheme({
  white: '#000',
  black: '#000',
});

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to Music!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <Sidebar>{children}</Sidebar>
            </UserProvider>
          </SupabaseProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
