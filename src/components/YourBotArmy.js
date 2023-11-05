import React from 'react';

export default function YourBotArmy({ bots, releaseFromYourBotArmy, dischargeBot }) {
  return (
    <div className="row mx-auto myArmy">
      {bots && bots.map(bot => (
        <div className='col-md-3' key={bot.id}>
          <div className='cards my-2' onClick={() => releaseFromYourBotArmy(bot)}>
            <img src={bot.avatar_url} alt='bot image' className='img-fluid' />
            <div className='col botinfo p-3'>
              <div>
                <h5>{bot.name}</h5>
                <p>{bot.catchphrase}</p>
                <button onClick={() => dischargeBot(bot)}>Discharge Forever</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
