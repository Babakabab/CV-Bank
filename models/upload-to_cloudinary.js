function uploadToCloudinary(req,index){
    let public_id = req.body['first-name'].append(" " + req.body['last-name'])
			.append(" " + req.body.position)
			.append(" " + req.body.uni)
            .append("page-" + i),
        quality = 15;
            
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(req.files[index].path, {
            public_id, quality
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result)
            }
                
        }
        );

    
    
});
}
