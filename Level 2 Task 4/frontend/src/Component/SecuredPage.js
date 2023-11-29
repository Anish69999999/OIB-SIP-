// SecuredPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SecuredPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSecureData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/secure', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in local storage
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Failed to fetch secured data:', error.response.data.error);
      }
    };

    fetchSecureData();
  }, []);

  return (
    <div>
      <h2>Secured Page</h2>
      <p>{message}</p>

      {/* Blog Content */}
      <div>
        <h3>Discovering FC Barcelona</h3>
        <p>
          FC Barcelona, often simply referred to as Barça, is one of the most iconic and successful football clubs in the
          world. Established in 1899, the club has a rich history and a massive global fanbase.
        </p>
        <p>
          The club's home stadium, Camp Nou, is a legendary venue that has witnessed countless historic moments in
          football. It's the largest stadium in Europe and has been the stage for some of the most thrilling matches in
          the sport's history.
        </p>
        <p>
          FC Barcelona is renowned for its commitment to a distinctive style of play known as "tiki-taka," emphasizing
          possession, quick passing, and movement. The team's success on the pitch has resulted in numerous domestic
          and international titles.
        </p>
        <p>
          The club's colors, blue and red, are instantly recognizable, as are the iconic vertical stripes of the team's
          jersey. The crest features the Catalan flag and the letters "FCB," symbolizing the pride of the Catalonia
          region.
        </p>
        <p>
          Over the years, FC Barcelona has been home to football legends such as Lionel Messi, Xavi Hernandez, Andrés
          Iniesta, and many more. The La Masia youth academy, affiliated with the club, has produced some of the world's
          top talents.
        </p>
        <p>
          Barça's fanbase, known as "culés," is passionate and diverse, making every match a spectacle. Whether you're
          watching from the stands at Camp Nou or cheering from across the globe, the sense of unity among Barcelona
          fans is palpable.
        </p>
        <p>
          FC Barcelona is not just a football club; it's a symbol of identity, pride, and the beautiful game. The club's
          legacy continues to inspire football enthusiasts worldwide.
        </p>
      </div>
    </div>
  );
};

export default SecuredPage;
