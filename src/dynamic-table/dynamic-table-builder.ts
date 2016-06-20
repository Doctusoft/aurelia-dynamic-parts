import {PropertyDescriptor} from 'typescript-rtti';
import {TableDefinition} from './dynamic-table';

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

