import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./infoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';

export default function InfoBox ({info}) {

    const INIT_URL = "https://plus.unsplash.com/premium_photo-1754254838357-71d8f22ab968?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGR1c3R5JTIwc2t5fGVufDB8fDB8fHww"

    const HOT_URL ="https://images.unsplash.com/photo-1545955413-209e03defb1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const COLD_URL ="https://images.unsplash.com/photo-1603726574752-a85dc808deab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const RAIN_URL ="https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbiUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";

    return (
        <div className="InfoBox">
            
            <div className='cardcontainer'>
              <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity > 80 ? RAIN_URL : info.temp > 15  ? HOT_URL : COLD_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city}{
            info.humidity > 80 ? <ThunderstormIcon/> : info.temp > 15  ? <SunnyIcon/> : <AcUnitIcon/>
          }
        </Typography>
        <Typography variant="body2" color='text.secondary' component={"span"}>
          <p>temperature = {info.temp}&deg;C</p>
          <p>humidity = {info.humidity}</p>
          <p>tempMin = {info.tempMin}&deg;C</p>
          <p>tempMax = {info.tempMax}&deg;C</p>
          <p>the weather can be describe as {info.wearther} and feel like = {info.feelsLike}&deg;C</p>
        </Typography>
      </CardContent>
     
    </Card>
    </div>
        </div>
    )
}