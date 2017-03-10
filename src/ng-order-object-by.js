'use strict';

(
  function(angular) {
    return angular
      .module('ngOrderObjectBy', [])
      .filter('orderObjectBy', function() {
        function orderObjectBy(_items, _field, _reverse) {
          var filtered;
          filtered = [];

          console.log('items in arguments', _items, _field, _reverse);

          async.filter(_items, function(_item, _cb) {
            var isObject;

            isObject = angular.isObject(_item);

            if (isObject) {
              console.log('_item is a object',_items, _item);
            } else {
              console.log('_item is not a object', _item);
            }
            _cb(null, isObject);

          }, function (_err, _filtered) {
            console.log('filtered', _items, _filtered);

            var fieldName = _field.split('.')[1];
            async.sortBy(_filtered, function (_item, _cb) {
              var value;

              if (!angular.isDate(_item[fieldName])) {
                value = _item[fieldName];
              } else {
                value = moment(_item[fieldName]).format('x');
              }
              if (_reverse && _reverse === true) {
                value = value * -1;
              }
              _cb(null, value);
            }, function (_err, _sorted) {
              filtered = _filtered;
            });
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
