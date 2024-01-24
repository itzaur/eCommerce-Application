import { store } from '../../redux/store/store';
import { cardsApi } from '../../redux/api/searchCards';
import { checkSelectedTypeCategory } from '../../utils/checkSelectedTypeCategory';
import { LoaderStoreResult } from '../../types';

export async function loaderStore(): Promise<LoaderStoreResult | undefined> {
    const sideBarListResponse = store.dispatch(
        cardsApi.endpoints.getCategories.initiate(undefined)
    );

    try {
        const sideBarList = await sideBarListResponse.unwrap();
        if (sideBarList) {
            return checkSelectedTypeCategory(sideBarList);
        }
    } catch (e) {
        if (e instanceof Error) throw new Error(e.message);
    } finally {
        sideBarListResponse.unsubscribe();
    }
    return undefined;
}
