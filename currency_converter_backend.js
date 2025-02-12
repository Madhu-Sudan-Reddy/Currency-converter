const countryList1 = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
  
let Base_URL= "https://2024-03-06.currency-api.pages.dev/v1/currencies/inr.json"; 

let dropdowns = document.querySelectorAll(".dropdown select");
let resultbtn = document.querySelector("form button");
let amount = document.querySelector(".amount input");
let from = document.querySelector(".from select");
let to= document.querySelector(".to select");
let msg = document.querySelector(".msg p");

for(let select of dropdowns){
    for(let ccode in countryList1 ){
        let newOptions = document.createElement("option");
        newOptions.innerText=ccode;
        newOptions.value=ccode;
        if(select.name==="from" && ccode ==="USD"){
            newOptions.selected = "selected";
        }else if(select.name==="to" && ccode ==="INR"){
            newOptions.selected ="selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("change",(ev)=>{
        flagchange(ev.target);
    })
}

const flagchange= function(element){
    let c = element.value;
    console.log(c);
    let countrycode = countryList1[c];
    let newsrc = "https://flagsapi.com/"+countrycode+"/shiny/64.png" ;
    console.log(newsrc);
    let img =element.parentElement.querySelector("img");
    img.src=newsrc;  
}

let finalexchange;
resultbtn.addEventListener('click',async(eve)=>{
    eve.preventDefault();
    let exchangeAm=amount.value;
    if(exchangeAm===undefined || exchangeAm <1){
        return
    }
    console.log(exchangeAm,from.value,to.value);
    let url = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${from.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data= await response.json();
    console.log(data);
    msg.innerText=`1${from.value} = ${data[from.value.toLowerCase()][to.value.toLowerCase()]}${to.value}`;
    finalexchange = data[from.value.toLowerCase()][to.value.toLowerCase()]*exchangeAm;
    //console.log((data.from.value.toLowerCase()[to.value.toLowerCase()])*exchangeAm); this won't work so use [] instead of []
    amount.value = finalexchange;
})













































