import React, { useState } from 'react';
import './DestinationPage.css'

//All the Images
import imJax from './images/Jacksonville.png';
// import imMiami from './images/Miami.png';
import imTampa from './images/Tampa.png';
// import imOr from './images/orlando.png';
import imStP from './images/StPetersburg.png';
import imHialeah from './images/Hialeah.png';
import imPortStLucie from './images/PortStLucie.png';
import imCapeCoral from './images/CapeCoral.png';
import imTallahassee from './images/Tallahassee.png';
import imFtLauderdale from './images/FortLauderdale.png';
import imPembrokePines from './images/PembrokePines.png';
import imHollywood from './images/Hollywood.png';
import imGainesville from './images/Gainesville.png';



//The Big List
const destinations = 
[
  { id: 1, title: 'Jacksonville', description: 'Situated in northeastern Florida, Jacksonville offers a mix of urban excitement and natural beauty. With its picturesque beaches, vibrant arts scene, and numerous outdoor activities, it\'s a city with something for everyone.', image: imJax },
  // { id: 2, title: 'Miami', description: 'Nestled on the southeastern coast of Florida, Miami is a dynamic city known for its tropical climate, stunning beaches, and diverse culture. From trendy nightlife to cultural attractions like Art Deco architecture and the Wynwood Walls, Miami never fails to impress.', image: imMiami },
  { id: 3, title: 'Tampa', description: 'Located on the Gulf Coast of Florida, Tampa is a vibrant city with a rich history and a thriving arts scene. From its historic Ybor City district to its beautiful waterfront, Tampa offers visitors a unique blend of culture, entertainment, and natural beauty.', image: imTampa },
  // { id: 4, title: 'Orlando', description: 'Famous for its world-renowned theme parks like Walt Disney World and Universal Studios, Orlando is a premier destination for family-friendly fun. But beyond the parks, Orlando also boasts a burgeoning culinary scene, vibrant nightlife, and lush green spaces.', image: imOr },
  { id: 5, title: 'St. Petersburg', description: 'Situated on Florida\'s Gulf Coast, St. Petersburg is known for its stunning beaches, vibrant arts community, and rich cultural heritage. With its charming downtown, waterfront parks, and lively festivals, St. Petersburg offers visitors a laid-back yet lively atmosphere.', image: imStP },
  { id: 6, title: 'Hialeah', description: 'As one of the largest cities in Florida, Hialeah is a melting pot of cultures and traditions. From its colorful street art to its bustling markets and authentic Cuban cuisine, Hialeah offers visitors a taste of the vibrant diversity that defines Miami-Dade County.', image: imHialeah },
  { id: 7, title: 'Port St. Lucie', description: 'Nestled along Florida\'s Treasure Coast, Port St. Lucie is a charming city known for its pristine beaches, scenic parks, and world-class golf courses. With its laid-back atmosphere and abundant outdoor activities, Port St. Lucie is the perfect destination for relaxation and recreation.', image: imPortStLucie },
  { id: 8, title: 'Cape Coral', description: 'Located on Florida\'s Gulf Coast, Cape Coral is a waterfront paradise known for its scenic canals, beautiful beaches, and abundant wildlife. Whether you\'re boating along the waterways or lounging on the sandy shores, Cape Coral offers endless opportunities for outdoor adventure.', image: imCapeCoral },
  { id: 9, title: 'Tallahassee', description: 'As the capital of Florida, Tallahassee is a city steeped in history and culture. From its stately government buildings to its picturesque parks and gardens, Tallahassee offers visitors a glimpse into the rich heritage of the Sunshine State.', image: imTallahassee },
  { id: 10, title: 'Fort Lauderdale', description: 'Situated on Florida\'s southeastern coast, Fort Lauderdale is known for its stunning beaches, vibrant nightlife, and thriving arts scene. From its iconic beachfront promenade to its world-class museums and galleries, Fort Lauderdale offers visitors a perfect blend of relaxation and excitement.', image: imFtLauderdale },
  { id: 11, title: 'Pembroke Pines', description: 'Located in Broward County, Pembroke Pines is a vibrant city known for its family-friendly atmosphere and diverse community. From its lush parks and recreational facilities to its top-rated schools and cultural attractions, Pembroke Pines has something for everyone.', image: imPembrokePines },
  { id: 12, title: 'Hollywood', description: 'Nestled between Fort Lauderdale and Miami, Hollywood is a vibrant city known for its beautiful beaches, lively downtown area, and eclectic arts scene. With its charming historic district and diverse dining options, Hollywood offers visitors a taste of old Florida charm with a modern twist.', image: imHollywood },
  { id: 13, title: 'Gainesville', description: 'Home to the University of Florida, Gainesville is a dynamic city known for its vibrant college town atmosphere and rich cultural heritage. From its historic architecture to its scenic natural parks and preserves, Gainesville offers visitors a unique blend of academic excellence and outdoor adventure.', image: imGainesville }
];


function DestinationPage() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBackClick = () => {
    setSelectedDestination(null);
  };

  const filteredDestinations = destinations.filter((destination) =>
    destination.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDestinations = filteredDestinations.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="destination-page">
      {!selectedDestination && (
        <div className="search-bar">
          <span className="search-icon"><i className="fas fa-search"></i></span>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      )}
      {selectedDestination ? 
        (
          <div
            className="destination-details"
            style={{ backgroundImage: `url(${selectedDestination.image})` }}
          >
            <h2>{selectedDestination.title}</h2>
            <p>{selectedDestination.description}</p>
            <button className="back-button" onClick={handleBackClick}>
              Back
            </button>
          </div>
        ) : 
        (
          <div className="destination-list">
            {sortedDestinations.map((destination) => 
              (
                <div
                  key={destination.id}
                  className="destination-card"
                  style={{ backgroundImage: `url(${destination.image})` }}
                  onClick={() => handleCardClick(destination)}
                >
                  <h3>{destination.title}</h3>
                </div>
              )
              )}
          </div>
        )
      }
    </div>
  );
}

export default DestinationPage;