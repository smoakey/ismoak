(function (angular) {
    'use strict';

    angular
        .module('ismoak')
        .directive('ismoakDropdown', ismoakDropdown);

    function ismoakDropdown() {
        return {
            scope: {},
            restrict: 'E',
            require: 'ngModel',
            bindToController: {
                items: '&',
                options: '=',
                disabled: '&',
                onBlur: '&'
            },
            controller: IsmoakDropdownCtrl,
            controllerAs: 'ismoakDropdown',
            templateUrl: 'ismoak.html'
        };

        function IsmoakDropdownCtrl($scope, $element) {
            var vm = this;

            vm.groups = [];

            vm.toggle       = toggle;
            vm.select       = select;
            vm.selectGroup  = selectGroup;
            vm.selectAll    = selectAll;
            vm.selectNone   = selectNone;
            vm.isSelected   = isSelected;
            vm.allSelected  = allSelected;
            vm.noneSelected = noneSelected;
            vm.indexById    = indexById;

            init();

            function init() {
                vm.ops = _.defaults(vm.options, {
                    groupBy: null,
                    groupsOpen: false,
                    orderBy: 'name',
                    searchable: true,
                    displayProp: 'name',
                    maxDisplayed: 3,
                    labelBuilder: defaultLabelBuilder,
                    noneMessage: 'None Selected',
                    allMessage: 'All Selected',
                    partialMessage: '${count} selected',
                    selectAllBtnText: 'Select All',
                    selectNoneBtnText: 'Select None',
                    searchNoResultsText: 'No items matching your search query.'
                });

                // evaluate items for performance
                vm.items = vm.items();
                vm.itemsGrouped = _.groupBy(vm.items, function (item) {
                    return _.get(item, vm.ops.groupBy);
                });
            }
            
            var ngModelController = $element.controller('ngModel');
            ngModelController.$render = renderModel;

            function updateModel(value) {
                ngModelController.$setViewValue(value);
                ngModelController.$render();
            }

            function renderModel() {
                var value = ngModelController.$viewValue;
                var label = vm.ops.labelBuilder(value, vm.items);

                ngModelController.$setValidity('required', _.size(_.keys(value)) > 0);
                $element.find('button span.value').first().text(label);
            }

            function defaultLabelBuilder(selectedItems, allItems) {
                var template = _.pluck(selectedItems, vm.ops.displayProp).join(', ') || vm.ops.noneMessage;

                if (_.size(selectedItems) > vm.ops.maxDisplayed) {
                    template = vm.ops.partialMessage;
                }

                if (_.size(selectedItems) === _.size(allItems)) {
                    template = vm.ops.allMessage;
                }

                return _.template(template)({
                    count: _.size(selectedItems)
                });
            }

            function toggle(open) {
                if (!open && typeof vm.onBlur === 'function') {
                    vm.onBlur();
                }
            }

            function select(item) {
                var selected = toggleValue(ngModelController.$viewValue, item);
                updateModel(selected);
            }

            function selectGroup(group) {
                var items = _.merge({}, ngModelController.$viewValue, group);
                if (allSelected(group)) {
                    items = _.omit(ngModelController.$viewValue, _.keys(group));
                }
                updateModel(items);
            }

            function selectAll() {
                updateModel(indexById(vm.items));
            }

            function selectNone() {
                updateModel({});
            }

            function isSelected(item) {
                return _.has(ngModelController.$viewValue, _.result(item, 'getId'));
            }    

            function allSelected(items) {
                return _.all(items, isSelected);
            }

            function noneSelected(items) {
                return !_.any(items, isSelected);
            }

            function toggleValue(a, b) {
                return _.has(a, b.getId()) ? _.omit(a, b.getId()) : _.set(a, b.getId(), b);
            }

            function indexById(collection) {
                return _.zipObject(_.invoke(collection, 'getId'), collection);
            }
        }
    }
}(angular));
