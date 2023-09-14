import {StoreTimeStamp} from "../controllers/storeTimeStamp.controller"
import {Router} from "express";
let router = Router();

export default app =>{
    router.post('/', StoreTimeStamp.store_time_stamp)

    app.use('/api/storetimestamp', router);
}