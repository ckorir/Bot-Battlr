import React, { useState, useEffect } from 'react';
import YourBotArmy from './YourBotArmy';

export default function BotCollection() {
  const [bots, setBots] = useState([]);
  const [yourBotCollection, setYourBotCollection] = useState([]);

  useEffect(() => {
    // calls the fetchBots function
    fetchBots();
  }, []);


  // Fetch Bots from Server
  function fetchBots() {
    const boturl = 'http://localhost:8001/bots';

    fetch(boturl)
      .then((response) => response.json())
      .then(data => setBots(data))
      .catch(error => console.error(error)); // Add error handling

    console.log(bots);
  }

  // Add to Army
  const addToYourBotArmy = (bot) => {
    if (!yourBotCollection.find(b => b.id === bot.id)) {
      setYourBotCollection([...yourBotCollection, bot]);
    }
    console.log(bot)
  };

  // Release from Army
  const releaseFromYourBotArmy = (bot) => {
    setYourBotCollection(yourBotCollection.filter(b => b.id !== bot.id));
  };

  // Delete Bot from Server
  const dischargeBot = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setYourBotCollection(yourBotCollection.filter(b => b.id !== bot.id));
    })
    .catch(error => console.error(error));
  };

  // Render component with the updated bots state.
  return (
    <div className="container row mx-auto">
      <YourBotArmy bots={yourBotCollection} releaseFromYourBotArmy={releaseFromYourBotArmy} dischargeBot={dischargeBot} />
      {bots.map(bot => (
        <div className='col-md-3' key={bot.id}>
          <div className='cards my-4'>
            <img src={bot.avatar_url} alt='bot image' className='img-fluid' onClick={() => addToYourBotArmy(bot)}/>
            <div className='col botinfo p-4'>
              <div>
                <h5>{bot.name}</h5>
                <p>{bot.catchphrase}</p>
                <div>
                  <ul className='stats'>
                    <li>
                      <i className="fa-solid fa-heart-pulse mx-1"></i>
                      {bot.health}
                    </li>
                    <li>
                      <i className="fa-solid fa-bolt-lightning mx-1"></i>
                      {bot.damage}
                    </li>
                    <li>
                    <i className="fa-solid fa-shield-halved mx-1"></i>
                      {bot.armor}
                    </li>
                    <li>
                      <i className="fa-solid fa-x" onClick={() => dischargeBot(bot)}></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
