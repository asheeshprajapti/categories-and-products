// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios').default
const constants = require('../../../config/constants');

export default (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':{
      
      axios.get(
        `${constants.BASE_URL}/category/?store_prefix=cake-shop`
      ).then(response=>{

        
        res.status(200).json({
          list: response.data.category,
          message: `Successfully loaded categories.`
        }) 
      }).catch(error=>{
    
        
        res.status(403).json({
          list: [],
          message: `Could not load categories.`
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
