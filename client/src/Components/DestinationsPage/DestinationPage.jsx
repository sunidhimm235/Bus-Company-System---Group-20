import React, { useState } from 'react';
import './DestinationPage.css'

//All the Images
import imNY from './images/ny.png';
import imOr from './images/orlando.png'
import imLa from './images/la.png'
import imSf from './images/sf.png'
import imLv from './images/lv.png'
import imMiami from './images/miami.png'
import imChicago from './images/chicago.png'
import imSeattle from './images/seattle.png'
import imBoston from './images/boston.png'
import imDc from './images/dc.png'
import imNo from './images/no.png'
import imDenver from './images/denver.png'
import imSd from './images/sd.png'
import imHouston from './images/houston.png'
import imNv from './images/nash.png'
import imAt from './images/atlanta.png'
import imPhil from './images/phili.png'
import imPort from './images/port.png'
import imAust from './images/austin.png'
import imDall from './images/dallas.png'
import imPhe from './images/pheonix.png'
import imSa from './images/sa.png'
import imMin from './images/minni.png'
import imSl from './images/sl.png'
import imKc from './images/kc.png'
import imCl from './images/cl.png'
import imCin from './images/cin.png'



//The Big List
const destinations = 
[
  { id: 1, title: 'New York', description: 'The bustling metropolis known for its iconic skyline, Broadway theaters, Central Park, and diverse cultural offerings.', image: imNY },
  { id: 2, title: 'Orlando', description: 'Famous for its theme parks like Walt Disney World and Universal Studios, Orlando is a major tourist destination in Florida.', image: imOr },
  { id: 3, title: 'Los Angeles', description: 'The entertainment capital of the world, home to Hollywood, beautiful beaches, and a diverse culinary scene.', image: imLa },
  { id: 4, title: 'San Francisco', description: 'Known for the Golden Gate Bridge, cable cars, steep rolling hills, and its vibrant tech industry.', image: imSf },
  { id: 5, title: 'Las Vegas', description: 'A city famed for its vibrant nightlife, world-class casinos, luxurious resorts, and entertainment options.', image: imLv },
  { id: 6, title: 'Miami', description: 'A coastal city known for its stunning beaches, vibrant nightlife, diverse culture, and Art Deco architecture.', image: imMiami },
  { id: 7, title: 'Chicago', description: 'The Windy City boasts iconic architecture, deep-dish pizza, jazz music, and a rich history of industry and culture.', image: imChicago },
  { id: 8, title: 'Seattle', description: 'Surrounded by water, mountains, and evergreen forests, Seattle is known for its tech giants, coffee culture, and outdoor activities.', image: imSeattle },
  { id: 9, title: 'Boston', description: 'Steeped in history, Boston is home to prestigious universities, iconic landmarks like the Freedom Trail, and a thriving sports scene.', image: imBoston },
  { id: 10, title: 'Washington D.C.', description: 'The capital of the United States, known for its historic monuments, museums, and political significance.', image: imDc },
  { id: 11, title: 'New Orleans', description: 'Famous for its vibrant music scene, Cajun and Creole cuisine, and annual Mardi Gras celebrations.', image: imNo },
  { id: 12, title: 'Denver', description: 'Nestled in the Rocky Mountains, Denver offers outdoor adventures, craft breweries, and a lively arts and culture scene.', image: imDenver },
  { id: 13, title: 'San Diego', description: 'With its beautiful beaches, perfect weather, and numerous attractions like the San Diego Zoo, it\'s a popular destination for tourists and locals alike.', image: imSd },
  { id: 14, title: 'Houston', description: 'Known for its space exploration history, diverse culinary scene, and thriving arts community.', image: imHouston },
  { id: 15, title: 'Nashville', description: 'The heart of country music, Nashville also offers historic landmarks, lively nightlife, and Southern hospitality.', image: imNv },
  { id: 16, title: 'Atlanta', description: 'A major transportation hub, Atlanta offers a mix of history, culture, and entertainment, including the Georgia Aquarium and the Martin Luther King Jr. National Historic Site.', image: imAt },
  { id: 17, title: 'Philadelphia', description: 'Rich in history and culture, Philadelphia is home to iconic landmarks like Independence Hall and the Liberty Bell.', image: imPhil },
  { id: 18, title: 'Portland', description: 'Known for its eco-friendliness, food trucks, craft breweries, and outdoor activities, Portland has a laid-back and hip vibe.', image: imPort },
  { id: 19, title: 'Austin', description: 'The capital of Texas is famous for its live music scene, vibrant food culture, and outdoor recreational activities.', image: imAust },
  { id: 20, title: 'Dallas', description: 'A cosmopolitan city with a rich history, Dallas offers cultural attractions, shopping, and dining experiences.', image: imDall },
  { id: 21, title: 'Phoenix', description: 'Known for its year-round sun, Phoenix offers outdoor adventures, desert landscapes, and a growing arts and culture scene.', image: imPhe },
  { id: 22, title: 'San Antonio', description: 'Home to the historic Alamo, San Antonio also offers picturesque River Walk, vibrant culture, and Tex-Mex cuisine.', image: imSa },
  { id: 23, title: 'Minneapolis', description: 'A city known for its parks, lakes, and cultural landmarks, Minneapolis offers a diverse array of arts, dining, and entertainment options.', image: imMin },
  { id: 24, title: 'St. Louis', description: 'Known for the iconic Gateway Arch, St. Louis also offers vibrant neighborhoods, cultural institutions, and a rich history.', image: imSl },
  { id: 25, title: 'Kansas City', description: 'Famous for its barbecue, jazz heritage, and fountains, Kansas City offers a blend of Midwestern charm and urban vitality.', image: imKc },
  { id: 26, title: 'Cleveland', description: 'A city on the shores of Lake Erie, Cleveland offers cultural attractions like the Rock and Roll Hall of Fame, diverse neighborhoods, and a growing culinary scene.', image: imCl },
  { id: 27, title: 'Cincinnati', description: 'Situated on the Ohio River, Cincinnati offers historic architecture, cultural attractions like the Cincinnati Zoo, and a rich culinary scene.', image: imCin }
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