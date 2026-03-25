import "@solana/wallet-adapter-react-ui/styles.css"; 
import "./globals.css";
import SolanaProvider from '../components/SolanaProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}