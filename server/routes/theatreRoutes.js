const router = require('express').Router();
const theatreController = require('../controller/theatreController');

// Add a Theatre
router.post('/add-theatre', theatreController.addTheatre);

router.put('/update-theatre',  theatreController.updateTheatre);

router.get('/get-all-theatres', theatreController.getAllTheatres);

router.delete('/delete-theatre', theatreController.deleteTheatre);

module.exports = router;