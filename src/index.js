import dotenv from "dotenv";



import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch((err) => {
    console.error("MONDO db connection Failed !!! ", err);
    
})
/*
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`) , 
            app.on("error", (err) => {
                console.error("ERROR", err);
                throw err
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port ${process.env.PORT}`);
            });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("ERROR", error);
        throw err
    }
})()

/** */