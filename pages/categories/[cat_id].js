import React, { useState, useEffect } from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Products({ cat_id }) {

    const [allProducts, setProducts] = useState([]);
    const [currentPageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    let loading = false;

    function renderProducts(){
        return allProducts.map((item, index)=>(<Product key={index} product={item} />)) 
    }

    useEffect(()=>{
        getMore();
    }, [])

    const getMore= async()=>{

        if(!loading && currentPageNo < totalPages ){

            try {
        

                const response = await axios.get(`http://localhost:3000/api/categories/${cat_id}?pageNo=${currentPageNo + 1}`)
                let products = response.data.list;
                loading = false;
                setProducts([ ...[], ...allProducts, ...products]);
                setPageNo(currentPageNo+1);
                setTotalPages(response.data.numOfpages)
            } catch (error) {
                
                console.error(error);
                loading = false;
            }
        }
       
     }

return (
    <div className="container-fluid" >
        <h1 className="title" > Products </h1>
        <div className="product_listing">
            <div>
                    <InfiniteScroll
                        dataLength={allProducts.length}
                        next={getMore}
                        hasMore={currentPageNo < totalPages}
                        loader={<h4>Loading...</h4>}
                        height={600}
                        // scrollThreshold={"500px"}
                        endMessage={ allProducts.length === 0 ? <p> No Products found </p> : null}
                        >
                        {renderProducts()}
                    </InfiniteScroll>
            </div>
        </div>
    </div>
)
}


function Product({product}){

    let discount = 0 
    
    if(product.price_stock.length){
        discount = Math.ceil(((product.price_stock[0].mrp - product.price_stock[0].selling_price)*100)/product.price_stock[0].mrp);
    }
    const imagePlaceholder = `https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-1_large.png?format=jpg&quality=90&v=1530129292`;

    return (
        <div className="product_item d-flex">
               <div className="p_i_image ">
                  <div className="p_off">{!isNaN( discount)? discount : 0 } %</div>
                  <img src={product.image_url ? product.image_url : imagePlaceholder} alt="product" className="gm-added gm-lazy" />
               </div>
               <div className="p_i_content">
                <h4>{product.product_name}</h4>
                  <div className="varient_div select-arrow">
                     <select className="varient_select">
                         {product.price_stock.map(priceStock=>(
                        <option key={priceStock.id} value={JSON.stringify(priceStock)}>{priceStock.name}</option>
                         ))}
                     </select>
                  </div>
                  <div className="p_price">
                     <div><span className="old">{ product.price_stock.length ?  `₹ ${product.price_stock[0].mrp}`: '₹ 0'}</span><span className="new">{ product.price_stock.length ?  `₹ ${product.price_stock[0].selling_price}`: '₹ 0'}</span></div>
                  </div>
               </div>
            </div>
    )
}

export async function getServerSideProps({ params, query }) {
    
    return {
      props: {
        cat_id: params.cat_id
      },
    }
  }