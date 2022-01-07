const handleDetect = (req, res, stub, metadata) => {
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            if (response.status.code !== 10000) {
                console.log("Received failed status: " + res.status.description + "\n" + res.status.details);
                return;
            } 
            res.json(response)
        }  
    );
}

module.exports = {
    handleDetect
}