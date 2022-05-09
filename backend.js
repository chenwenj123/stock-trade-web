import cors from 'cors';
import express from "express";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {getAutocomplete,getCompanyDescription,getLatestPrice,getHistoricalChart,getHistoricalData,
   getNews,getRecommendation,getSocialSentiment,getCompanyPeers,getCompanyEarnings} from './outerAPI.js'


const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)
const path= __dirname +'/myProject/dist/my-project/'
const app = express();
//app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path));
app.get('', (req, res)=>{
   res.sendFile(path+ 'index.html')
})

function checkObject(priceRes, tickerName) {
   if (typeof priceRes === "object") {
       console.log(`${tickerName} Record length: ${Object.keys(priceRes).length}`);
   } else {
       console.log(`${tickerName} Ticker Not Found`);
   }
}


app.get('/searchutil/:keyword', async function (req, res) {
   
   let origRes = await getAutocomplete(req.params.keyword);
   //filltered symbol not contain "."
   let origResult = origRes['result'];
   const fillteredRes= origResult.filter(item => 
      !item.symbol.includes('.')&
      item.type=="Common Stock"
    );
   return res.send(fillteredRes);
})

app.get('/stockdetail/:tickerName', async function (req, res) {
   let origRes = await getCompanyDescription(req.params.tickerName);
   return res.send(origRes);
})


app.get('/latestprice/:tickerName', async function (req, res) {
   console.log(`\nLatest Price Call: ${req.params.tickerName.toUpperCase()}`);
   // if not found, response is {"detail":"Not found."}
   let origRes = await getLatestPrice(req.params.tickerName);
   console.log(`${req.params.tickerName.toUpperCase()} Latest Price finished at ${Date()}\n`);
   return res.send(origRes);
})



app.get('/histchart/:tickerName/:from_hour/:to_hour', async function (req, res) {
   console.log(`\nHistorical chart data Call: ${req.params.tickerName.toUpperCase()}\n`);
   // if not found, response is object {"detail":"Error: Ticker 'xxxx' not found"}
   // otherwise response is array of object
   let origRes = await getHistoricalChart(req.params.tickerName, req.params.from_hour, req.params.to_hour);
   checkObject(origRes, req.params.tickerName.toUpperCase());
   console.log(`${req.params.tickerName.toUpperCase()} Historical chart data finished at ${Date()}\n`);
   return res.send(origRes); 
})


app.get('/histdata/:tickerName/:from_unix/:to_unix', async function (req, res) {
   console.log(`\nHistorical chart data Call: ${req.params.tickerName.toUpperCase()}\n`);
   // if not found, response is object {"detail":"Error: Ticker 'xxxx' not found"}
   // otherwise response is array of object
   let origRes = await getHistoricalData(req.params.tickerName, req.params.from_unix, req.params.to_unix);
   checkObject(origRes, req.params.tickerName.toUpperCase());
   console.log(`${req.params.tickerName.toUpperCase()} Historical data finished at ${Date()}\n`);
   return res.send(origRes); 
})

app.get('/news/:keyword', async function (req, res) {
   console.log(`\nNews Call: ${req.params.keyword.toUpperCase()}`);
   // if error in fetch, response is null
   let a = await getNews(req.params.keyword);
   let count = 0;
   let array = new Array() //改了
   for (var i=0; i<a.length; i++){
   if (a[i]["category"] && a[i]["datetime"] && a[i]["headline"] && a[i]["id"] && a[i]["image"] && a[i]["related"] && a[i]["source"] && a[i]["summary"] && a[i]["url"] && count < 20){
    count += 1;
    array.push(a[i]);
   }}
   return res.send(array);
   
})

app.get('/recommendationdata/:keyword', async function (req, res) {
   console.log(`\nHistorical chart data Call: ${req.params.keyword.toUpperCase()}\n`);
   // if not found, response is object {"detail":"Error: Ticker 'xxxx' not found"}
   // otherwise response is array of object
   let origRes = await getRecommendation(req.params.keyword);
   checkObject(origRes, req.params.keyword.toUpperCase());
   console.log(`${req.params.keyword.toUpperCase()} Recommendation data finished at ${Date()}\n`);
   return res.send(origRes); 
})

app.get('/socialsentimentdata/:keyword', async function (req, res) {
   console.log(`\nSocial sentiment data Call: ${req.params.keyword.toUpperCase()}\n`);
   let origRes = await getSocialSentiment(req.params.keyword);
   console.log(`${req.params.keyword.toUpperCase()} Recommendation data finished at ${Date()}\n`);
   return res.send(origRes); 
})

app.get('/companypeers/:tickerName', async function (req, res) {
   console.log(`\nSocial sentiment data Call: ${req.params.tickerName.toUpperCase()}\n`);
   let origRes = await getCompanyPeers(req.params.tickerName);
   console.log(`${req.params.tickerName.toUpperCase()} Company peers data finished at ${Date()}\n`);
   return res.send(origRes); 
})

app.get('/companyearningsdata/:keyword', async function (req, res) {
   
   console.log(`\nCompany earnings data Call: ${req.params.keyword.toUpperCase()}\n`);
   let origRes = await getCompanyEarnings(req.params.keyword);
   console.log(`${req.params.keyword.toUpperCase()} Company earnings data finished at ${Date()}\n`);
   for (var i=0; i<origRes.length;i++){
      if (origRes[i]['actual'] == null){
         origRes[i]['actual'] = 0;
      };
      if (origRes[i]['estimate'] == null){
         origRes[i]['estimate'] = 0;
      };
      if (origRes[i]['period'] == null){
         origRes[i]['period'] = 0;
      };
      if (origRes[i]['surprise'] == null){
         origRes[i]['surprise'] = 0;
      };
      if (origRes[i]['surprisePercent'] == null){
         origRes[i]['surprisePercent'] = 0;
      };
      if (origRes[i]['symbol'] == null){
         origRes[i]['symbol'] = 0;
      } }
   return res.send(origRes); 
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`NodeJS Stock Server listening on port ${PORT}...`);
});