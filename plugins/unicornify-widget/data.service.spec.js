/**
 * Created by glenn on 22.12.17.
 */
describe('c8y.pocs.unicornifyWidget: unicornifyService', () => {
    'use strict';
    const win = window;
    let $injector;
    let $rootScope;
    let $q;
    // let c8yStubsHelper: any;
    let dataService;
    beforeEach(() => {
        win.common.globalBeforeWithUI();
        // angular.mock.module('c8y.pocs.coreServiceStubsHelper');
        angular.mock.module('c8y.pocs.unicornifyWidget');
        inject((_$injector_) => {
            $injector = _$injector_;
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            // c8yStubsHelper = $injector.get('c8yStubsHelper');
            dataService = $injector.get('unicornifyService');
            win.Promise = $q;
        });
    });
    describe('getting widget data', () => {
        // let c8yMeasurements: any;
        beforeEach(() => {
            // dependencies to be stubbed
            // c8yMeasurements = $injector.get('c8yMeasurements');
        });
        it('should return correct data', done => {
            // given
            const filter = {};
            // const measurements = [];
            const expectedData = [];
            // when
            // c8yMeasurements.list = c8yStubsHelper.createListMeasurementsFake(measurements);
            dataService.getDataFor(filter).then(data => {
                // then
                expect(data).toEqual(expectedData);
                done();
            });
            $rootScope.$apply();
        });
    });
});
