import { useState, useEffect } from "react";
import { fetchSanityData } from "../sanityData.client";
import { Link, Image } from "@shopify/hydrogen";

export default function ArticleGridItem() {

  const [blogData, setSanityData ] = useState([]);

    useEffect(() => {
        async function getData() {
          const sanityData = await fetchSanityData(sanityQuery);
          setSanityData(sanityData);
        }
        getData();
      }, []);  
        
    console.log(blogData);
    
    return (
      <>
      {blogData ? (
        blogData.map((post)=>(
          <div className="article-grid-item" key={post.id}>          
            {post.showHero ? (
              <>
                <Link to={`/blog/${post.slug}`} className="image-container">
                  <Image data={post.image} alt={post.title} />
                </Link>
                <div className="article-text">
                  <h2 className="article-grid-item-title">{ post.title }</h2>
                  <p>{post.description}</p>
                  <Link to={`/blog/${post.slug}`}>
                    <button className="checkout-button article-btn">Read more</button>                  
                  </Link> 
                </div>              
              </>
              ):(
                <div className="article-text">
                  <h2 className="article-grid-item-title">{ post.title }</h2>
                  <p>{post.description}</p>
                  <Link to={`/blog/${post.slug}`}>
                    <button className="checkout-button article-btn">Read more</button>                  
                  </Link> 
                </div>
              )
            }            
          </div>
        ))
        ):(
          null
        ) 
      }
      </>
    )
}

const sanityQuery = `
*[_type == "blog"]{
    "id": _id,
    title,
    "slug": slug.current,
    description,
    showHero,
    body,
    seo,    
    "imageUrl": hero.asset->url,
    "image": hero.asset->{
      _id,
      url,
      metadata { dimensions { width, height } }
    }    
  }
`;