const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

exports.makePayment = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated to make a payment
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Notauthenticated");
  }

  // Get card details
  const {cardNumber, expirationDate, cvc, amount} = data;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_data: {
        type: "card",
        card: {
          number: cardNumber,
          exp_month: parseInt(expirationDate.split("/")[0]),
          exp_year: parseInt(expirationDate.split("/")[1]),
          cvc,
        },
      },
    });

    return {clientSecret: paymentIntent.client_secret};
  } catch (e) {
    console.log("Error processing item:", e);
    throw new functions.https.HttpsError("unknown", "Error processing payment");
  }
});
