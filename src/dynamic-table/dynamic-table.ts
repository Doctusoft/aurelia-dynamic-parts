import {bindable, inlineView, ViewStrategy, InlineViewStrategy} from 'aurelia-framework';

export interface TableDefinition {
	columns: ColumnDefinition[];
}

export interface ColumnDefinition {
	caption: string;
	propertyName?: string;
}

@inlineView('<template><compose view.bind="viewStrategy"></compose></template>')
export class DynamicTable {
	public viewStrategy: ViewStrategy;

	@bindable tableDefinition: TableDefinition;
	@bindable tableData: any [];

	bind(bindingContext: any, overrideContext: any) {
		let template: string = '<template><table><thead>';
		this.tableDefinition.columns.forEach(column => {
			template += '<th>' + column.caption + '</th>';
		});
		template += '</thead><tbody>';
		template += '<tr repeat.for="item of tableData">';
		this.tableDefinition.columns.forEach(column => {
			template += '<td>${item.' + column.propertyName + '}</td>';
		});
		template += '</tr>';
		template += '</tbody></table></template>';
		this.viewStrategy = new InlineViewStrategy(template);
	}
}
