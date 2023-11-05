import React, { useState, useEffect } from 'react';

export default function BotCollection() {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    // calls the fetchBots function
    fetchBots();
  }, []);

  function fetchBots() {
    const boturl = 'http://localhost:8001/bots';

    fetch(boturl)
      .then((response) => response.json()) // Corrected this line
      .then(data => setBots(data))
      .catch(error => console.error(error)); // Add error handling

    // The following console.log will not show the updated state immediately due to asynchronous behavior.
    console.log(bots);
  }

  // Render your component with the updated `bots` state here.
  return (
    <div className="container row mx-auto">
      {bots.map(bot => (
        <div className='col-md-3' key={bot.id}>
          <div className='cards my-4'>
            <img src={bot.avatar_url} alt='bot image' className='img-fluid' />
            <div className='col botinfo p-4'>
              <div>
                <h5>{bot.name}</h5>
                <p>{bot.catchphrase}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
