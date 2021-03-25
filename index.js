"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var nj_mvc_config_1 = require("./nj-mvc-config");
var axios_1 = require("axios");
var moment = require("moment");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, locationId, _b, _c, serviceId, _d, _e, date, url, response, humanMonth;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _i = 0, _a = nj_mvc_config_1.NjMvcConfig.locationIDs;
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    locationId = _a[_i];
                    _b = 0, _c = nj_mvc_config_1.NjMvcConfig.serviceIDs;
                    _f.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 8];
                    serviceId = _c[_b];
                    _d = 0, _e = nj_mvc_config_1.NjMvcConfig.getDates();
                    _f.label = 3;
                case 3:
                    if (!(_d < _e.length)) return [3 /*break*/, 7];
                    date = _e[_d];
                    return [4 /*yield*/, sleep(1000)];
                case 4:
                    _f.sent();
                    url = nj_mvc_config_1.NjMvcConfig.baseURL + "&locationId=" + locationId + "&appointmentId=" + serviceId + "&date=" + date;
                    return [4 /*yield*/, axios_1["default"].get(url)];
                case 5:
                    response = _f.sent();
                    if (response.data.length !== 0) {
                        humanMonth = moment(date).format('MMMM');
                        sendTelegramMessage("Appointment time is available in " + nj_mvc_config_1.NjMvcConfig.getLocationNameByIds(locationId) + " in " + humanMonth + ". Response: " + JSON.stringify(response.data));
                        console.log("Available time found for: [" + locationId + ", " + serviceId + ", " + date + "]");
                    }
                    else {
                        console.log("No available dates for: [" + locationId + ", " + serviceId + ", " + date + "]");
                    }
                    _f.label = 6;
                case 6:
                    _d++;
                    return [3 /*break*/, 3];
                case 7:
                    _b++;
                    return [3 /*break*/, 2];
                case 8:
                    _i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function sendTelegramMessage(message) {
    axios_1["default"].post("" + process.env.TELEGRAM_BASE_URL + process.env.TELEGRAM_BOT_TOKEN + "/sendMessage?chat_id=" + process.env.TELEGRAM_GROUP_ID + "&text=" + message);
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
console.log('Watcher service started...');
setInterval(run, 10000);
