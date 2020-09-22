import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link'

export default function Categories({ categories }) {

    const router = useRouter();

    if(router.isFallback){
        return <div>
               Loading...
            </div>
    }

   function renderCategories(){
        return categories.map((item, index)=>(
            <li key={index} className="category ">
                <Link href={ `/categories/${item.id}` }>
                    <div className="image">
                        <img src="https://pogo91-static.s3.amazonaws.com/media/__sized__/category/cropped880529158437356930-thumbnail-120x120-70.jpg" alt="Pulses" class="gm-added gm-lazy" src="https://pogo91-static.s3.amazonaws.com/media/__sized__/category/cropped880529158437356930-thumbnail-120x120-70.jpg" />
                    </div>
                    <h3>Pulses</h3>
                </Link>
            </li>
        ))
    }

    const imagePlaceholder = `https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081`;

    return (
        <div className="container-fluid" >
            <div className="component-container category-list">
                <div className="header">
                    <h1 className="title">CATEGORIES</h1>
                </div>
                <ul className="list-unstyled d-flex flex-wrap mt-3">
               
                {categories.map((item, index)=>(
                    <li key={index} className="category">
                        <Link href={ `/categories/${item.id}` } >
                                <div className="image">
                                    <img src={item.image ? item.image : imagePlaceholder } alt="No Image"  />
                                </div>
                        </Link>
                        <h3 className="text-truncate" style={{ width: '8rem' }} >{item.name}</h3>
                    </li>
                ))}
                {
                    categories.length === 0 ? <p> Categories Not Found </p> : null 
                }
            </ul>
            </div>
            
        </div>
    )
}

export async function getServerSideProps({ params, preview = false }){

    let categories = [];
    try {

        const response = await axios.get('http://localhost:3000/api/categories')

        // console.log(response.data)
        categories = response.data.list;

    } catch (error) {
        
        console.error('error==>>', error);
        categories = [];
    }

    return {
        props: {
            preview,
            categories
        }
    }
}
