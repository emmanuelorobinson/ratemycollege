import Head from "next/head";
import Header from "../components/Header";
import Search from "../components/Search";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import styled from "styled-components";
import Modal from "../components/Modal";

import { useSelector } from "react-redux";


export default function Home() {
  const meta = {
    title: "Rate My College Dubai | College Reviews in Dubai",
    description: `The #1 student focused site for college reviews in Dubai`,
    image: "/logo.png",
    type: "website",
  };

  const showModal = useSelector((state) => state.login.showSignInModal);

  return (
    <StyledLanding>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta property="og:type" content={meta.type} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="author" content={meta.title} />
        {/* add alternate titles */}

      </Head>

      <main>
        <Header />
        <Search />
        <Feature />
        <Footer />
        <Modal showModal={showModal} />

      </main>
    </StyledLanding>
  );
}

const StyledLanding = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
