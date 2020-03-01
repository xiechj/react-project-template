import store from '@client/store/index';
import { InjectStoreModule } from 'natur';

export default class StoreModule {
	storeModule!: InjectStoreModule;

	constructor(moduleName: string) {
		if (!store.hasModule(moduleName)) {
			console.warn(`${moduleName}不存在！`);
		}
		this.setModule(moduleName);
		this.listenUpdate(moduleName);
	}

	setModule(moduleName:string) {
		this.storeModule = store.getModule(moduleName);
	}

	listenUpdate(moduleName: string) {
		store.subscribe(moduleName, () => this.setModule(moduleName));
	}
}
