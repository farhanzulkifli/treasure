export default function StaticMap() {
    require('dotenv').config()
    const key = process.env.REACT_APP_API_KEY

    const locations = [
        {
            name: "treasure 1",
            lat: 1.349591,
            long: 103.956787
        },
        {
            name:"treasure 2",
            lat: 1.352480,
            long: 103.94461
        },
        {
            name:"treasure 3",
            lat: 1.35626197818541,
            long: 103.83535857197133
        }
]

let url = ""
for(const i of locations){
url += `%7C${i.lat},${i.long}`
}
console.log(url)
return (
    <div>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=Singapore&zoom=11&size=600x380&maptype=roadmap&scale=2&map_id=53c641c1d183e837&key=${key}&markers=color:white%7Csize:tiny${url}`} alt="Nothing to see here" />
        Static Map
    </div>
)
}
