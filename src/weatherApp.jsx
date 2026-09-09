import SearchBox from './searchBox';
import InfoBox from './infoBox';
import { useState } from 'react';


export default function WeatherApp () {

    const[weatherInfo, setWeatherInfo] = useState({
        city: "delhi",
        feelsLike: 24.8,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        wearther: "haze"
        
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);

    }

    return (
        <div style={{textAlign: "center"}}>
            <h2>weather app by delta</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}