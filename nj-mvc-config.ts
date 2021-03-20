import * as _ from 'lodash';

const {NJMVC_LOCATION_IDS, NJMVC_SERVICE_IDS, NJMVC_BASE_URL} = process.env;

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
    static locationIDs = NJMVC_LOCATION_IDS ? NJMVC_LOCATION_IDS.split(',') : [];

    static getLocationNameByIds(id: string): string | null {
        const location = _.find(locations, (l) => {
            return l.id === +id;
        });

        return location
            ? location.name
            : null;
    }

    static getDatesForThisAndNextMonths(): string[] {
        const date = new Date();

        return [
            new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
            new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString(),
        ];
    }
}

export {NjMvcConfig};


