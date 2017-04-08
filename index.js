var pubsub = require('@google-cloud/pubsub')();
var util   = require('util');

/**
 * Cloud Function
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} The callback function.
 */
exports.gcsEventsToPubSub = function gcsEventsToPubSub( event, callback ) {

  const { bucket } = event.data;
  const topicName = `${process.env.GCLOUD_PROJECT}-${bucket}`;

  pubsub
    .topic(topicName)
    .get({autoCreate: true})
    .then(function([ topic, apiResonse ]) {
      return topic.publish(event.data);
    }, function(err) {
      console.error(`couldn't get topic ${topicName} for event (${JSON.stringify(event.data)}): ${err}`);
    })
    .then(function([ messageIds, apiResponse ]) {
      console.info(`published event to topic ${topicName} with messageIds: ${JSON.stringify(messageIds)}`);
    }, function( err ) {
      console.error(`couldn't publish to topic ${topicName} for event (${JSON.stringify(event.data)}): ${err}`);
    })
    .then(callback);
};
