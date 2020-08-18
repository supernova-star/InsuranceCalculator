import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; import { CONSTANTS, CHART } from './constants/constants';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
    public LABELS = CONSTANTS;
    public submitted = false;
    public model: any = {};
    public recoveryPeriod: number;
    public CHART = CHART;
    public data: Object[];
    public primaryXAxis: Object;
    public primaryYAxis: Object;
    public marker: Object;
    public tooltip: Object;
    public chartArea: Object;
    public width: string;
    public height: string;
    public estimated_today: number;
    public estimated_10years: number;

    constructor() { }

    public inputValidator(event: any) {
        const pattern = /^\d+(\$.\d+)?$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^\d+(\$.{1}\d+)]/g, '');
        }
    }

    public currencyInputChanged(value: any) {
        return Number(value.replace(/[$,]/g, ''));
    }

    ngOnInit(): void {
        // Initializing Primary X Axis
        this.primaryXAxis = {
            valueType: 'Category',
            interval: 1,
            majorGridLines: { width: 0 }
        };
        // Initializing Primary Y Axis
        this.primaryYAxis = {
            labelFormat: '${value}',
            interval: 100000,
            majorGridLines: { width: 1 },
            majorTickLines: { width: 1 },
            lineStyle: { width: 0 }
        };
        this.marker = {
            dataLabel: {
                visible: true,
                position: 'Top',
                font: {
                    fontWeight: '600',
                    color: '#ffffff'
                }
            }
        };
        this.tooltip = {
            enable: true
        };
        this.chartArea = {
            border: {
                width: 0
            }
        };
        this.width = Browser.isDevice ? '100%' : '80%';
        this.height = Browser.isDevice ? '100%' : '65%';
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        } else if (this.recoveryPeriod) {
            setTimeout(() => {
                this.submitted = true;
                let total = (this.model.desired * this.recoveryPeriod) + this.model.healthcare + this.model.home_modification + (this.model.homecare * this.recoveryPeriod) + (this.model.others * this.recoveryPeriod);
                const estimated_today = total;
                const estimated_10years = (total * 1.2) / 6;
                this.data = [
                    {
                        x: CHART.ESTIMATED_COST_TODAY,
                        y: estimated_today
                    }, {
                        x: CHART.ESTIMATED_COST_10YEARS,
                        y: estimated_10years
                    }
                ];
                this.estimated_today = estimated_today;
                this.estimated_10years = estimated_10years;
            }, 3000);
        } else {
            alert('Please enter recovery period!!');
        }
    }
}
