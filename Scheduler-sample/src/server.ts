import express from "express"
import bodyParser from "body-parser"
import storeTimeStampRoute from "./routes/storeTimeStamp.routes"

function app_build() {
    const port = process.env.PORT || 3000;

    let app = express()
    app.listen(port, ()=>{
        console.log(`App started on port ${port}`)
    })

    //Default route
    app.get('/', (req: any, res: any) => {
        res.send('You are on default route')
    })

    // Middleware to parse JSON data
    app.use(bodyParser.json());

    storeTimeStampRoute(app)
}

export default app_build;