import * as _ from 'lodash';

const {NJMVC_LOCATION_IDS, NJMVC_NUMBER_OF_MONTHS, NJMVC_SERVICE_IDS, NJMVC_BASE_URL} = process.env;

const locations = [
    {
        "id": 102,
        "name": "Bayonne"
    },
    {
        "id": 114,
        "name": "Lodi"
    },
    {
        "id": 117,
        "name": "North Bergen"
    }
];

class NjMvcConfig {
    static baseURL: string = NJMVC_BASE_URL ?? '';
    static serviceIDs = NJMVC_SERVICE_IDS ? NJMVC_SERVICE_IDS.split(',') : [];
    static numberOfMonths = NJMVC_NUMBER_OF_MONTHS ?? 1;
    static locationIDs = NJMVC_LOCATION_IDS ? NJMVC_LOCATION_IDS.split(',') : [];

    static getLocationNameByIds(id: string): string | null {
        const location = _.find(locations, (l) => {
            return l.id === +id;
        });

        return location
            ? location.name
            : null;
    }

    static getDates(): string[] {
        const date = new Date();

        let dates = [];

        for (let i = 0; i < this.numberOfMonths; i++) {
            dates.push(
                new Date(
                    date.getFullYear(),
                    date.getMonth() + i,
                    1
                ).toISOString()
            );
        }

        return dates;
    }
}

export {NjMvcConfig};


