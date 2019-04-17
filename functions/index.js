const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

SENDGRID_API_KEY = "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";


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.Email = functions.firestore.document('users/{userId}/FavouriteArtists/{Id}')
.onCreate((event, context) => {
    const userId = context.params.userId;
    console.log(userId);
    const db = admin.firestore()

    return db.collection('users').doc(userId)
    .get()
    .then(doc => {

        const user = doc.data()

        const msg = {
            to: 'conorpscott@outlook.com',
            from: 'sligosound@outlook.com',

            templateId: 'd-6a8e50ccceb940689ce47a541037296f',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                name: user.username
            }
        };

        return sgMail.send(msg)
    })
    .then(() => console.log('email sent!'))
    .catch(err => console.log(err))
});