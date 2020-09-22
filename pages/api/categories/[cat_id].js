// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios').default
const constants = require('../../../config/constants');

export default (req, res) => {

  const { method, query: { cat_id, pageNo } } = req;

  switch (method) {
    case 'GET':{
      
      axios.get(
        `${constants.BASE_URL}/category/product/?store_prefix=cake-shop&page=${pageNo ? pageNo : 1}&category_id=${cat_id}`
      ).then(response=>{

        res.status(200).json({
          list: response.data.products,
          numOfpages: response.data.num_pages,
          message: `Successfully loaded products.`
        }) 
      }).catch(error=>{
    
        res.status(403).json({
          list: [],
          message: `Could not load products.`
        })
      })
      break;
    }
    default:{
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} not allowed`);
      break;
    }
  }
}
