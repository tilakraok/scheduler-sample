import { Scheduler } from "../services/scheduler";

export class StoreTimeStamp {
    public static thirthySec = '*/30 * * * * *';
    public static deviceInfo = {}

    public static async store_time_stamp(req, res) {
        const { device_guid, path } = req.body;

        if (!device_guid || !path) {
            return res.status(400).json({ error: 'Bad Request. Missing fields.' });
        }

        if(!Scheduler.timing.hasOwnProperty(path)){
            return res.status(400).json({ error: 'Invalid Path.' });   
        }

        /* 
            This code is to ignore if job is alreary present for the particular path 
            Here I was not sure should we send back the response Job already preset or should we re-schedule it.
            
            if(Scheduler.scheduledJobs[path]) {
                return res.status(400).json({ error: 'Job already preset.' });
            } 
        */

        const currentTimeStamp = Math.floor(new Date().getTime() / 1000)
        StoreTimeStamp.deviceInfo[device_guid] = {...req.body, ...{timestamp:currentTimeStamp }};

        //Check for already available job. If present, update exiting job else create a new job
        if (Scheduler.scheduledJobs[path] && Scheduler.scheduledJobs[path].cancel) {
            console.log(`Re-scheduling job "${path}" for every "${Scheduler.timing[path]}" sec`)
            Scheduler.scheduledJobs[path].cancel();
            Scheduler.scheduledJobs[path].reschedule(`*/${Scheduler.timing[path]} * * * * *`);
        } else {
            Scheduler.schedule_job(path)
        }

        res.status(200).json({ message:"Timestamp stored successfully", device_info:  StoreTimeStamp.deviceInfo[device_guid]});
    }

    public static process_job(path) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        for (const device_guid in StoreTimeStamp.deviceInfo) {
            const lastTimestamp = StoreTimeStamp.deviceInfo[device_guid].timestamp;
            if (currentTimestamp - lastTimestamp >= Scheduler.timing[path]) {
                console.log(`Device "${device_guid}" and path "${path}" didn't receive any new message`);
            }
        }
      }
}
