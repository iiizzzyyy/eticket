module.exports = {
    post: (req, res, next) => {
        console.log(req.body)
        res.send('hello');
        next();
    }
};