/**
 * Created by glenn on 22.12.17.
 */

/* @ngInject */
export function unicornifyService(
  $q: angular.IQService,
  unicornifyConstants: any
) {
  const service = {
    getDataFor
  };

  return service;

  ////////////

  async function getDataFor(filter: c8y.WidgetDataFilter): Promise<any> {
    const data = await $q.resolve([]);

    console.log(data);

    return data;
  }
}
