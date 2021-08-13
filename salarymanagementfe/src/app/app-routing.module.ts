import { InformationComponent } from './content/information/information.component';
import { BoardPayrollComponent } from './content/board-payroll/board-payroll.component';
import { NotFoundComponentComponent } from './content/not-found-component/not-found-component.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'boardPayroll',
				component: BoardPayrollComponent,
			},
			{
				path: 'information',
				component: InformationComponent,
			}
		
		],
	},
	{ path : '**' , component: NotFoundComponentComponent}
	

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
