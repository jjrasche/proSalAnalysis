(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_google_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-google-charts */ "./node_modules/ng2-google-charts/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _components_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/app.component */ "./src/app/components/app.component.ts");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _components_spinner_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/spinner.component */ "./src/app/components/spinner.component.ts");









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _components_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _components_spinner_component__WEBPACK_IMPORTED_MODULE_8__["SpinnerComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                ng2_google_charts__WEBPACK_IMPORTED_MODULE_3__["Ng2GoogleChartsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"]
            ],
            providers: [],
            bootstrap: [_components_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/app.component.css":
/*!**********************************************!*\
  !*** ./src/app/components/app.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field--no-underline .mat-input-underline {\n  background-color: transparent;\n}\n\nh4 {\n  margin: 0 0 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDhCQUE4QjtDQUMvQjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWZvcm0tZmllbGQtLW5vLXVuZGVybGluZSAubWF0LWlucHV0LXVuZGVybGluZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5oNCB7XG4gIG1hcmdpbjogMCAwIDBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/components/app.component.html":
/*!***********************************************!*\
  !*** ./src/app/components/app.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [hidden]=\"updatingChart\" fxLayout.gt-sm=\"row\" fxLayout=\"row\" fxLayoutAlign=\"left stretch\">\n  <div fxLayout=\"column\" fxFlex=\"100\">\n    <div id=\"chart_div\"></div>\n  </div>\n</div>\n\n<div [hidden]=\"!updatingChart\">\n  <app-spinner></app-spinner>\n</div>\n\n<form fxLayout.gt-sm=\"row\" fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" [formGroup]=\"formGroup\" (keypress)=\"onEnter($event)\">\n  <div fxLayout=\"column\" fxFlex=\"40\">\n    <mat-form-field >\n      <mat-label><b>Base Pay</b></mat-label>\n      <input id=\"basePay\" type=\"number\" matInput formControlName=\"basePay\" (keypress)=\"onEnter($event)\">\n    </mat-form-field>\n    <mat-form-field>\n      <mat-label><b>Percent Production</b></mat-label>\n      <input id=\"percentProduction\" type=\"number\" min=\"0\" max=\"100\" matInput formControlName=\"percentProduction\" (keypress)=\"onEnter($event)\">\n    </mat-form-field>\n    <mat-form-field>\n      <mat-label><b>Static Employee Costs</b></mat-label>\n      <input id=\"staticCosts\" type=\"number\" min=\"0\" max=\"1\" matInput formControlName=\"staticCosts\" (keypress)=\"onEnter($event)\">\n    </mat-form-field>\n    <mat-form-field>\n      <mat-label><b>Pay Based Cost Percentage</b></mat-label>\n      <input id=\"payAdjustedCostPercent\" type=\"number\" min=\"0\" max=\"100\" step=\"0.1\" matInput formControlName=\"payAdjustedCostPercent\" (keypress)=\"onEnter($event)\">\n    </mat-form-field>\n  </div>\n  <div fxLayout=\"column\" fxFlex=\"40\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" >\n      <div fxLayout=\"column\" fxFlex=\"48\">\n        <mat-form-field fxLayout=\"column\" fxFlex=\"48\">\n          <mat-label><b>25% loss point</b></mat-label>\n          <input id=\"lossPoint\" readonly matInput [value]=\"lossPoint\">\n        </mat-form-field>\n        <section class=\"mat-typography\">\n          <h4>Stop Loss</h4>\n          <mat-checkbox id=\"stopLoss\" (change)=\"setStopLoss()\" [(ngModel)]=\"stopLoss\" [ngModelOptions]=\"{standalone: true}\"> </mat-checkbox>\n        </section>\n      </div>\n      <div fxLayout=\"column\" fxFlex=\"48\">\n        <mat-form-field>\n          <mat-label><b>production gain point</b></mat-label>\n          <input id=\"gainPoint\" readonly matInput [value]=\"gainPoint\">\n        </mat-form-field>\n        <mat-form-field>\n          <mat-label><b>Desired Salary</b></mat-label>\n          <input id=\"desiredSalary\" matInput [(ngModel)]=\"desiredSalary\" [ngModelOptions]=\"{standalone: true}\" >\n        </mat-form-field>\n      </div>\n    </div>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/components/app.component.ts":
/*!*********************************************!*\
  !*** ./src/app/components/app.component.ts ***!
  \*********************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_chart_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/chart.service */ "./src/app/services/chart.service.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent(fb, chartService) {
        this.fb = fb;
        this.chartService = chartService;
        this.updatingChart = false;
        this.stepSize = 500;
        this.calculatedDomain = { min: 120000, max: 2000000 };
        this.xAxis = { min: 120000, max: 720000 };
        this.desiredSalary = 85000;
        this.stopLoss = false;
        this.costToProductionLossPercent = .25;
    }
    AppComponent.prototype.ngOnInit = function () {
        // let func = function () {
        //   this.status = !this.status;
        //   setTimeout(() => { func.bind(this)() }, 1000)
        // };
        // func.bind(this)();
        this.formGroup = this.fb.group({
            "basePay": 78000,
            "percentProduction": 18.5,
            "staticCosts": 5700,
            "payAdjustedCostPercent": 8.38
        });
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
    };
    AppComponent.prototype.drawChart = function (where) {
        if (where === void 0) { where = "onload"; }
        if (this.updatingChart) {
            return;
        }
        this.updatingChart = true;
        // console.log(`${where}  ${this.updatingChart}`);
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('number', 'Production');
        dataTable.addColumn('number', 'Cost/Production');
        // A column for custom tooltip content
        dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
        dataTable.addColumn({ type: 'string', role: 'style' });
        dataTable.addRows(this.googleCreateProductionData());
        var options = {
            tooltip: { isHtml: true },
            legend: 'none',
            explorer: {
                actions: ['dragToZoom', 'rightClickToReset'],
                axis: 'horizontal',
                keepInBounds: true,
                maxZoomIn: 4.0
            }
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(dataTable, options);
        this.updatingChart = false;
        // console.log(`${where}  ${this.updatingChart}`);
    };
    AppComponent.prototype.googleCreateProductionData = function () {
        var _this = this;
        var proSalData = new Array();
        var xVal = this.calculatedDomain.min;
        while (xVal <= this.calculatedDomain.max) {
            proSalData.push(this.proSalFunction(xVal));
            xVal += this.stepSize;
        }
        // set gain and loss points
        var lossDataPoint = this.chartService.closest(proSalData, "costToProduction", 25);
        this.lossPoint = lossDataPoint == null ? null : lossDataPoint.production;
        var gainDataPoint = this.chartService.closest(proSalData, "totalPay", this.desiredSalary);
        this.gainPoint = gainDataPoint == null ? null : gainDataPoint.production;
        var ret = new Array();
        proSalData
            .filter(function (psd) { return _this.xAxis.min < psd.production && psd.production < _this.xAxis.max; })
            .forEach(function (psd) {
            ret.push([psd.production, psd.costToProduction, _this.chartService.createToolTipString(psd), _this.chartService.psdToColor(psd, _this.desiredSalary)]);
        });
        // console.log(JSON.stringify(ret));
        return ret;
    };
    AppComponent.prototype.proSalFunction = function (production) {
        var basePay = this.formGroup.get("basePay").value;
        var percentProduction = this.chartService.toPercent(this.formGroup.get("percentProduction").value);
        var staticCosts = this.formGroup.get("staticCosts").value;
        var payAdjustedCostPercent = this.chartService.toPercent(this.formGroup.get("payAdjustedCostPercent").value);
        var productionPay = production * percentProduction;
        var additionalProductionPay = productionPay - basePay > 0 ?
            productionPay - basePay : 0;
        var totalPay = 0;
        var totalCost = 0;
        var costToProduction = 0;
        if (this.stopLoss) {
            totalPay = basePay + additionalProductionPay;
            totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
            costToProduction = totalCost / production;
            // determine totalPay based on costToProductionLossPercent
            if (costToProduction > this.costToProductionLossPercent) {
                totalPay = (this.costToProductionLossPercent * production - staticCosts) / (payAdjustedCostPercent + 1);
                totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
                costToProduction = totalCost / production;
            }
        }
        else {
            totalPay = basePay + additionalProductionPay;
            totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
            costToProduction = totalCost / production;
        }
        return {
            production: this.chartService.trunc(production),
            totalPay: this.chartService.trunc(totalPay),
            totalCost: this.chartService.trunc(totalCost),
            costToProduction: this.chartService.trunc(this.chartService.fromPercent(costToProduction))
        };
    };
    AppComponent.prototype.onEnter = function (event) {
        if (event.keyCode == 13) {
            if (this.debouncedInput && this.debouncedInput.timeStamp == event.timeStamp) {
                // console.log("throwing away one.")
                return;
            }
            this.debouncedInput = event;
            this.drawChart("onEnter");
            return false;
        }
    };
    AppComponent.prototype.setStopLoss = function () {
        this.drawChart();
        if (this.stopLoss) {
            this.formGroup.get("basePay").disable();
        }
        else {
            this.formGroup.get("basePay").enable();
        }
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/components/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/components/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_chart_service__WEBPACK_IMPORTED_MODULE_3__["ChartService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/components/spinner.component.ts":
/*!*************************************************!*\
  !*** ./src/app/components/spinner.component.ts ***!
  \*************************************************/
/*! exports provided: SpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerComponent", function() { return SpinnerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-spinner',
            template: "  \n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n      <mat-spinner> </mat-spinner>\n    </div>\n    ",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());



/***/ }),

/***/ "./src/app/material/material.module.ts":
/*!*********************************************!*\
  !*** ./src/app/material/material.module.ts ***!
  \*********************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");




var modules = [
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatExpansionModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatGridListModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginatorModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSortModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatBadgeModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
    _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatChipsModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatAutocompleteModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
];
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: modules,
            exports: modules,
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/services/chart.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/chart.service.ts ***!
  \*******************************************/
/*! exports provided: ChartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartService", function() { return ChartService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ChartService = /** @class */ (function () {
    function ChartService() {
    }
    ChartService.prototype.psdToColor = function (proSalData, desiredSalary) {
        // if (proSalData.totalPay >= desiredSalary) {
        //   return "gold";
        // } else 
        var opacity = proSalData.totalPay <= desiredSalary ? .15 : 1;
        if (proSalData.costToProduction > 25) {
            return "color: red; opacity: " + opacity + ";";
        }
        else if (proSalData.costToProduction > 24) {
            return "color: yellow; opacity: " + opacity + ";";
        }
        else if (proSalData.costToProduction > 22) {
            return "color: green; opacity: " + opacity + ";";
        }
        else if (proSalData.costToProduction > 21) {
            return "color: yellow; opacity: " + opacity + ";";
        }
        return "color: red; opacity: " + opacity + ";";
    };
    ChartService.prototype.closest = function (array, key, goal) {
        return array.reduce(function (prev, curr) {
            return (Math.abs(curr[key] - goal) <= Math.abs(prev[key] - goal) ? curr : prev);
        });
    };
    ChartService.prototype.createToolTipString = function (data) {
        return "<span>\n        <span>Production: " + data.production.toString() + "</span></br>\n        <span>Cost: " + data.totalCost.toString() + "</span></br>\n        <span><b>Pay: " + data.totalPay.toString() + "</b></span></br>\n        <span>Cost/Production: " + data.costToProduction.toString() + "</span>\n      </span>";
    };
    ChartService.prototype.trunc = function (input, precision) {
        if (precision === void 0) { precision = 2; }
        return parseFloat(input.toFixed(precision));
    };
    ChartService.prototype.toPercent = function (input) {
        return input / 100;
    };
    ChartService.prototype.fromPercent = function (input) {
        return input * 100;
    };
    ChartService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ChartService);
    return ChartService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jim/WorkSpace/proSalAnalysis/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map