const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendSms = async function(user, token) {
  if (process.env.NODE_ENV === 'production') {
    try {
      await client.messages.create({
        to: `+39${user.phone}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Ciao ${
          user.name.split(' ')[0]
        }, risulta tu abbia effettuato una registrazione sul nostro sito Natours, eccoti il codice di verifica: ${token}`
      });
    } catch (err) {
      console.error(err);
    }
  } else
    console.log(
      `Ciao ${
        user.name.split(' ')[0]
      }, risulta tu abbia effettuato una registrazione sul nostro sito Natours, eccoti il codice di verifica: ${token}`
    );
};

// const phoneNumber = function(owner) {
//   return `+${owner.countryCode}${owner.phoneNumber}`;
// };

// const buildMessage = function(reservation) {
//   const message =
//     `You have a new reservation request from ${
//       reservation.guest.username
//     } for ${reservation.property.description}:\n${reservation.message}\n` +
//     `Reply [accept] or [reject]`;

//   return message;
// };
