const express = require('express');
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = 'de5d23f3a7cb83fd45d3086d99adefd9'
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
const generateScrapeUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to Amazon scraper API')
})

// get Details of Products
app.get('/products/:productId',async(req,res)=> {
    const {productId} = req.params
    const {api_key} = req.query
    try{
      const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
      res.json(JSON.parse(response))
    }catch(error){
      res.json(error)
    }
})

// get Details of ProductsReviews
app.get('/products/:productId/reviews',async(req,res)=> {
    const {productId} = req.params
    const {api_key} = req.query
    try{
      const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
      res.json(JSON.parse(response))
    }catch(error){
      res.json(error)
    }
})

// get Details of Products Offers
app.get('/products/:productId/offers',async(req,res)=> {
    const {productId} = req.params
    const {api_key} = req.query
    try{
      const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
      res.json(JSON.parse(response))
    }catch(error){
      res.json(error)
    }
})

// get Details of Products Offers
app.get('/search/:searchQuery',async(req,res)=> {
    const {searchQuery} = req.params
    const {api_key} = req.query
    try{
      const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
      res.json(JSON.parse(response))
    }catch(error){
      res.json(error)
    }
})


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));