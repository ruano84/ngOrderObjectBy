'use strict';

(
  function(angular) {
    return angular
      .module('ngOrderObjectBy', [])
      .filter('orderObjectBy', function() {
        function orderObjectBy(_items, _field, _reverse) {
          var filtered;
          filtered = [];

          async.map(_items, function(_item, _cb) {

            if (angular.isObject(_item)) {
              _cb(null, _item);
            }

            //item.key = key;

          }, function (_err, _filtered) {
            console.log('filtered', _filtered);
            filtered = _filtered;
          });

          return filtered;
        }

        orderObjectBy.$stateful = true;

        return orderObjectBy;
/*
        function (items, field, reverse) {

          function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }
          
          var filtered = [];

          // angular.forEach(items, function(item, key) {

          function index(obj, i) {
            return obj[i];
          }

          filtered.sort(function (a, b) {
            var comparator;
            var reducedA = field.split('.').reduce(index, a);
            var reducedB = field.split('.').reduce(index, b);

            if (isNumeric(reducedA) && isNumeric(reducedB)) {
              reducedA = Number(reducedA);
              reducedB = Number(reducedB);
            }

            if (reducedA === reducedB) {
              comparator = 0;
            } else {
              comparator = reducedA > reducedB ? 1 : -1;
            }

            return comparator;
          });

          if (reverse) {
            filtered.reverse();
          }

          return filtered;
        };
        */
      });
  }
)(angular);
