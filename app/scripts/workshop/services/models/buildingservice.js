'use strict';

/**
 * @ngdoc service
 * @name cedarTechWebApp.buildingService
 * @description
 * # buildingService
 * Factory in the cedarTechWebApp.
 */
angular.module('cedarTechWebApp')
  .factory('buildingService', ['workshopapi','buildingFilter', function(workshopapi,buildingFilter) {


    var buildingServiceFactory = {};

    var buildingResource = workshopapi.buildingRessource;

    var _get = function(){
      return buildingResource.get();
    }

    var _query = function(filter){
      var URIencodedFilter = encodeURIComponent(JSON.stringify(filter));
      return buildingResource.geoJson({filter: URIencodedFilter});
    }

    var _getBuildingForMap = function(bounds){
        var filter =   buildingFilter.googleMapBoundFilter(bounds);
        return _query(filter);
    }

    var _getBuildingForDash = function(bounds, buildingTypes){
      var filter = angular.extend({}, buildingFilter.googleMapBoundFilter(bounds),buildingFilter.buildingTypeFilter(buildingTypes, true));
      return _query(filter);
    }

    buildingServiceFactory.getBuildingForMap = _getBuildingForMap;
    buildingServiceFactory.getBuildingForDash = _getBuildingForDash;
    buildingServiceFactory.query = _query;
    buildingServiceFactory.get = _get;


    // Public API here
    return buildingServiceFactory;
  }]);
