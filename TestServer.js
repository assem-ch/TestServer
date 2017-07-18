
var https = require('https');

// this is the function which returns the code and send it 
var f = function getTestPersonaLoginCredentials() {
    return https.get('https://jsonplaceholder.typicode.com/posts/1', function (response) {
        console.log('status code ', response.statusCode);

        if (response.statusCode != 200) {

            const accountSid = 'AC9dad6f264052b03c48d10bd8f6abe265' 
            const authToken = '80e901b3b89cc8b24c653f7743b70cc6'

            const client = require('twilio')(accountSid, authToken);
            
            client.messages.create({
                to : '213793918662',
                from :'+17608787099',
                body : response.statusCode,

            }).then((message) => {
                console.log(message.sid);
                
            });

        }

    }).on('error', (e) => {
        console.log('error');
    });
}


// u need to have cron ,so run npm install cron before running the script
var cron = require('cron');
var job = new cron.CronJob('*/4 * * * *',f, null, true);
// we are running the function every 4 minutes
