import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Recycle, Target, Navigation } from 'lucide-react';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for Map
const wasteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const buyerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export default function ResourceMap() {
  const mapCenter = [20.5937, 78.9629]; // Center of India
  
  // Mock Data: Generators (Red) and Recyclers (Green)
  const [nodes, setNodes] = useState({
    waste: [
      { id: 'w1', pos: [19.0760, 72.8777], city: 'Mumbai', type: 'Industrial Plastic', qty: '500kg', status: 'Available' },
      { id: 'w2', pos: [28.7041, 77.1025], city: 'Delhi', type: 'E-Waste', qty: '120kg', status: 'Available' },
      { id: 'w3', pos: [13.0827, 80.2707], city: 'Chennai', type: 'Textile Scraps', qty: '800kg', status: 'Available' }
    ],
    buyers: [
      { id: 'b1', pos: [18.5204, 73.8567], city: 'Pune', accepts: 'Industrial Plastic', price: '₹22/kg' },
      { id: 'b2', pos: [28.4595, 77.0266], city: 'Gurugram', accepts: 'E-Waste', price: '₹150/kg' },
      { id: 'b3', pos: [11.0168, 76.9558], city: 'Coimbatore', accepts: 'Textile Scraps', price: '₹10/kg' }
    ]
  });

  const [matches, setMatches] = useState([]);

  // Simulate AI Matchmaking Algorithm
  useEffect(() => {
    // A simple logic tying them together based on types for demo purposes
    const newMatches = nodes.waste.map(w => {
       const buyer = nodes.buyers.find(b => b.accepts === w.type);
       if (buyer) {
           return {
               id: `match-${w.id}-${buyer.id}`,
               positions: [w.pos, buyer.pos],
               distance: calculateDistance(w.pos, buyer.pos),
               waste: w,
               buyer: buyer
           };
       }
       return null;
    }).filter(Boolean);
    
    setMatches(newMatches);
  }, []);

  // Haversine formula (mocked simple distance for demo)
  const calculateDistance = (pos1, pos2) => {
      // Just a mock representation in km for UI purposes
      return Math.floor(Math.random() * 200 + 50); 
  };

  return (
    <div className="glass-panel animate-in" style={{ padding: '1.5rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Navigation className="text-primary" /> AI Matchmaking Network
          </h2>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}></div>
                  Resource Available
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}></div>
                  Buyer / Recycler
              </div>
          </div>
      </div>
      
      <div className="map-wrapper">
        <MapContainer 
            center={mapCenter} 
            zoom={5} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', background: '#1a1a2e' }}
        >
          {/* Dark Mode Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {nodes.waste.map(pin => (
            <Marker key={pin.id} position={pin.pos} icon={wasteIcon}>
              <Popup>
                <div style={{ color: '#000' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>{pin.city} - Source</h4>
                    <p style={{ margin: 0 }}><strong>Type:</strong> {pin.type}</p>
                    <p style={{ margin: 0 }}><strong>Qty:</strong> {pin.qty}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {nodes.buyers.map(pin => (
            <Marker key={pin.id} position={pin.pos} icon={buyerIcon}>
              <Popup>
                 <div style={{ color: '#000' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>{pin.city} - Facility</h4>
                    <p style={{ margin: 0 }}><strong>Accepts:</strong> {pin.accepts}</p>
                    <p style={{ margin: 0 }}><strong>Rate:</strong> {pin.price}</p>
                 </div>
              </Popup>
            </Marker>
          ))}

          {/* AI Matchmaking Lines */}
          {matches.map(match => (
             <Polyline 
                key={match.id}
                positions={match.positions} 
                color="#10b981" 
                weight={3}
                dashArray="10, 10" // Creates a dashed line effect
                opacity={0.7}
             >
                 <Popup>
                    <div style={{ color: '#000' }}>
                        <h4 style={{ margin: '0 0 5px 0', color: '#059669' }}>Optimal Route Identified</h4>
                        <p style={{ margin: 0 }}>Transferring {match.waste.qty} of {match.waste.type}</p>
                        <p style={{ margin: 0 }}>From {match.waste.city} to {match.buyer.city}</p>
                    </div>
                 </Popup>
             </Polyline>
          ))}

        </MapContainer>
      </div>
    </div>
  );
}
