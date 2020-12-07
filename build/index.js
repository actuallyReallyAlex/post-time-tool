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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var format_1 = __importDefault(require("date-fns/format"));
var isToday_1 = __importDefault(require("date-fns/isToday"));
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            node_fetch_1.default("https://dev.to/api/articles/", {
                method: "GET",
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                var todaysArticles = data.filter(function (datum) {
                    return isToday_1.default(new Date(datum.published_at));
                });
                todaysArticles.forEach(function (datum, i) {
                    var publishedDate = new Date(datum.published_at);
                    var today = isToday_1.default(publishedDate);
                    console.log("#" + i + ". -\tTitle - " + datum.title + "\n\tPublish Time - " + format_1.default(publishedDate, "pppp") + "\n\tIs Today? - " + today + "\n");
                });
            })
                .catch(function (error) {
                console.error(error);
            });
        }
        catch (error) {
            console.error(error);
        }
        return [2 /*return*/];
    });
}); };
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBK0I7QUFDL0IsMkRBQXFDO0FBQ3JDLDZEQUF1QztBQUl2QyxJQUFNLElBQUksR0FBRzs7UUFDWCxJQUFJO1lBQ0Ysb0JBQUssQ0FBQyw4QkFBOEIsRUFBRTtnQkFDcEMsTUFBTSxFQUFFLEtBQUs7YUFDZCxDQUFDO2lCQUNDLElBQUksQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQ25DLElBQUksQ0FBQyxVQUFDLElBQWU7Z0JBQ3BCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLO29CQUN2QyxPQUFBLGlCQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUFyQyxDQUFxQyxDQUN0QyxDQUFDO2dCQUNGLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQztvQkFDOUIsSUFBTSxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNuRCxJQUFNLEtBQUssR0FBRyxpQkFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUVyQyxPQUFPLENBQUMsR0FBRyxDQUNULE1BQUksQ0FBQyxxQkFBZ0IsS0FBSyxDQUFDLEtBQUssMkJBQXNCLGdCQUFNLENBQzFELGFBQWEsRUFDYixNQUFNLENBQ1Asd0JBQW1CLEtBQUssT0FBSSxDQUM5QixDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFDLEtBQUs7Z0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCOzs7S0FDRixDQUFDO0FBRUYsSUFBSSxFQUFFLENBQUMifQ==