const PORT = process.env.PORT || 8000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express()
const all = []

app.get('/', (req, res) => {
   try {


 axios.get('https://avenuegh.com/jobs/job-category/public-sector-government-agencies-jobs-in-ghana/')
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    // console.log($)

    $('.job_listing', html).each(function() {
        const title = $(this).find('h3').text()
        const company = $(this).find('div[class="job_listing-company"]').text()
        const url = $(this).find('a').attr('href')
        const images = $(this).find('img').attr('src')
        console.log(images)

        const a = []


            async function con() {
                await axios.get(url).then((response) => {
                    const data = response.data
                    const  c = cheerio.load(data)

                    c('.job_listing-description', data).each(function() {
                        const content = c(this).toString()
                        // console.log(content)

                        // console.log(c)

                        a.push({
                            content
                        })

                    })
                })
                return a
            }
            con()

            all.push({                                  
                title,    
                company,
                url,
                images,
                a
            })    

    })
    res.json(all)

    // app.get('/', (req, res) => {
    //     res.json(all)
      })
    } catch (error) {
        {throw error}
    }
  })

  app.listen(PORT)