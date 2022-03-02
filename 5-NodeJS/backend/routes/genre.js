const express = require('express')
const router = express.Router()
const genre = require('../controllers/genre-controller')

router.get('/genre', genre.getGenres)

/*router.post('/', (req, res) => {
    const data = {
      name : req.body.name
    }

    connection.connect((err) => {
        const query = "INSERT INTO genre (name) VALUES(?)";
        const values = [data.name];

        connection.query(query, values, (error, result) => {
            if (error) {
                res.status(400).json({error});
            } else{
                res.status(202).send({
                    status: 'Successful',
                    insertId: result.insertId,
                });
            }
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.connect((err) => {
        const query = "delete from Genre where gr_id = ?";
        const values = [id];

        connection.query(query, values, (error, result) => {
            if (error) {
                res.status(400).json({error});
            } else{
                res.status(202).send({
                    status: 'Successful',
                    result: result,
                });
            }
        });
    });
});*/

module.exports = router
