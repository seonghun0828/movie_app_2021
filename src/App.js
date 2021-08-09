import React from 'react';
import PropTypes from 'prop-types';

const foodIlike = [
  {
    id: 1,
    name: 'kimchi',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QKNL3H-b8pGMgfg77Ig8BAHaE8%26pid%3DApi&f=1',
    rating: 5,
  },
  {
    id: 2,
    name: 'samgyeopsal',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg1.daumcdn.net%2Fthumb%2FR720x0%2F%3Ffname%3Dhttps%253A%252F%252Ft1.daumcdn.net%252Fliveboard%252Fdailylife%252F222d88e5c7dc496c8e8a8a56c3452e52.JPG&f=1&nofb=1',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'ramyeon',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frecipe1.ezmember.co.kr%2Fcache%2Frecipe%2F2019%2F12%2F28%2F34a1e12db0c0b37f58b478e5d0e143ca1.jpg&f=1&nofb=1',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'chukumi',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frecipe1.ezmember.co.kr%2Fcache%2Frecipe%2F2019%2F04%2F16%2Fa5787c36cc5b2e25a11a47fad8afae6c1.jpg&f=1&nofb=1',
    rating: 4.7,
  },
];

function Food({ name, picture, rating }) {
  return (
    <div>
      <h2>I like {name}</h2>
      <h4>{rating}/5.0</h4>
      <img src={picture} alt={name} />
    </div>
  );
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

function App() {
  return (
    <div>
      {foodIlike.map((dish) => (
        <Food
          key={dish.id}
          name={dish.name}
          picture={dish.image}
          rating={dish.rating}
        />
      ))}
    </div>
  );
}

export default App;
