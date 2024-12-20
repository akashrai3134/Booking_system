const router = require('express').Router();
const theatreController = require('../controller/theatreController');

router.post('/add-theatre', theatreController.addTheatre);

router.put('/update-theatre', theatreController.updateTheatre);

router.get('/get-all-theatres', theatreController.getAllTheatres);

router.delete('/delete-theatre', theatreController.deleteTheatre);

router.post('/get-all-theatres-by-owner', theatreController.getAllTheatresByOwner);


module.exports = router;