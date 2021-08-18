import axios from 'axios'
import { useEffect, useState } from 'react'
export default function StaticMap() {
    require('dotenv').config()
    const key = process.env.REACT_APP_API_KEY
    const [markers, setMarkers] = useState([])

//     const markers = [
//         {
//             name: "treasure 1",
//             lat: 1.349591,
//             long: 103.956787
//         },
//         {
//             name:"treasure 2",
//             lat: 1.352480,
//             long: 103.94461
//         },
//         {
//             name:"treasure 3",
//             lat: 1.35626197818541,
//             long: 103.83535857197133
//         }
// ]

useEffect(() => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    axios
      .get(baseUrl+"/treasures/"
    //   , {
    //     headers: {
    //       Authorization: localStorage.getItem("access_token")
    //         ? "Bearer " + localStorage.getItem("access_token")
    //         : null,
    //     },
    //   }
      )
      .then(function (res) {
        setMarkers(res.data);
        console.log(markers)
      })
      .catch(function (err) {
        console.log(err);
      })
  }, []);

let url = ""
for(const i of markers){
console.log(i)
url += `%7C${parseFloat(i.lat)},${parseFloat(i.lng)}`
}
console.log(url)
return (
    <div className = "center">
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=Singapore&zoom=11&size=600x380&maptype=roadmap&scale=2&map_id=53c641c1d183e837&key=${key}&markers=color:white%7Csize:tiny${url}`} alt="Nothing to see here" />
    </div>
)
}
// %7C1.349591,103.956787%7C1.35248,103.94461%7C1.35626197818541,103.83535857197133
// %7C1.349591,NaN%7C1.35248,NaN%7C1.35626197818541,NaN