/**
 * Created by glenn on 22.12.17.
 */
/* @ngInject */
export function unicornifyService($q, unicornifyConstants) {
    const service = {
        getDataFor
    };
    return service;
    ////////////
    async function getDataFor(filter) {
        const data = await $q.resolve([]);
        console.log(data);
        return data;
    }
}
