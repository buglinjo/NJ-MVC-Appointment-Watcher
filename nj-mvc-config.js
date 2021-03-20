"use strict";
exports.__esModule = true;
exports.NjMvcConfig = void 0;
var _ = require("lodash");
var _a = process.env, NJMVC_LOCATION_IDS = _a.NJMVC_LOCATION_IDS, NJMVC_SERVICE_IDS = _a.NJMVC_SERVICE_IDS, NJMVC_BASE_URL = _a.NJMVC_BASE_URL;
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
    NjMvcConfig.getDatesForThisAndNextMonths = function () {
        var date = new Date();
        return [
            new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
            new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString(),
        ];
    };
    NjMvcConfig.baseURL = NJMVC_BASE_URL !== null && NJMVC_BASE_URL !== void 0 ? NJMVC_BASE_URL : '';
    NjMvcConfig.serviceIDs = NJMVC_SERVICE_IDS ? NJMVC_SERVICE_IDS.split(',') : [];
    NjMvcConfig.locationIDs = NJMVC_LOCATION_IDS ? NJMVC_LOCATION_IDS.split(',') : [];
    return NjMvcConfig;
}());
exports.NjMvcConfig = NjMvcConfig;
