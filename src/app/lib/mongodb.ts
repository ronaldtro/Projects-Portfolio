import mongoose from 'mongoose';    

const connectDb = async () => {
    try{
        if(mongoose.connection.readyState === 0){
            if(process.env.MONGODB_URI){
                await mongoose.connect(process.env.MONGODB_URI);
                console.log("MongoDb connected!");
            }
        }
    }catch(e:any){
        console.log(e);
    }
};

export default connectDb;