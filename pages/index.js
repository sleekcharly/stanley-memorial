import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout/layout';
import HomeComponent from '@/components/HomeComponent';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <HomeComponent />
    </Layout>
  );
}
