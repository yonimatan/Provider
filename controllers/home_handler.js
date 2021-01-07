const Agora = require('../models/Agora');
const AgoraTables = require('../models/Agora.Tables');
const HomelessTables = require('../models/Homeless.Tables');
const HomelessChairs = require('../models/Homeless.Chairs');
const cheerio = require('cheerio');
const axios = require('axios');

/*
* ALL THE SCRAPING LOGIC IS IN THIS FILE. (CHANGE WITH CAUTION)
*  */

module.exports = async function(req,res){
    //resetting the mongodb to avoid data duplication - clean the data.
    await Agora.deleteMany({});
    await AgoraTables.deleteMany({});
    await HomelessChairs.deleteMany({});
    await HomelessTables.deleteMany({});

    //setting a promise
    await new Promise(resolve => {
        axios.get(`https://www.agora.co.il/toGet.asp?searchType=subCategory&dealType=2&iseek=20008`)
            .then(html => {
                const $ = cheerio.load(html.data);
                return $('.objectsTitleTr').each(async(i, el)=> {
                    const name = $(el).find('.objectName');
                    const area = $(el).find('.area');
                    const d = new Agora({
                        name: name.text(),
                        area: area.text()
                    })
                    await d.save()
                    if(i === 19){
                        resolve();
                    }
                })
            })
    })

    await new Promise(resolve => {
        axios.get(`https://www.agora.co.il/toGet.asp?searchType=subCategory&dealType=2&iseek=20015`)
            .then(html => {
                const $ = cheerio.load(html.data);
                return $('.objectsTitleTr').each(async(i, el)=> {
                    const name = $(el).find('.objectName');
                    const area = $(el).find('.area');
                    const d = new AgoraTables({
                        name: name.text(),
                        area: area.text()
                    })
                    await d.save()
                    if(i === 19){
                        resolve();
                    }
                })
            })
    })

    await new Promise(resolve => {
        axios.get(`https://www.homeless.co.il/yad2/inumber3=45$$inumber4=107`)
            .then(html => {
                const $ = cheerio.load(html.data);
                return $('tr[type=ad]').each(async(i, el)=> {
                    const linktag = $(el).find('.details');
                    const link = `https://www.homeless.co.il${linktag.find(`a[target='_blank']`).attr('href')}`;
                    const data = await axios.get(link);
                    const description = $(data.data).find(`div[style="width:100%; padding:10px 10px 0 10px;"]`).find('.remarks').text();
                    const price = $(data.data).find('.PriceInAd>span').text();
                    const item = $(data.data).find("#ctl00_ContentPlaceHolder1_MainDetails_AdPanel").find(`div:contains(פריט)>span[style="font-weight:bold; direction:rtl; display:inline-block;"]`).text();
                    const city = $(data.data).find("#ctl00_ContentPlaceHolder1_MainDetails_AdPanel").find(`div:contains(עיר)>span[style="font-weight:bold; direction:rtl; display:inline-block;"]`).text();
                    const imgUrl = $(data.data).find("#pic1>img").attr('src');

                    const Tables = new HomelessTables({
                        item,
                        city,
                        price,
                        description,
                        link,
                        imgUrl
                    })

                    await Tables.save();

                    resolve();
                })
            })
    })

    await new Promise(resolve => {
        axios.get(`https://www.homeless.co.il/yad2/inumber3=45$$inumber4=109`)
            .then(html => {
                const $ = cheerio.load(html.data);
                return $('tr[type=ad]').each(async(i, el)=> {
                    const linktag = $(el).find('.details');
                    const link = `https://www.homeless.co.il${linktag.find(`a[target='_blank']`).attr('href')}`;
                    const data = await axios.get(link);
                    const description = $(data.data).find(`div[style="width:100%; padding:10px 10px 0 10px;"]`).find('.remarks').text().replace('\n', '');
                    const price = $(data.data).find('.PriceInAd>span').text();
                    const item = $(data.data).find("#ctl00_ContentPlaceHolder1_MainDetails_AdPanel").find(`div:contains(פריט)>span[style="font-weight:bold; direction:rtl; display:inline-block;"]`).text();
                    const city = $(data.data).find("#ctl00_ContentPlaceHolder1_MainDetails_AdPanel").find(`div:contains(עיר)>span[style="font-weight:bold; direction:rtl; display:inline-block;"]`).text();
                    const imgUrl = $(data.data).find("#pic1>img").attr('src');

                    const Chairs = new HomelessChairs({
                        item,
                        city,
                        price,
                        description,
                        link,
                        imgUrl
                    })

                    await Chairs.save();

                    resolve();
                })
            })
    })

    Agora.find().then(agora => {
        HomelessChairs.find().then(chairs => {
            res.json([...chairs, ...agora]);
        })
    });
}