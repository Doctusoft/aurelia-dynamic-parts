import {PropertyDescriptor} from 'typescript-rtti';
import {PanelDefinition} from './dynamic-panel';

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

