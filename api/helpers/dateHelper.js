module.exports = {
    validateTimestamp: timestamp => timestamp ? new Date(timestamp).getTime() > 0 : true
}