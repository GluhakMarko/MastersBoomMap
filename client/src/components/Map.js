import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ReactWeather from 'react-open-weather'
import 'react-open-weather/lib/css/ReactWeather.css';
import myData  from '../../src/data/results'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [30, 50],
    iconAnchor:   [22, 50],
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-6, -35]

});

var string = JSON.stringify(myData)
var jsObjects= JSON.parse(string)
var lat = myData["1"].koordinate

var marker = {
    coords: [46.1491664,14.9860106],
    locText: "test"
}
var current_state = {
    weather: "",
    time: "",
    day_of_a_week: "",
    month: ""
}
class StreetMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 46.1491664 ,
            lng: 14.9860106,
            zoom: 9,
            selectedOption:"ne_suho",
            markers: [],
        }
    }
    changeOption(newOption){
        this.state.markers = []
        this.state.selectedOption = newOption.value
        this.addMarkers()

    }
    getCurrentState = ()=>{
        var date = new Date()
        let day = date.getDay()!==0 ? date.getDay()+1 : 6;
        let month = date.getMonth()!==12 ? date.getMonth()+1: 0;
        var state = {
            PRVR_Vreme: "D",
            Cas_Nesrece: date.getHours().toString()+'.0',
            dan_v_tednu: day.toString(),
            mesec: month.toString()
        }
        return state
    }
    isSectionCritical = (section,surfaceType)=>{
        let state = this.getCurrentState();
        let count = 0;
        let section_attributes = myData[section]['povrsje'][surfaceType.toString()];
        for(let attribute in state){
            if(section_attributes[attribute].includes(state[attribute]))
                count++;
        }
        return count >= 3
    }
    addMarkers = () => {
        for(let section in myData){
            if(!myData[section].koordinate.includes(null))
                var coord =myData[section].koordinate.toString().split(',')
            marker = {coords:[coord[0],coord[1]],locText:myData[section].kraj[0][3].toString()}
            if(this.state.selectedOption === 'all')
                this.state.markers.push(marker)

            else {
                if(this.isSectionCritical(section,this.state.selectedOption)){
                    this.state.markers.push(marker)
                }
            }
        }
    }
    render() {
        this.addMarkers()
        const position = [this.state.lat, this.state.lng]
        return (
            <Map className="map" center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.markers.map((m, idx) =>
                    <Marker
                        key={`marker-${idx}`}
                        position={m.coords}
                        icon={myIcon}>
                    <Popup>
                        <span>{m.locText}</span>
                    </Popup>
                </Marker>
                )}
            </Map>

        );
    }
}

export default StreetMap