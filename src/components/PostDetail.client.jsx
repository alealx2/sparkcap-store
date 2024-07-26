import { useState, useEffect, Suspense } from "react";
import { fetchSanityData } from "../sanityData.client";
import { Link, Image, useLocalization, Seo, } from "@shopify/hydrogen";
import { PortableText } from '@portabletext/react';
import PortableTextComponent from "./PortableText.client";

export default function PostDetail(slug){
    
    slug = slug.slug;

    const [postData, setSanityData ] = useState([]);

    useEffect(() => {
        async function getData() {
          const sanityData = await fetchSanityData(sanityQuery, slug);
            setSanityData(sanityData);          
        }
        getData();
      }, []);  
        
    // console.log(slug)
    //console.log(postData);

    var formattedDate = "";
    if(postData != null && postData != ""){
        formattedDate = formatDate(postData.publishDate);
    }

    return (
        <>
        {/* <Seo type="article" data={article} /> */}
        {postData ? (
          <div className="article-page container">
            <div className="article-page-header">
              <h1>{postData.title}</h1>
              <span>{formattedDate} · {postData.author}</span>
            </div>
            <article>
                {postData.showHero && postData.image ? (
                    <Image data={postData.image} alt={postData.title} />
                ):null}
              <div className="article-body">
                {postData.body ? (
                    <PortableTextComponent value={postData.body}/>
                ):null}                
              </div>
            </article>
          </div>
        ) : null
        }
      </>
    )
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

const sanityQuery = `
*[_type == "blog" && slug.current == $slug]{
    "id": _id,
    title,
    "slug": slug.current,
    showHero,
    body,
    publishDate,
    author, 
    seo,    
    "imageUrl": hero.asset->url,
    "image": hero.asset->{
      _id,
      url,
      metadata { dimensions { width, height } }
    }    
  }[0]
`;