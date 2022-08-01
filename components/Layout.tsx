import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Web Tools</title>
        <meta name="description" content="Web development tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>
          <Link href="/">Web Tools</Link>
        </h1>
        {children}
      </main>
    </>
  );
};

export default Layout;
