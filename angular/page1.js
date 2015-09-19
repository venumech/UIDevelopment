function myController($scope, $filter) {
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = [
             {"weight":100.25,"volume":1.0,"hazard":true,"product":"Petrol"},
             {"weight":223.0,"volume":2.0,"hazard":false,"product":"Water"},
             {"weight":78.56,"volume":1.0,"hazard":true,"product":"Petrol"},
             {"weight":23.0,"volume":2.0,"hazard":false,"product":"Water"},
             {"weight":1.1,"volume":1.0,"hazard":true,"product":"Petrol"},
             {"weight":2000.0,"volume":2.0,"hazard":false,"product":"Water"}
    ];


    // init the sorting items
    $scope.init = function () {
        $scope.filteredItems = $scope.items;
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };


    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.init();

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;
        //after changing the sort order reset the entire array aligned to the new sort order or sort element orderby
          $scope.init();

};
}