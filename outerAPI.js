import fetch from "node-fetch";

const token='c7theeiad3i8dq4u3bng';


export async function getAutocomplete(keyword){
    let url = `https://finnhub.io/api/v1/search?q=${keyword}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let searchRes = await APIres.json();
    return searchRes;
}

export async function getCompanyDescription(tickerName) {
    let url = `https://finnhub.io/api/v1/stock/profile2?symbol=${tickerName}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let companydesp = await APIres.json();
    return companydesp;
}


export async function getLatestPrice(tickerName) {
    let url = `https://finnhub.io/api/v1/quote?symbol=${tickerName}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let companydesp = await APIres.json();
    return companydesp;
}

export async function getHistoricalChart(tickerName,from_hour,to_hour) {
     // Company’s Last day’s chart data (close price)
    let url = `https://finnhub.io/api/v1/stock/candle?symbol=${tickerName}&resolution=5&from=${from_hour}&to=${to_hour}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let histRes = await APIres.json();
    return histRes;
}


export async function getHistoricalData(tickerName, from_unix,to_unix) {
    //get data in the last 2 years
    var date = new Date();
    var date1 = date.setFullYear(date.getFullYear()-2);
    to_unix = Math.floor(new Date().getTime()/1000);
    from_unix = Math.floor(date1/1000)
    let url = `https://finnhub.io/api/v1/stock/candle?symbol=${tickerName}&resolution=D&from=${from_unix}&to=${to_unix}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let histRes = await APIres.json();
    return histRes;
}


export async function getNews(keyword) {
    //TIME
    let to_date=new Date().toISOString().slice(0,10)
    let from_date= new Date(new Date().setDate(new Date().getDate()-7)).toISOString().slice(0,10) 
    let url = `https://finnhub.io/api/v1/company-news?symbol=${keyword}&from=${from_date}&to=${to_date}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET',headers: headers});
    let origRes = await APIres.json();      
    return origRes;
}

export async function getRecommendation(keyword) {
    
    let url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${keyword}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET',headers: headers});
    let origRes = await APIres.json();      
    return origRes;
}

export async function getSocialSentiment(keyword) {
    let url = `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${keyword}&from=2022-01-01&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET',headers: headers});
    let origRes = await APIres.json();      
    return origRes;
}

export async function getCompanyPeers(keyword) {

    let url = `https://finnhub.io/api/v1/stock/peers?symbol=${keyword}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET',headers: headers});
    let origRes = await APIres.json();      
    return origRes;
}

export async function getCompanyEarnings(keyword) {
    let url = `https://finnhub.io/api/v1/stock/earnings?symbol=${keyword}&token=${token}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET',headers: headers});
    let origRes = await APIres.json();      
    return origRes;
}

