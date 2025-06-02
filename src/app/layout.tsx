import "../styles/index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "@/contexts/AuthContext";
import { Inter } from 'next/font/google';
import {ToastProvider} from "@/contexts/ToastProvider";
import type { Metadata } from 'next'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
    title: {
        template: '%s | PayMyBuddy',
        default: 'PayMyBuddy', // a default is required when creating a template
    },
    description: 'PayMyBuddy – simplifiez vos transferts d’argent entre proches : ' +
        'inscrivez-vous, ajoutez des amis et envoyez de l’argent facilement et en toute sécurité.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
        <body>
            <ToastProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ToastProvider>
        </body>
    </html>
  );
}
