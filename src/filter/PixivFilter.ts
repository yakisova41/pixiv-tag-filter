import { illust } from "../pixivApi";

export class PixivFilter {
    private filters: Filter[] = [];

    public addFilter(filter: Filter) {
        this.filters.push(filter);
    }

    public run(ilusts: illust[]): illust[] {
        const result: illust[] = [];

        ilusts.forEach((ilust, index) => {
            let remove = false;

            this.filters.forEach((filter) => {
                if (filter.filter(ilust)) {
                    remove = true;
                }
            });

            if (!remove) {
                result.push(ilust);
            }
        });

        return result;
    }
}

export type Filter = {
    filter: (illust: illust) => boolean;
};
