import { Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

import Header from "./Header.client";
import Footer from "./Footer.client";

export default function Layout({ children }) {
  
  return (
    <>
        <Seo 
            type="defaultSeo"
            data={{
                title: "Store",
                description: "Demo store"
            }}
        />
        
        <Header/>  
        
        <main>
            <Suspense>{children}</Suspense>
        </main>

        <Footer/>
    </>
  );
}