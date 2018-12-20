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

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout.gt-sm=\"row\" fxLayout=\"row\" fxLayoutAlign=\"left stretch\">\n  <div fxLayout=\"column\" fxFlex=\"100\">\n    <div id=\"chart_div\"></div>\n  </div>\n</div>\n<form fxLayout.gt-sm=\"row\" fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" [formGroup]=\"formGroup\" (keydown)=\"onEnter($event)\">\n  <div fxLayout=\"column\" fxFlex=\"40\">\n    <mat-form-field>\n      <mat-label><b>Base Pay</b></mat-label>\n      <input id=\"basePay\" type=\"number\" (blur)=\"drawChart()\" matInput formControlName=\"basePay\">\n    </mat-form-field>\n    <mat-form-field>\n      <mat-label><b>Percent Production</b></mat-label>\n      <input id=\"percentProduction\" type=\"number\" min=\"0\" max=\"100\" (blur)=\"drawChart()\" matInput formControlName=\"percentProduction\">\n    </mat-form-field>\n    <mat-form-field>\n      <mat-label><b>Static Employee Costs</b></mat-label>\n      <input id=\"staticCosts\" type=\"number\" min=\"0\" max=\"1\" (blur)=\"drawChart()\" matInput formControlName=\"staticCosts\">\n    </mat-form-field>\n    <mat-form-field>\n      <mat-label><b>Pay Based Cost Percentage</b></mat-label>\n      <input id=\"payAdjustedCostPercent\" type=\"number\" min=\"0\" max=\"100\" step=\"0.1\" (blur)=\"drawChart()\" matInput formControlName=\"payAdjustedCostPercent\">\n    </mat-form-field>\n  </div>\n  <div fxLayout=\"column\" fxFlex=\"40\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" >\n      <mat-form-field fxLayout=\"column\" fxFlex=\"48\">\n        <mat-label><b>25% loss point</b></mat-label>\n        <input id=\"lossPoint\" readonly matInput [value]=\"lossPoint\">\n      </mat-form-field>\n      <div fxLayout=\"column\" fxFlex=\"48\">\n        <mat-form-field>\n          <mat-label><b>production gain point</b></mat-label>\n          <input id=\"gainPoint\" readonly matInput [value]=\"gainPoint\">\n        </mat-form-field>\n        <mat-form-field>\n          <mat-label><b>Desired Base Pay</b></mat-label>\n          <input id=\"desiredBasePay\" matInput [(value)]=\"desiredBasePay\" (blur)=\"drawChart()\">\n        </mat-form-field>\n      </div>\n    </div>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var AppComponent = /** @class */ (function () {
    function AppComponent(fb) {
        this.fb = fb;
        this.stepSize = 200;
        this.calculatedDomain = { min: this.stepSize, max: 2000000 };
        this.xAxis = { min: 50000, max: 700000 };
        this.desiredBasePay = 78000;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.formGroup = this.fb.group({
            "basePay": 78000,
            "percentProduction": 18.5,
            "staticCosts": 5700,
            "payAdjustedCostPercent": 8.38
        });
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
        // this.lineChartData = {
        //   chartType: 'LineChart',
        //   dataTable: this.createDataTable(),
        //   options: { 'title': 'Production' },
        // };
    };
    AppComponent.prototype.drawChart = function () {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('number', 'Production');
        dataTable.addColumn('number', 'Cost/Production');
        // A column for custom tooltip content
        dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
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
    };
    AppComponent.prototype.createDataTable = function () {
        var ret = [
            ['Production', 'Cost/Production'],
        ];
        var productionData = this.createProductionData();
        return ret.concat(productionData);
    };
    AppComponent.prototype.createProductionData = function () {
        var data = new Array();
        var xVal = this.calculatedDomain.min;
        while (xVal <= this.calculatedDomain.max) {
            var proSalData = this.proSalFunction(xVal);
            data.push([xVal, proSalData.costToProduction, proSalData.totalPay, proSalData.totalCost]);
            xVal += this.stepSize;
        }
        return data;
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
        var lossDataPoint = proSalData.find(function (psd) { return psd.costToProduction < 25; });
        this.lossPoint = lossDataPoint == null ? null : lossDataPoint.production;
        var gainDataPoint = proSalData.find(function (psd) { return psd.totalPay > _this.desiredBasePay; });
        var gainDataPoint2 = this.closest(proSalData, "totalPay", this.desiredBasePay);
        this.gainPoint = gainDataPoint2 == null ? null : gainDataPoint2.production;
        console.log(proSalData.length);
        var ret = new Array();
        proSalData
            .filter(function (psd) { return _this.xAxis.min < psd.production && psd.production < _this.xAxis.max; })
            .forEach(function (psd) {
            ret.push([psd.production, psd.costToProduction, _this.createToolTipString(psd)]);
        });
        return ret;
    };
    AppComponent.prototype.closest = function (array, key, goal) {
        return array.reduce(function (prev, curr) {
            return (Math.abs(curr[key] - goal) < Math.abs(prev[key] - goal) ? curr : prev);
        });
    };
    AppComponent.prototype.createToolTipString = function (data) {
        return "<span>\n        <span>Production: " + data.production.toString() + "</span></br>\n        <span>Cost: " + data.totalCost.toString() + "</span></br>\n        <span><b>Pay: " + data.totalPay.toString() + "</b></span></br>\n        <span>Cost/Production: " + data.costToProduction.toString() + "</span>\n      </span>";
    };
    AppComponent.prototype.proSalFunction = function (production) {
        var basePay = this.formGroup.get("basePay").value;
        var percentProduction = this.toPercent(this.formGroup.get("percentProduction").value);
        var staticCosts = this.formGroup.get("staticCosts").value;
        var payAdjustedCostPercent = this.toPercent(this.formGroup.get("payAdjustedCostPercent").value);
        var productionPay = production * percentProduction;
        var additionalProductionPay = productionPay - basePay > 0 ?
            productionPay - basePay : 0;
        var totalPay = basePay + additionalProductionPay;
        var totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
        var costToProduction = totalCost / production;
        return {
            production: this.trunc(production),
            totalPay: this.trunc(totalPay),
            totalCost: this.trunc(totalCost),
            costToProduction: this.trunc(this.fromPercent(costToProduction))
        };
    };
    AppComponent.prototype.trunc = function (input, precision) {
        if (precision === void 0) { precision = 2; }
        return parseFloat(input.toFixed(precision));
    };
    AppComponent.prototype.toPercent = function (input) {
        return input / 100;
    };
    AppComponent.prototype.fromPercent = function (input) {
        return input * 100;
    };
    AppComponent.prototype.onEnter = function (event) {
        if (event.keyCode == 13) {
            this.drawChart();
        }
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], AppComponent);
    return AppComponent;
}());

var Domain = /** @class */ (function () {
    function Domain() {
    }
    return Domain;
}());
var ProSalData = /** @class */ (function () {
    function ProSalData() {
    }
    return ProSalData;
}());


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
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./material/material.module */ "./src/app/material/material.module.ts");








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]
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
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
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