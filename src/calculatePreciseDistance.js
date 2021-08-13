import {getPreciseDistance} from 'geolib';

const arr=[
    {latitude:37.88142870550673, longitude:127.73010838445867},
    {latitude:37.870985971309736, longitude:127.74649354046008},
    {latitude:37.872607697281595, longitude:127.74939511550627},
    {latitude:37.86073364205741, longitude:127.74908788375991},
    {latitude:37.89323367841997, longitude:127.75577916098804}
  ]


function calculatePreciseDistance(location) {

    var distance=[]
    location = location["location"]

    if (location) {
    arr.map(current => {
      var pdis = getPreciseDistance(
        {latitude: location["coords"]["latitude"], longitude: location["coords"]["longitude"]},
        {latitude: current["latitude"], longitude: current["longitude"]},
      );
      distance.push(pdis)
    })

    alert(
      `${distance[0] / 1000} KM\n${distance[1] / 1000} KM\n${distance[2] / 1000} KM\n${distance[3] / 1000} KM\n${distance[4] / 1000} KM`
    );
  } else {
      alert("waiting...")

  }
};

export default calculatePreciseDistance;