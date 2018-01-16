import * as keys from './keys.js';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: keys.clarifai
});

const tagImages = (keys, success, isLast) => {
    //Adds correct prefix to s3 keys
    let urls = keys.map((value) => {
        return "http://fydn.imgix.net/" + value;
    });
    
    //Sends urls to Clarifai to be tagged
    app.models.predict(Clarifai.GENERAL_MODEL, urls).then(
        function(response) {
            //Maps response data to correct format, assigned null value if url fails
            let data = response.outputs.map((image, index) => {
                if (image.status.code != 10000) return null;
                return [keys[index][0], image.data.concepts[0].name, image.data.concepts[0].value.toString()]
            })
            //Success callback with filtering to remove null values
            success(data.filter((value) => value != null), isLast);
        },
        function(err) {
          console.error(err);
        }
      );
}

export default tagImages;