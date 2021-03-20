import * as dotenv from 'dotenv';

dotenv.config();

import {NjMvcConfig} from "./nj-mvc-config";
import axios from 'axios';
import * as moment from 'moment';

async function run() {
    for (const locationId of NjMvcConfig.locationIDs) {
        for (const serviceId of NjMvcConfig.serviceIDs) {
            for (const date of NjMvcConfig.getDatesForThisAndNextMonths()) {
                await sleep(1000);
                let url = `${NjMvcConfig.baseURL}&locationId=${locationId}&appointmentId=${serviceId}&date=${date}`;
                const response = await axios.get(url)
                if (response.data.length !== 0) {
                    // @ts-ignore
                    const humanMonth = moment(date).format('MMMM');
                    sendTelegramMessage(`Appointment time is available in ${NjMvcConfig.getLocationNameByIds(locationId)} in ${humanMonth}. Response: ${JSON.stringify(response.data)}`);
                    console.log(`Available time found for: [${locationId}, ${serviceId}, ${date}]`);
                } else {
                    console.log(`No available dates for: [${locationId}, ${serviceId}, ${date}]`);
                }
            }
        }
    }
}

function sendTelegramMessage(message: string) {
    axios.post(`${process.env.TELEGRAM_BASE_URL}${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_GROUP_ID}&text=${message}`)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Watcher service started...');
setInterval(run, 10000);