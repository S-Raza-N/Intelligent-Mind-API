const Clarifai= require('clarifai');

const app = new Clarifai.App({
 apiKey: 'Your API Key'
});

const handleApiCall =(req, res) => {
    app.models
      .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data=> {
      	res.json(data);
      })
      .catch(err=> res.status(400).json('unableto work with API') )
}


 const handleImage= (req, res, db) => {
	const{ id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json('unable to get entries'))
 }

 module.exports= {
 	handleImage,
 	handleApiCall
 }

 // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)