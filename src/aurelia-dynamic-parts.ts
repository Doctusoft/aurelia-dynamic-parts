import {bindable, inlineView, ViewStrategy, InlineViewStrategy} from 'aurelia-framework';
import {PropertyDescriptor} from 'typescript-rtti';

export interface PanelDefinition<T> {
    caption?: string;
    items: PanelItemDefinition<T>[];
}

export interface PanelItemDefinition<T> {
    caption: string;
    propertyName?: string;
    template?: string;
    valueSupplier?: (panelData: T) => string;
}

@inlineView('<template><compose view.bind="viewStrategy"></compose></template>')
export class DynamicPanel {
    public viewStrategy: ViewStrategy;

    @bindable panelDefinition: PanelDefinition<any>;
    @bindable panelData: any;
    @bindable outerController: any;

    bind(bindingContext: any, overrideContext: any) {
        let template: string = '<template><div class="dynamic-panel">';
        if (this.panelDefinition.caption) {
            template += '<div class="dynamic-panel-caption">' + this.panelDefinition.caption + '</div>';
        }
        this.panelDefinition.items.forEach((item, index) => {
            template +=
                '<div class="dynamic-panel-item">' +
                '  <div class="item-label">' + item.caption + '</div>';
            if (item.propertyName) {
                template += '  <div class="item-value">${panelData.' + item.propertyName + '}</div>';
            } else if (item.template) {
                template += '  <div class="item-value">' + item.template + '</div>';
            } else if (item.valueSupplier) {
                template += '  <div class="item-value">${panelDefinition.items[' + index + '].valueSupplier(panelData)}</div>'; 
            } else {
                var e = {error: 'Please define rendering for this item', item: item, panelDefinition: this.panelDefinition};
                console.error(e); // aurelia seems to swallow these errors
                throw e;
            }
            template += '</div>';
        });
        template += '</div></template>';
        this.viewStrategy = new InlineViewStrategy(template);
    }
}

export class PanelDefinitionBuilder<T> {
	private tableDefinition : PanelDefinition<T> = { items: []};
	public withPropertyItem(propertyDescriptor: PropertyDescriptor, caption: string) {
		this.tableDefinition.items.push({
			caption: caption,
			propertyName: propertyDescriptor.name
		});
		return this;
	}
    public withFunctionItem(valueSupplier: (panelData: T)=> string, caption:string) {
		this.tableDefinition.items.push({
			caption: caption,
			valueSupplier: (panelData: T) => {
                try {
                    return valueSupplier(panelData);
                } catch (_) {
                    // silently fall back to emptystring in case of an error
                    return '';
                }
            }
		});
        return this;
    }
	public withTemplateItem(template: string, caption: string) {
		this.tableDefinition.items.push({
			caption: caption,
			template: template
		});
		return this;
	}
	public build(): PanelDefinition<T> {
		return this.tableDefinition;
	}
}

export interface TableDefinition {
	columns: ColumnDefinition[];
    rowStyleClass?: string;
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
    @bindable outerController: any;

	bind(bindingContext: any, overrideContext: any) {
		let template: string = '<template><table><thead>';
		this.tableDefinition.columns.forEach(column => {
			template += '<th>' + column.caption + '</th>';
		});
		template += '</thead><tbody>';
		template += '<tr repeat.for="item of tableData" '
        if (this.tableDefinition.rowStyleClass) {
            template += ' class="' + this.tableDefinition.rowStyleClass + '" ';
        }
        template += '>';
		this.tableDefinition.columns.forEach(column => {
            if (column.propertyName) {
			    template += '<td>${item.' + column.propertyName + '}</td>';
            } else if (column.template) {
                template += '<td>' + column.template + '</td>';
            } else throw {error: 'Please define rendering for this column', column: column, tableDefinition: this.tableDefinition };
		});
		template += '</tr>';
		template += '</tbody><slot name="tfoot"></slot></table></template>';
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
	public withTemplateColumn(template: string, caption: string) {
		this.tableDefinition.columns.push({
			caption: caption,
			template: template,
		});
		return this;
	}
	public build(): TableDefinition {
		return this.tableDefinition;
	}
}

