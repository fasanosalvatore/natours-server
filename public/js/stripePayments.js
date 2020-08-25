/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';
var stripe = Stripe(
  'pk_test_51HIzBoHwh5DpPeOTGCg1mipAHYTWXxT9vumpWJpkDovI2hvpaRi4iltawQ01Gr2mM38C2V8z1WwyWonvT8y7B1zu00d5pIkqiq'
);

export const bookTour = async tourId => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
