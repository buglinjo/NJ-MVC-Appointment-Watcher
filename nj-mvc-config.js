"use strict";
exports.__esModule = true;
exports.NjMvcConfig = void 0;
var _ = require("lodash");
var _a = process.env, NJMVC_LOCATION_IDS = _a.NJMVC_LOCATION_IDS, NJMVC_NUMBER_OF_MONTHS = _a.NJMVC_NUMBER_OF_MONTHS, NJMVC_SERVICE_IDS = _a.NJMVC_SERVICE_IDS, NJMVC_BASE_URL = _a.NJMVC_BASE_URL;
var locations = [
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
var NjMvcConfig = /** @class */ (function () {
    function NjMvcConfig() {
    }
    NjMvcConfig.getLocationNameByIds = function (id) {
        var location = _.find(locations, function (l) {
            return l.id === +id;
        });
        return location
            ? location.name
            : null;
    };
    NjMvcConfig.getDates = function () {
        var date = new Date();
        var dates = [];
        for (var i = 0; i < this.numberOfMonths; i++) {
            dates.push(new Date(date.getFullYear(), date.getMonth() + i, 1).toISOString());
        }
        return dates;
    };
    NjMvcConfig.baseURL = NJMVC_BASE_URL !== null && NJMVC_BASE_URL !== void 0 ? NJMVC_BASE_URL : '';
    NjMvcConfig.serviceIDs = NJMVC_SERVICE_IDS ? NJMVC_SERVICE_IDS.split(',') : [];
    NjMvcConfig.numberOfMonths = NJMVC_NUMBER_OF_MONTHS !== null && NJMVC_NUMBER_OF_MONTHS !== void 0 ? NJMVC_NUMBER_OF_MONTHS : 1;
    NjMvcConfig.locationIDs = NJMVC_LOCATION_IDS ? NJMVC_LOCATION_IDS.split(',') : [];
    return NjMvcConfig;
}());
exports.NjMvcConfig = NjMvcConfig;
