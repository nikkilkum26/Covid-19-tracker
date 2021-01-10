import React ,{useState,useEffect}from 'react';
import './App.css'
import { FormControl, Select, MenuItem ,Card, CardContent} from '@material-ui/core';
import InfoBox from './components/infoBox';
import Map from './components/Map';
import Table from './components/Table';
import {sortData ,printNice} from './helper';
import LineGraph from './components/LineGraph'



function App() {
const [countries,setCountries] = useState([]);
const[country, setCountry] =useState("Worldwide");
const [countryInfo, setCountryInfo] =useState({});
const[tableData,setTableData] = useState([]);
const [casesType, setCasesType] = useState("cases");
const [mapCenter,setMapcenter] = useState({lat: 34.8, lng: -40.5});
const [zoom,setZoom] = useState(3);  
const [mapCountries,setMapCountries] =useState([])


   useEffect(()=>{
     fetch("https://disease.sh/v3/covid-19/all")
     .then((response) => response.json())
     .then((data)=>{
       setCountryInfo(data);
     })
   },[]);

  useEffect(()=>{
    let getData =  async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=>{
        let countries = data.map((country)=>(
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
        ));
        let sd = sortData(data);
        setCountries(countries);
        setMapCountries(data);
        setTableData(sd);
        
        
      })
    };
    getData();
  },[]);

const onCountry= async (e)=>{
  const csc = e.target.value;
 
  // setCountry(csc);

  let url = csc === "worldwide"
  ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${csc}`;

  await fetch(url)
  .then ((response)=>response.json())  
  .then((data)=>{
    setCountry(csc);
    setCountryInfo(data);
    setMapcenter([data.countryInfo.lat,data.countryInfo.long]);
    setZoom(4);
  })
}



  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1> Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined"  onChange={onCountry} value={country}>
          <MenuItem value="Worldwide">WorldWide</MenuItem>
           {
             countries.map((country)=>(
             <MenuItem value={country.value}>{country.name}</MenuItem>
             ))
           }
          

          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox isRed onClick={(e)=>setCasesType("cases")} title="Covid-19 Cases" cases={printNice(countryInfo.todayCases)} total={printNice(countryInfo.cases)} active={casesType==="cases"}/>
        <InfoBox isGreen onClick={(e)=>setCasesType("recovered")} title="Covid-19 Recovered" cases={printNice(countryInfo.todayRecovered)} total={printNice(countryInfo.recovered)} active={casesType==="recovered"}/>
        <InfoBox isBlack flag onClick={(e)=>setCasesType("deaths")} title="Covid-19 Deaths" cases={printNice(countryInfo.todayDeaths)} total={printNice(countryInfo.deaths)} active={casesType==="deaths"}/>
      </div>
            <Map countries={mapCountries} center={mapCenter} zoom={zoom} casesType={casesType}  />

    </div>
    <Card className="app__right">
            <CardContent>
              <h3>Live cases</h3>
              <Table countries={tableData} />
              <h3>Worldwide new {casesType}</h3>
              <LineGraph  casesType={casesType} />
            </CardContent>
    </Card>
    </div>
  );
}

export default App;
