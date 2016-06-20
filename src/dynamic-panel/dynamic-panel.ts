import {bindable, inlineView, ViewStrategy, InlineViewStrategy} from 'aurelia-framework';

export interface PanelDefinition {
	caption?: string;
	items: PanelItemDefinition[];
}

export interface PanelItemDefinition {
	caption: string;
	propertyName?: string;
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
				'  <div class="item-label">' + item.caption + '</div>' +
				'  <div class="item-value">${panelData.' + item.propertyName + '}</div>' +
				'</div>';
		});
		template += '</div></template>';
		this.viewStrategy = new InlineViewStrategy(template);
	}
}
