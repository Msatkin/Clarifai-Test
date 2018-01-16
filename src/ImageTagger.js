import * as keys from './keys.js';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: keys.clarifai
});



const tagImages = (urls, success, fail) => {
    let fullUrls = urls.map((value) => {
        return "http://fydn.imgix.net/" + value;
    });

    app.models.predict(Clarifai.GENERAL_MODEL, fullUrls).then(
        function(response) {
            let data = response.outputs.map((image, index) => {
                return [urls[index][0], image.data.concepts[0].name, image.data.concepts[0].value.toString()]
            })
            console.log(data);
            success(data);
        },
        function(err) {
          console.error(err);
        }
      );
}

export default tagImages;