import {bindable, inlineView, ViewStrategy, InlineViewStrategy} from 'aurelia-framework';
import {PropertyDescriptor} from 'typescript-rtti';

export interface PanelDefinition {
    caption?: string;
    items: PanelItemDefinition[];
}

export interface PanelItemDefinition {
    caption: string;
    propertyName?: string;
    template?: string;
}

@inlineView('<template><compose view.bind="viewStrategy"></compose></template>')
export class DynamicPanel {
    public viewStrategy: ViewStrategy;

    @bindable panelDefinition: PanelDefinition;
    @bindable panelData: any;

    bind(bindingContext: any, overrideContext: any) {
        let template: string = '<template><div class="dynamic-panel">';
        if (this.panelDefinition.caption) {
            template += '<div class="dynamic-panel-caption">' + this.panelDefinition.caption + '</div>';
        }
        this.panelDefinition.items.forEach(item => {
            template +=
                '<div class="dynamic-panel-item">' +
                '  <div class="item-label">' + item.caption + '</div>';
            if (item.propertyName) {
                template += '  <div class="item-value">${panelData.' + item.propertyName + '}</div>';
            } else if (item.template) {
                template += '  <div class="item-value">' + item.template + '</div>';
            } else {
                throw {error: 'Please define rendering for this item', item: item, panelDefinition: this.panelDefinition};
            }
            template += '</div>';
        });
        template += '</div></template>';
        this.viewStrategy = new InlineViewStrategy(template);
    }
}

export class PanelDefinitionBuilder {
	private tableDefinition : PanelDefinition = { items: []};
	public withPropertyItem(propertyDescriptor: PropertyDescriptor, caption: string) {
		this.tableDefinition.items.push({
			caption: caption,
			propertyName: propertyDescriptor.name
		});
		return this;
	}
	public build(): PanelDefinition {
		return this.tableDefinition;
	}
}

export interface TableDefinition {
	columns: ColumnDefinition[];
}

export interface ColumnDefinition {
	caption: string;
	propertyName?: string;
    template?: string;
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
            if (column.propertyName) {
			    template += '<td>${item.' + column.propertyName + '}</td>';
            } else if (column.template) {
                template += '<td>' + column.template + '</td>';
            } else throw {error: 'Please define rendering for this column', column: column, tableDefinition: this.tableDefinition };
		});
		template += '</tr>';
		template += '</tbody></table></template>';
		this.viewStrategy = new InlineViewStrategy(template);
	}
}

export class TableDefinitionBuilder {
	private tableDefinition : TableDefinition = { columns: []};
	public withPropertyColumn(propertyDescriptor: PropertyDescriptor, caption: string) {
		this.tableDefinition.columns.push({
			caption: caption,
			propertyName: propertyDescriptor.name
		});
		return this;
	}
	public build(): TableDefinition {
		return this.tableDefinition;
	}
}

