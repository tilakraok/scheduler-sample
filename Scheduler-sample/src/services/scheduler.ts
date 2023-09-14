import {StoreTimeStamp} from "../controllers/storeTimeStamp.controller"
let schedule = require('node-schedule')
var _ = require('lodash')

export class Scheduler {
    public static scheduledJobs = {}
    public static timing = {
        ethernet: 30,
        wifi: 60,
        gsm: 90
    }

    public static schedule_job = function(path) {
        var timing = `*/${this.timing[path]} * * * * *`
            , title = path

        console.log(`Scheduling job "${title}" for every "${this.timing[path]}" sec`)

        Scheduler.scheduledJobs[path] = schedule.scheduleJob(timing, () =>{
            StoreTimeStamp.process_job(path)
        })
    }

    // This function is required if we would like to clear all the existing jobs
    public static clean_up = function(scheduledJobs) {
        _.each(scheduledJobs, function (scheduledJob) {
            scheduledJob.cancel()
        })
    }
}