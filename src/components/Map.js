import React from 'react';
import './map.css';
import {Map as LeafletMap , TileLayer} from 'react-leaflet';
import {showMapData} from '../helper';

function Map({countries,casesType,center,zoom}) {
    return (
        <div className="map">
            
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                url ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
    {showMapData(countries,casesType)}
    
            </LeafletMap>
        
        </div>
        
    )
}

export default Map
