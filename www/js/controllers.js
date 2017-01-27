angular.module('your_app_name.controllers', ["ngStorage",'chart.js'])

    .controller('AuthCtrl', function($scope, $ionicConfig) {

    })


    .controller('SideMenuCtrl', function($rootScope,$scope,UserService,ProfileService,$localStorage,$window,$state,$ionicHistory,$ionicLoading,$timeout) {

        //$scope.user_profile = ProfileService.getProfile();
        $localStorage.user_profile = ProfileService.getProfile();
        // console.log($localStorage.user_profile);
        // console.log( $scope.user_profile.nome);
        //console.log( $scope.user_profile.sex);

        //console.log(  $localStorage.user_profile);

        console.log( $localStorage.loggedIn +" logged");

        $scope.$on('menuDataChange', function (event) {
            //refresh menu items data
            if ($localStorage.loggedIn === true) {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Profilo",
                            icon: "ion-person",
                            level: 0,
                            state: 'app.profile'
                        },
                        {
                            //to remove, jus for testing
                            id: 4,
                            name: "Aziende",
                            icon: "ion-briefcase",
                            level: 0,
                            state: 'app.map'
                            //to remove, jus for testing
                        },
                        // {
                        //   id: 4,
                        //   name: "Layout",
                        //   icon: "ion-wand",
                        //   level: 0,
                        //   state: 'app.layouts'
                        // },
                        // {
                        //   id: 5,
                        //   name: "Forms",
                        //   icon: "ion-document",
                        //   level: 0,
                        //   state: 'app.miscellaneous'
                        // },
                        // {
                        //   id: 6,
                        //   name: "Miscellaneous",
                        //   icon: "ion-asterisk",
                        //   level: 0,
                        //   state: 'app.forms'
                        // },
                        // {
                        //   id: 7,
                        //   name: "Settings",
                        //   icon: "ion-gear-a",
                        //   level: 0,
                        //   state: 'app.settings'
                        // },
                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 10,
                            level: 0,
                            name: 'Student Help Student',
                            icon: "ion-chatbubbles",
                            items: [{
                                id: 101,
                                level: 1,
                                name: 'Inserisci annuncio',
                                icon: "ion-compose",
                                state: 'app.post_announcement'
                            }, {
                                id: 102,
                                level: 1,
                                name: 'I miei annunci',
                                icon: "ion-ios-book",
                                state: 'app.my_announcements'
                            }, {
                                id: 103,
                                level: 1,
                                name: 'Ricerca annuncio',
                                icon: "ion-ios-search-strong",
                                state: 'app.search_announcement'
                            }]
                        }
                        // {
                        //     id: 11,
                        //     name: "Logout",
                        //     icon: "ion-android-exit",
                        //     level: 0,
                        //     onclick: "doLogOut()"
                        //
                        // }
                    ];
            }
            else {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Aziende",
                            icon: "ion-briefcase",
                            level: 0,
                            state: 'app.map'
                        },

                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        }
                    ];
            }
            //clear the state
            if(!$scope.$$phase) {
                $scope.$apply();
            }
            $state.go('walkthrough', {}, { reload: true });
        });

        $scope.doLogOut=function(){
            console.log("logout effettuato");
            /*$localStorage.$reset();
             $localStorage.loggedIn=false;
             $ionicHistory.nextViewOptions({
             disableAnimate: true,
             disableBack: true
             });
             UserService.resetUser();
             $scope.Menu();
             console.log($rootScope.tree);
             //$state.go('walkthrough');
             console.log(  $localStorage.user_profile);*/

            $ionicLoading.show({
                template: 'Logging out....'
            });
            //$localstorage.set('loggin_state', '');

            $timeout(function () {
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $localStorage.$reset();
                $localStorage.loggedIn=false;
                console.log(  $localStorage.loggedIn);
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                UserService.resetUser();
                $scope.Menu();
                console.log($rootScope.tree);
                //$state.go('walkthrough');
                console.log(  $localStorage.user_profile);
                // $state.go('walkthrough');
                $scope.$emit('menuDataChange');
            }, 100);

        };


        if ($localStorage.user_profile.sesso===undefined)
        {
            $localStorage.user_profile.sesso='N';
            $localStorage.user_profile.nome='Ospite';
            console.log('Sono undefined');
        }

        $scope.user_profile = $localStorage.user_profile;
        $scope.theme = 'ionic-sidemenu-dark';

        $rootScope.tree=[];

        $scope.Menu = function () {
            if ($localStorage.loggedIn === true) {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Profilo",
                            icon: "ion-person",
                            level: 0,
                            state: 'app.profile'
                        },
                        {
                            //to remove, jus for testing
                            id: 4,
                            name: "Aziende",
                            icon: "ion-briefcase",
                            level: 0,
                            state: 'app.map'
                            //to remove, jus for testing
                        },
                        // {
                        //   id: 4,
                        //   name: "Layout",
                        //   icon: "ion-wand",
                        //   level: 0,
                        //   state: 'app.layouts'
                        // },
                        // {
                        //   id: 5,
                        //   name: "Forms",
                        //   icon: "ion-document",
                        //   level: 0,
                        //   state: 'app.miscellaneous'
                        // },
                        // {
                        //   id: 6,
                        //   name: "Miscellaneous",
                        //   icon: "ion-asterisk",
                        //   level: 0,
                        //   state: 'app.forms'
                        // },
                        // {
                        //   id: 7,
                        //   name: "Settings",
                        //   icon: "ion-gear-a",
                        //   level: 0,
                        //   state: 'app.settings'
                        // },
                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 10,
                            level: 0,
                            name: 'Student Help Student',
                            icon: "ion-chatbubbles",
                            items: [{
                                id: 101,
                                level: 1,
                                name: 'Inserisci annuncio',
                                icon: "ion-compose",
                                state: 'app.post_announcement'
                            }, {
                                id: 102,
                                level: 1,
                                name: 'I miei annunci',
                                icon: "ion-ios-book",
                                state: 'app.my_announcements'
                            }, {
                                id: 103,
                                level: 1,
                                name: 'Ricerca annuncio',
                                icon: "ion-ios-search-strong",
                                state: 'app.search_announcement'
                            }]
                        }
                        // {
                        //     id: 11,
                        //     name: "Logout",
                        //     icon: "ion-android-exit",
                        //     level: 0,
                        //
                        //     onclick: "doLogOut()"
                        //
                        // }
                    ];
            }
            else {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        // {
                        //     id: 3,
                        //     name: "Aziende",
                        //     icon: "ion-briefcase",
                        //     level: 0,
                        //     state: 'app.map'
                        // },
                        // {
                        //   id: 4,
                        //   name: "Layout",
                        //   icon: "ion-wand",
                        //   level: 0,
                        //   state: 'app.layouts'
                        // },
                        // {
                        //   id: 5,
                        //   name: "Forms",
                        //   icon: "ion-document",
                        //   level: 0,
                        //   state: 'app.miscellaneous'
                        // },
                        // {
                        //   id: 6,
                        //   name: "Miscellaneous",
                        //   icon: "ion-asterisk",
                        //   level: 0,
                        //   state: 'app.forms'
                        // },
                        // {
                        //   id: 7,
                        //   name: "Settings",
                        //   icon: "ion-gear-a",
                        //   level: 0,
                        //   state: 'app.settings'
                        // },
                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        }
                    ];
            }
        };

        $scope.Menu();
    })






    .controller('TestCtrl', function($filter,$window,$timeout,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicLoading,$ionicTabsDelegate,$ionicActionSheet,$ionicModal) {


        $scope.modal = $ionicModal.fromTemplateUrl('../www/views/modals/info_announcement.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        //     '' +
        //     '<ion-modal-view > ' +
        //         '<ion-header-bar class="bar bar-header bar-positive"> ' +
        //         '<h1 class="title">Info Annuncio</h1> ' +
        //         '<button class="button button-clear button-primary" ng-click="close()">Esci</button>' +
        //         '</ion-header-bar>' +
        //         '<ion-content class="padding">' +
        //             '<div class="list">'+
        //                 '<a class="item item-avatar" ng-repeat="" ng-if="">'+
        //                 '<img src="venkman.jpg">'+
        //                 '<h2>Venkman</h2>'+
        //                 '</a>' +
        //                 '<a class="item item-avatar" href="#">'+
        //                 '<img src="venkman.jpg">'+
        //                 '<h2>Venkman</h2>'+
        //                 '</a>' +
        //                 '<a class="item item-avatar" href="#">'+
        //                 '<img src="venkman.jpg">'+
        //                 '<h2>Venkman</h2>'+
        //                 '</a>' +
        //                 '<a class="item item-avatar" href="#">'+
        //                 '<img src="venkman.jpg">'+
        //                 '<h2>Venkman</h2>'+
        //                 '</a>' +
        //             '</div>' +
        //     '</ion-content>' +
        // '</ion-modal-view>',

        // {scope:$scope});
        // $scope.modal.show();

        $scope.close = function () {
            $scope.modal.hide();
        };

        $scope.openModal = function () {
            $scope.modal.show();
        };


    })



    .controller('AnnouncementsCtrl', function($timeout,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$ionicLoading,$localStorage,$ionicTabsDelegate) {

        // $ionicHistory.clearHistory();
        // $ionicHistory.clearCache();

        $scope.user = UserService.getUser();

        $timeout( function() {
            $ionicTabsDelegate .select(0);
        },400);

        $scope.getInfoMyAnnouncements = function(par) {

            $ionicTabsDelegate .select(0);

            $scope.info_my_ann = {};

            if(par==1) {
                $scope.show = function () {
                    $ionicLoading.show({
                        template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
                    });
                };

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            }

            var params = JSON.stringify({'mail_student': $scope.user.mail});
            console.log(params);
            if(par==1)
                $scope.show($ionicLoading);
            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/get_info_my_announcements',
                data: params,
                cache: true,
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .success(function (data, status) {
                    $scope.info_my_ann = data;
                    console.log($scope.info_my_ann);
                })
                .error(function (data, status) {
                    console.log("1_Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                })
                .finally(function ($ionicLoading) {
                    if(par==1)
                        $scope.hide($ionicLoading);
                });

            // console.log('RootCtrl');
            // $scope.onControllerChanged = function (oldController, oldIndex, newController, newIndex) {
            //     console.log('Controller changed', oldController, oldIndex, newController, newIndex);
            //     console.log(arguments);
            // };
        };

        $scope.getInfoMyAppliedAnnouncements = function(par) {

            $ionicTabsDelegate .select(1);

            $scope.info_my_app_ann = {};

            if(par==1) {
                $scope.show = function () {
                    $ionicLoading.show({
                        template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
                    });
                };

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            }

            var params = JSON.stringify({'mail_student': $scope.user.mail});
            console.log(params);
            if(par==1)
                $scope.show($ionicLoading);
            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/get_my_applied_announcements',
                data: params,
                cache: true,
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .success(function (data, status) {
                    $scope.info_my_app_ann = data;
                    console.log($scope.info_my_app_ann);
                })
                .error(function (data, status) {
                    console.log("2_Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                })
                .finally(function ($ionicLoading) {
                    if(par==1)
                        $scope.hide($ionicLoading);
                });

            // console.log('RootCtrl');
            // $scope.onControllerChanged = function (oldController, oldIndex, newController, newIndex) {
            //     console.log('Controller changed', oldController, oldIndex, newController, newIndex);
            //     console.log(arguments);
            // };
        };

        $scope.getInfoArchivedAnnouncements = function(par) {

            $ionicTabsDelegate .select(2);

            $scope.info_my_app_ann = {};

            if(par==1) {
                $scope.show = function () {
                    $ionicLoading.show({
                        template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
                    });
                };

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            }

            var params = JSON.stringify({'mail_student': $scope.user.mail});
            console.log(params);
            if(par==1)
                $scope.show($ionicLoading);
            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/get_my_applied_announcements',
                data: params,
                cache: true,
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .success(function (data, status) {
                    $scope.info_my_app_ann = data;
                    console.log($scope.info_my_app_ann);
                })
                .error(function (data, status) {
                    console.log("2_Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                })
                .finally(function ($ionicLoading) {
                    if(par==1)
                        $scope.hide($ionicLoading);
                });

            // console.log('RootCtrl');
            // $scope.onControllerChanged = function (oldController, oldIndex, newController, newIndex) {
            //     console.log('Controller changed', oldController, oldIndex, newController, newIndex);
            //     console.log(arguments);
            // };
        };


        $scope.getInfoMyAnnouncements(1);


        $scope.doRefresh = function(par) {

            $ionicLoading.show({
                template: 'Loading note...'
            });

            if(par===0)
                $scope.getInfoMyAnnouncements(0);
            else if(par===1)
                $scope.getInfoMyAppliedAnnouncements(0);
            else {

            }
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        };


        // $scope.getInfoMyAppliedAnnouncements(1);


        //FIRST CALL

        // $scope.info_my_ann = {};
        //
        //
        // var params = JSON.stringify({'mail_student': $scope.user.mail});
        // console.log(params);
        //
        // $http({
        //     method: 'POST',
        //     url: 'https://arctic-window-132923.appspot.com/get_info_my_announcements',
        //     data: params,
        //     cache: true,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        //
        // })
        //     .success(function (data, status) {
        //         $scope.info_my_ann = data;
        //         console.log($scope.info_my_ann);
        //     })
        //     .error(function (data, status) {
        //         console.log("1_Error storing device token." + data + " " + status);
        //         var alertPopup = $ionicPopup.alert({
        //             title: 'Errore connessione!',
        //             template: 'Si prega di controllare la connessione ad internet!'
        //         });
        //     });
        //
        // console.log('RootCtrl');
        // $scope.onControllerChanged = function (oldController, oldIndex, newController, newIndex) {
        //     console.log('Controller changed', oldController, oldIndex, newController, newIndex);
        //     console.log(arguments);
        // };
        //
        // $scope.info_my_app_ann = {};
        //
        // var params = JSON.stringify({'mail_student': $scope.user.mail});
        // console.log(params);
        //
        // $http({
        //     method: 'POST',
        //     url: 'https://arctic-window-132923.appspot.com/get_my_applied_announcements',
        //     data: params,
        //     cache: true,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        //
        // })
        //     .success(function (data, status) {
        //         $scope.info_my_app_ann = data;
        //         console.log($scope.info_my_app_ann);
        //     })
        //     .error(function (data, status) {
        //         console.log("2_Error storing device token." + data + " " + status);
        //         var alertPopup = $ionicPopup.alert({
        //             title: 'Errore connessione!',
        //             template: 'Si prega di controllare la connessione ad internet!'
        //         });
        //     });
        //



        // //SECOND CALL
        // $scope.info_my_app_ann = {};
        //
        // var params = JSON.stringify({'mail_student': $scope.user.mail});
        // console.log(params);
        //
        // $http({
        //     method: 'POST',
        //     url: 'https://arctic-window-132923.appspot.com/get_my_applied_announcements',
        //     data: params,
        //     cache: true,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        //
        // })
        //     .success(function (data, status) {
        //         $scope.info_my_app_ann = data;
        //         console.log($scope.info_my_app_ann);
        //     })
        //     .error(function (data, status) {
        //         console.log("2_Error storing device token." + data + " " + status);
        //         var alertPopup = $ionicPopup.alert({
        //             title: 'Errore connessione!',
        //             template: 'Si prega di controllare la connessione ad internet!'
        //         });
        //     });


    })


    .controller('MyAnnouncementsCtrl', function($filter,$window,$timeout,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicLoading,$ionicTabsDelegate,$ionicActionSheet,$ionicModal) {

        // $ionicHistory.clearHistory();
        // $ionicHistory.clearCache();
        $scope.user = UserService.getUser();

        $scope.to_update = $localStorage.info_ann;


        // Triggered on a the item click
        $scope.showMenu = function(obj) {

            obj.data_scadenza = $filter('limitTo')(obj.data_scadenza,10,0);
            obj.data_scadenza = new Date($filter('date')(obj.data_scadenza.toString(),'yyyy-MM-dd'));

            $localStorage.info_ann = obj;

            // console.log($scope.to_update);

            var menu_buttons = [];

            menu_buttons.push({text: 'Info'});
            menu_buttons.push({text: 'Modifica'});

            if(obj.num_cand > 0) {
                // menu_buttons.push({text: 'Info'});
                menu_buttons.push({text: '<b>Stop</b>'});
            }


            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                buttons: menu_buttons,
                destructiveText: 'Elimina',
                titleText: 'Sei sicuro di voler eliminare l\' annuncio selezionato?',
                cancelText: 'Annulla',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    //Called when one of the non-destructive buttons is clicked,
                    //with the index of the button that was clicked and the button object.
                    //Return true to close the action sheet, or false to keep it opened.

                    console.log(index);

                    //code for 'Modifica' function
                    if(index===0) {
                        console.log('INFO');
                        console.log(obj.id);

                        var params = JSON.stringify({'id': obj.id});

                        $http({
                            method: 'POST',
                            url: 'https://arctic-window-132923.appspot.com/get_info_announcements_byID',
                            data: params,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data, status) {

                                console.log("HERE");
                                // $scope.info_data = data;
                                // console.log($scope.info_data);

                                $scope.modal = $ionicModal.fromTemplateUrl('../www/views/modals/info_announcement.html', {
                                    scope: $scope,
                                    animation: 'slide-in-up'
                                }).then(function(modal) {
                                    modal.info_candidates = data;
                                    modal.info_announcement = obj;


                                    //TODO: FIX DATE (change format)
                                    modal.info_announcement.data_scadenza = $filter('limitTo')(modal.info_announcement.data_scadenza.toString(),10,0);
                                    modal.info_announcement.data_scadenza = $filter('date')(modal.info_announcement.data_scadenza.toString(),'yyyy-MM-dd');
                                    console.log(modal.info_announcement.data_scadenza);
                                    // modal.info_data.titolo = obj.titolo;
                                    // modal.info_data.categoria = obj.titolo;
                                    // modal.info_data.categoria = obj.titolo;
                                    // modal.info_data.data_pubblicazione = obj.data_pubblicazione;
                                    // modal.info_data.descrizione = obj.descrizione;
                                    // modal.info_data. = obj.num_cand;
                                    $scope.modal = modal;

                                    console.log($scope.modal.info_data);
                                    $scope.modal.show();
                                });

                                $scope.close=function () {
                                    $scope.modal.hide();
                                };

                                // $scope.openModal=function () {
                                //     $scope.modal.show();
                                // };


                                // $window.location.reload(true);

                            })
                            .error(function (data, status) {
                                console.log("2_Error storing device token." + data + " " + status);
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Errore connessione!',
                                    template: 'Si prega di controllare la connessione ad internet!'
                                });
                            })
                            .finally(function ($ionicLoading) {
                                $scope.hide($ionicLoading);
                            });


                    }
                    else if (index===1){

                        console.log($localStorage.info_ann);
                        console.log("MODIFICA");
                        $state.go('app.update_announcement');
                    }
                    else if(index===2) //code for 'STOP' function
                    {
                        console.log('STOP');

                        $scope.show = function () {
                            $ionicLoading.show({
                                template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
                            });
                        };

                        $scope.hide = function () {
                            $ionicLoading.hide();
                        };


                        var params2 = JSON.stringify({'annuncio_id': obj.id});

                        $scope.show($ionicLoading);

                        $http({
                            method: 'POST',
                            url: 'https://arctic-window-132923.appspot.com/stop_announce',
                            data: params2,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data, status) {

                                console.log("HERE");

                                console.log("Annuncio Stoppato");
                                $scope.title="Annuncio Stoppato";
                                $scope.template="Controlla la mail per visualizzare i candidati alla risoluzione dell'annuncio da te selezionato.";

                                //FIXME: far comparire il popup dopo il reload della vista (attualmente non funzionante)!
                                $ionicHistory.currentTitle( {
                                    disableAnimate: true,
                                    disableBack: true
                                });

                                var alertPopup = $ionicPopup.alert({
                                    title: $scope.title,
                                    template: $scope.template
                                });

                                $window.location.reload(true);



                            })
                            .error(function (data, status) {
                                console.log("Error storing device token." + data + " " + status);
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Errore connessione!',
                                    template: 'Si prega di controllare la connessione ad internet!'
                                });
                            })
                            .finally(function ($ionicLoading) {
                                $scope.hide($ionicLoading);
                            });
                        // $ionicTabsDelegate .select(2);
                        // $state.go('app.my_announcements');
                    }
                    else {}


                    return true;
                },
                destructiveButtonClicked: function(){

                    //Called when the destructive button is clicked.
                    //Return true to close the action sheet, or false to keep it opened.
                    // $state.go('walkthrough');

                    console.log(obj.id);

                    $scope.show = function () {
                        $ionicLoading.show({
                            template: '<p>Elimino Annuncio...</p><ion-spinner icon="spiral"></ion-spinner>',
                            duration: 5000
                        });
                    };

                    $scope.hide = function () {
                        $ionicLoading.hide();
                    };

                    var params = JSON.stringify({'id_project': obj.id});

                    $scope.show($ionicLoading);

                    $http({
                        method: 'POST',
                        url: 'https://arctic-window-132923.appspot.com/delete_announcement',
                        data: params,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function (data, status) {

                            console.log("HERE");

                            //FIXME: far comparire un popup dopo il reload della vista!

                            $window.location.reload(true);

                        })
                        .error(function (data, status) {
                            console.log("2_Error storing device token." + data + " " + status);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Errore connessione!',
                                template: 'Si prega di controllare la connessione ad internet!'
                            });
                        })
                        .finally(function ($ionicLoading) {
                            $scope.hide($ionicLoading);
                        });

                    // $state.go("app.my_announcements");
                    // $state.go($state.current, {}, {reload: true});

                    return true;

                }
            });

        };

        $scope.doUpdateAnnouncement = function(){


            var updated_data = JSON.stringify({

                "id":                       $scope.to_update.id,
                "data_scadenza":            $filter('date')(new Date($scope.to_update.data_scadenza), 'yyyy-MM-dd'),
                "titolo":                   $scope.to_update.titolo,
                "descrizione":              $scope.to_update.descrizione,
                "categoria":                $scope.to_update.categoria
            });


            console.log(updated_data);

            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/update_announcement',
                data: updated_data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj = angular.fromJson(data);
                    console.log(obj.result);

                    // if(obj.result === '200') {
                    console.log("Dati aggiornati con successo");
                    $scope.title="Annuncio aggiornato";
                    $scope.template="L'annuncio selezionato è stato aggiornato con successo!";
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    // the user is redirected to login page after sign up
                    // }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                    $state.go('app.my_announcements');

                })
                .error(function (data, status) {
                    console.log("Error." + data + " " + status);

                    if (obj.result === '500')
                    {
                        console.log("Something went wrong!");
                        $scope.title="Something went wrong!";
                        $scope.template="Contattare il nostro team tecnico";
                        //resettare i parametri focus email
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                });

        };


    })



    .controller('HistoryCtrl',function ($scope,$http,UserService,$ionicLoading,$ionicPopup,$ionicTabsDelegate) {


        $scope.storico=function () {
            $ionicTabsDelegate.select(2);
            $scope.user = UserService.getUser();
            var params = JSON.stringify({
                'mail_student':  $scope.user.mail

            });

            $scope.show = function () {
                $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
                });
            };

            $scope.hide = function () {
                $ionicLoading.hide();
            };

            $scope.show($ionicLoading);
            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/get_archived_announcements',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj = angular.fromJson(data);
                    $scope.applied=obj[0].applied_announcements;
                    $scope.my=obj[1].my_announcements;

                    console.log($scope.applied);
                    console.log($scope.my);

                })
                .error(function (data, status) {
                    console.log("2_Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                })
                .finally(function ($ionicLoading) {
                    $scope.hide($ionicLoading);
                });

        };

    })




    .controller('MyAppliedAnnouncementsCtrl', function($filter,$window,$timeout,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicTabsDelegate,$ionicActionSheet,$ionicLoading,$ionicModal) {

        // $ionicHistory.clearHistory();
        // $ionicHistory.clearCache();
        $scope.user = UserService.getUser();

        $scope.to_update = $localStorage.info_my_app_ann;


        // Triggered on a the item click
        $scope.showMenu = function(obj) {

            // obj.data_scadenza = $filter('limitTo')(obj.data_scadenza,10,0);
            // obj.data_scadenza = new Date($filter('date')(obj.data_scadenza.toString(),'yyyy-MM-dd'));

            $localStorage.info_my_ann = obj;

            // console.log($scope.to_update);

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                buttons: [
                    { text: 'Info' }
                ],
                destructiveText: 'Cancella Candidatura',
                titleText: 'Sei sicuro di voler cancellare la candidatura?',
                cancelText: 'Annulla',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    //Called when one of the non-destructive buttons is clicked,
                    //with the index of the button that was clicked and the button object.
                    //Return true to close the action sheet, or false to keep it opened.

                    console.log(index);

                    if(index===0) //code for 'Stop' function
                    {
                        console.log('INFO');

                        var params = JSON.stringify({'id': obj.id});

                        console.log(params);


                        $http({
                            method: 'POST',
                            url: 'https://arctic-window-132923.appspot.com/get_info_announcements_byID',
                            data: params,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data, status) {

                                console.log("HERE");
                                // $scope.info_data = data;

                                $scope.modal = $ionicModal.fromTemplateUrl('../www/views/modals/info_applied_announcement.html', {
                                    scope: $scope,
                                    animation: 'slide-in-up'
                                }).then(function(modal) {
                                    modal.info_candidates = data;
                                    modal.info_announcement = obj;


                                    //TODO: FIX DATE (change format)
                                    modal.info_announcement.data_scadenza = $filter('limitTo')(modal.info_announcement.data_scadenza.toString(),10,0);
                                    modal.info_announcement.data_scadenza = $filter('date')(modal.info_announcement.data_scadenza.toString(),'yyyy-MM-dd');
                                    console.log(modal.info_announcement.data_scadenza);
                                    // modal.info_data.titolo = obj.titolo;
                                    // modal.info_data.categoria = obj.titolo;
                                    // modal.info_data.categoria = obj.titolo;
                                    // modal.info_data.data_pubblicazione = obj.data_pubblicazione;
                                    // modal.info_data.descrizione = obj.descrizione;
                                    // modal.info_data. = obj.num_cand;
                                    $scope.modal = modal;


                                    $scope.modal.show();
                                });

                                $scope.close=function () {
                                    $scope.modal.hide();
                                };


                            })
                            .error(function (data, status) {
                                console.log("2_Error storing device token." + data + " " + status);
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Errore connessione!',
                                    template: 'Si prega di controllare la connessione ad internet!'
                                });
                            })
                            .finally(function ($ionicLoading) {
                                $scope.hide($ionicLoading);
                            });

                        // $state.go('app.profile');
                    }
                    else
                    {}

                    return true;
                },
                destructiveButtonClicked: function(){

                    //Called when the destructive button is clicked.
                    //Return true to close the action sheet, or false to keep it opened.
                    // $state.go('walkthrough');

                    console.log(obj.id);

                    $scope.show = function () {
                        $ionicLoading.show({
                            template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
                        });
                    };

                    $scope.hide = function () {
                        $ionicLoading.hide();
                    };

                    var params = JSON.stringify({
                        'mail_student':  $scope.user.mail,
                        'id':   obj.id
                    });

                    $scope.show($ionicLoading);
                    $http({
                        method: 'POST',
                        url: 'https://arctic-window-132923.appspot.com/delete_candidacy',
                        data: params,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function (data, status) {

                            console.log("HERE");
                            $window.location.reload(true);

                        })
                        .error(function (data, status) {
                            console.log("2_Error storing device token." + data + " " + status);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Errore connessione!',
                                template: 'Si prega di controllare la connessione ad internet!'
                            });
                        })
                        .finally(function ($ionicLoading) {
                            $scope.hide($ionicLoading);
                        });

                    // $state.go("app.my_announcements");
                    // $state.go($state.current, {}, {reload: true});

                    return true;

                }
            });

        };



    })



    .controller('TaskCtrl', function($scope) {
        $scope.close = function() {
            $scope.modal.hide();
        };
    })






    .controller('AppCtrl', function($scope, $ionicConfig) {

    })

    .controller('QuestCtrl', function($scope,$state,$ionicPopup,$http) {

        $scope.goQuest=function(cod){
            console.log(cod.codice);
            $http({
                method :'GET',
                url:'https://arctic-window-132923.appspot.com/latest_code',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    console.log("Token stored, device is successfully subscribed to receive push notifications.");
                    var obj=angular.fromJson(data);
                    console.log(obj);

                    console.log(status);
                    $scope.cod=obj.result.codice;
                    console.log(obj.result.codice);

                    if(cod.codice===$scope.cod)
                        $state.go('app.questionario');
                    else
                    {
                        console.log("codice errato"); //mettere alert
                        var alertPopup = $ionicPopup.alert({
                            title: 'Codice errato!',
                            template: 'Si prega di verificare il codice d\'accesso!'
                        });
                    }

                })
                .error(function (data, status) {
                    console.log("Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di contrllare la connessione ad internet!'
                    });
                });

        };

        $scope.check=function(object){

            if($scope.codice === '' || $scope.isUnd(object)=="UNDEFINED") {
                console.log("true");
                return true;
            }
            else {
                console.log("false");
                return false;
            }
        };

        $scope.isUnd = function (thing) {
            if (typeof thing == "undefined") {
                console.log("true");
                return "UNDEFINED";
            }
            else
                return "OK";
        };

    })

    .controller('QuizCtrl', function($scope, $ionicConfig,$http,$localStorage,$state,$ionicPopup,$ionicHistory) {

        //hobbie
        $scope.hobbies = [];

        $http.get('hobby.json').success(function(response) {
            $scope.hobbies = response;
        });

        $scope.checkHobbies={};

        $scope.isThisDisabledHobbie=function(object) {

            if ($scope.checkHobbies.Altro && $scope.isUnd(object) == "UNDEFINED")
                return false;
            else if ($scope.checkHobbies.Altro && object.txtHobbie === '')
                return false;


            for (var i in $scope.checkHobbies) {

                if ($scope.checkHobbies[i])
                    return true;

            }
            return false;
        };

        $scope.isThisDisabled2Hobbie=function(){
            if($scope.checkHobbies.Altro)
                return false;
            else
                return true;
        };

        $scope.goToAnswer=function(object){
            $localStorage.quest1=[];
            for (var i in $scope.checkHobbies) {

                if ($scope.checkHobbies[i] && i!='Altro') //se check
                    $localStorage.quest1.push(i);

            }
            if ($scope.checkHobbies.Altro) //se altro
                $localStorage.quest1.push(object.txtHobbie);

            console.log($localStorage.quest1);
            $state.go('app.answer');
        };


        $scope.goToLavoro=function(object){

            $localStorage.quest2=object.Q2;
            $localStorage.quest3=object.Q3;
            console.log($localStorage.quest2);
            console.log($localStorage.quest3);
            $state.go('app.lavoro');
        };

        //lavoro

        $scope.lavori = [];


        $http.get('lavoro.json').success(function(response) {
            $scope.lavori = response;
        });


        $scope.radioLavoro={text:'1'};

        $scope.isThisDisabledLavoro=function() {

            if ($scope.radioLavoro.text == 'Altro')
                return false;
            else
                return true;

        };



        $scope.isThisDisabled2Lavoro=function(object) {


            if($scope.radioLavoro.text==1)
                return true;
            else if ($scope.radioLavoro.text=='Altro' && $scope.isUnd(object)=="UNDEFINED")
                return true;
            else if ($scope.radioLavoro.text=='Altro' && object.txtLavoro==='')
                return true;
            else
                return false;

        };

        $scope.goToCompetenze=function(object){

            if ($scope.radioLavoro.text=='Altro')
                $localStorage.quest4=object.txtLavoro;
            else
                $localStorage.quest4 = $scope.radioLavoro.text;

            console.log($localStorage.quest4);
            $state.go('app.competenze');
        };


        //competenze

        $scope.competenze = [];

        $http.get('competenze.json').success(function(response) {
            $scope.competenze = response;
        });

        $scope.txtCompetenze=[];

        $scope.radioCompetenze={
            text:'1'
        };

        $scope.isThisDisabledCompetenze=function() {

            if ($scope.radioCompetenze.text == 'Altro')
                return false;
            else
                return true;

        };

        $scope.isThisDisabled2Competenze=function(object) {


            if($scope.radioCompetenze.text==1)
                return true;
            else if ($scope.radioCompetenze.text=='Altro' && $scope.isUnd(object)=="UNDEFINED")
                return true;
            else if ($scope.radioCompetenze.text=='Altro' && object.txtCompetenze==='')
                return true;
            else
                return false;

        };

        $scope.goToMaterie=function(object){

            if ($scope.radioCompetenze.text=='Altro')
                $localStorage.quest5=object.txtCompetenze;
            else
                $localStorage.quest5 = $scope.radioCompetenze.text;

            console.log($localStorage.quest5);
            $state.go('app.materie');
        };

        //materie

        $scope.materie = [];

        $http.get('materie.json').success(function(response) {
            $scope.materie= response;
        });

        $scope.checkMaterie={};

        $scope.isThisDisabledMaterie=function(object) {

            if ($scope.checkMaterie.Altro && $scope.isUnd(object) == "UNDEFINED")
                return false;
            else if ($scope.checkMaterie.Altro && object.txtMaterie === '')
                return false;


            for (var i in $scope.checkMaterie) {

                if ($scope.checkMaterie[i])
                    return true;

            }
            return false;
        };

        $scope.isThisDisabled2Materie=function(){
            if($scope.checkMaterie.Altro)
                return false;
            else
                return true;
        };


        $scope.goToLibreria=function(object){

            $localStorage.quest6=[];
            for (var i in $scope.checkMaterie) {

                if ($scope.checkMaterie[i] && i!='Altro') //se check
                    $localStorage.quest6.push(i);

            }
            if ($scope.checkMaterie.Altro) //se altro
                $localStorage.quest6.push(object.txtMaterie);

            console.log($localStorage.quest6);
            $state.go('app.libreria');
        };


        //libreria

        $scope.tematica = [];


        $http.get('tematica.json').success(function(response) {
            $scope.tematica = response;
        });



        $scope.txtTematica=[];


        $scope.radioTematica={
            text:'1'
        };

        $scope.isThisDisabledTematica=function() {

            if ($scope.radioTematica.text == 'Altro')
                return false;
            else
                return true;

        };

        $scope.isThisDisabled2Tematica=function(object) {


            if($scope.radioTematica.text==1)
                return true;
            else if ($scope.radioTematica.text=='Altro' && $scope.isUnd(object)=="UNDEFINED")
                return true;
            else if ($scope.radioTematica.text=='Altro' && object.txtTematica==='')
                return true;
            else
                return false;

        };

        $scope.isUnd = function (thing) {
            if (typeof thing == "undefined") {

                return "UNDEFINED";
            }
            else
                return "OK";
        };



        $scope.submit = function (object) {

            var params= {};
            if ($scope.radioTematica.text=='Altro')
                params= {"q1": $localStorage.quest1,"q2": $localStorage.quest2,"q3": $localStorage.quest3,"q4": $localStorage.quest4,"q5": $localStorage.quest5,"q6": $localStorage.quest6,"q7": object.txtTematica};
            else
                params= {"q1": $localStorage.quest1,"q2": $localStorage.quest2,"q3": $localStorage.quest3,"q4": $localStorage.quest4,"q5": $localStorage.quest5,"q6": $localStorage.quest6,"q7": $scope.radioTematica.text};

            console.log($scope.radioTematica.text);
            console.log(params);

            $http({
                method :'POST',
                url:'https://bubbly-polygon-149222.appspot.com',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    console.log("Token stored, device is successfully subscribed to receive push notifications.");
                    var obj=angular.fromJson(data);
                    console.log(obj);
                    console.log(status);
                    $localStorage.labelsLS=obj.classes.cls[0];
                    $localStorage.datiLS=obj.classes.probs[0];
                    console.log($localStorage.labelsLS);
                    console.log($localStorage.datiLS);
                    /*if(obj.result=== '200')
                     {
                     console.log("Registrazione ok.");
                     $scope.title="Registrazione";
                     $scope.template="Registrazione effettuata con successo";
                     $state.go('app.feeds-categories');
                     }
                     else if (obj.result=== '401')
                     {
                     console.log("Email already exist.");
                     $scope.title="Errore";
                     $scope.template="Email già esistente";
                     //resettare i parametri focus email
                     }
                     else
                     {
                     console.log("Registrazione fallita.");
                     $scope.title="Errore";
                     $scope.template="Registrazione fallita";
                     }*/
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });

                    $state.go('app.orientamento');
                })
                .error(function (data, status) {
                    console.log("Error storing device token." + data + " " + status);
                });


            $localStorage.table=[
                {
                    "nome": $localStorage.labelsLS[0],
                    "prob":$localStorage.datiLS[0]
                },
                {
                    "nome": $localStorage.labelsLS[1],
                    "prob":$localStorage.datiLS[1]
                },
                {
                    "nome": $localStorage.labelsLS[2],
                    "prob":$localStorage.datiLS[2]
                },
                {
                    "nome": $localStorage.labelsLS[3],
                    "prob":$localStorage.datiLS[3]
                },
                {
                    "nome": $localStorage.labelsLS[4],
                    "prob":$localStorage.datiLS[4]
                }

            ];
            console.log($localStorage.labelsLS);
            console.log($localStorage.labelsLS);
            $state.go('app.orientamento');

        };

        $scope.getDati = function () {
            return $localStorage.datiLS;
        };

        $scope.getLabels = function () {
            return $localStorage.labelsLS;
        };

        $scope.getOptions = function () {
            return {legend: {display: true}};
        };

        $scope.getRow = function (i) {

            var row=
                    {
                        "nome": $localStorage.labelsLS[i],
                        "prob":$localStorage.datiLS[i]*100
                    }
                ;

            return row;
        };


        $scope.goToHome = function () {

            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });

            $state.go('app.feeds-categories');
        };

    })



    //REGISTRATION
    .controller('RegistrationCtrl', function($scope, $ionicConfig,$http,$state,$ionicHistory,$ionicPopup) {

        $scope.university = null;

        //  The user has selected a Customer from our Drop Down List.  Let's load this Customer's records.
        $http.get('https://arctic-window-132923.appspot.com/list_universities')
            .success(function (data) {
                $scope.university = data;
            })
            .error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the list of University, error # " + status;
            });

        $scope.doRegister = function(){

            var params = JSON.stringify( {'nome': $scope.reg.nome,
                'cognome': $scope.reg.cognome,
                'mail': $scope.reg.email,
                'password': $scope.reg.password,
                'dn': $scope.reg.date,
                'sex': $scope.reg.sex,
                'universita_id':$scope.reg.universita,
                'phone': $scope.reg.phone,
                'indirizzo' : $scope.reg.indirizzo+';'+$scope.reg.cap.toString()+';'+$scope.reg.citta+';'+$scope.reg.prov
            });

            console.log(params);
            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/signin',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj=angular.fromJson(data);
                    console.log(obj.result);

                    if(obj.result === '200')
                    {
                        console.log("Registrazione ok.");
                        $scope.title="Account Creato";
                        $scope.template="Verifica la tua email per confermare la registrazione!";
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        // the user is redirected to login page after sign up
                        $state.go('auth.login', {}, {location: "replace", reload: true});
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {
                    console.log("Error." + data + " " + status);

                    if (obj.result === '404')
                    {
                        console.log("Email already exist.");
                        $scope.title="Email già esistente";
                        $scope.template="Si prega di fare clic su Password dimenticata se necessario!";
                        //resettare i parametri focus email
                    }
                    else
                    {
                        console.log("Registrazione fallita.");
                        $scope.title="Registrazione fallita";
                        $scope.template="Contattare il nostro team tecnico";
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                });


        };
        $scope.reg = {};



        $scope.VerifyDate = function()
        {
            var today = new Date();
            var minAge = 18;
            $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
        };

    })


    .controller('ProfileCtrl',function($scope, $state,$http,$ionicLoading,UserService,ProfileService,$localStorage,$filter,$ionicHistory)
    {

        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();

        $scope.profile={};
        $scope.user = UserService.getUser();

        // console.log($localStorage.loggedIn);
        var params = JSON.stringify( {'mail': $scope.user.mail,'password':$scope.user.password} );
        console.log(params);
        $http({
            method :'POST',
            url:'https://arctic-window-132923.appspot.com/get_user_info',
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .success(function (data, status) {
                var obj=angular.fromJson(data);

                $scope.profile=data.result;

                // console.log($scope.profile.data_di_nascita);

                $scope.profile.data_di_nascita = $filter('limitTo')($scope.profile.data_di_nascita,10,0);
                $scope.profile.data_di_nascita = $filter('date')(new Date($scope.profile.data_di_nascita), 'yyyy-MM-dd');

                console.log($scope.profile.data_di_nascita);
                console.log(typeof $scope.profile.data_di_nascita);

                ProfileService.setProfile({
                    nome: $scope.profile.nome_studente,
                    sex: $scope.profile.sesso_studente
                });


                // SESSION DATA FOR STUDENT W/0 SCHOLARSHIP
                $localStorage.user_profile.mail = $scope.user.mail;
                $localStorage.user_profile.nome = $scope.profile.nome_studente;
                $localStorage.user_profile.cognome = $scope.profile.cognome_studente;
                $localStorage.user_profile.data_di_nascita = $scope.profile.data_di_nascita;
                $localStorage.user_profile.telefono = $scope.profile.telefono_studente;
                $localStorage.user_profile.indirizzo = $scope.profile.indirizzo_studente;
                $localStorage.user_profile.nome_uni = $scope.profile.nome_uni;
                $localStorage.user_profile.id_uni = $scope.profile.id_uni;
                $localStorage.user_profile.corso_laurea = $scope.profile.studente_corso_laurea;
                $localStorage.user_profile.dipartimento = $scope.profile.studente_dipartimento;
                $localStorage.user_profile.sesso = $scope.profile.sesso_studente;
                $localStorage.user_profile.borsa = $scope.profile.borsa;


                // OTHER SESSION DATA FOR STUDENT W/ SCHOLARSHIP
                if ($localStorage.user_profile.borsa=='true') {
                    $localStorage.user_profile.tipologia_borsa = $scope.profile.tipologia_borsa;
                    $localStorage.user_profile.data_inizio_borsa = $scope.profile.data_inizio_borsa;
                    $localStorage.user_profile.nome_mentore = $scope.profile.nome_mentore;
                    $localStorage.user_profile.cognome_mentore = $scope.profile.cognome_mentore;
                    $localStorage.user_profile.sesso_mentore = $scope.profile.sesso_mentore;
                    $localStorage.user_profile.mail_mentore = $scope.profile.mail_mentore;
                    $localStorage.user_profile.telefono_mentore = $scope.profile.telefono_mentore;
                }


                // console.log($localStorage.user_profile);

            })
            .error(function (data, status) {
                console.log("Error." + data + " " + status);

            });

        $scope.updateProfileData = function(){
            $state.go('app.update_profile');
        };

        $scope.Mentor = function(){
            $state.go('app.mentor');
        };

        $scope.PianoStudi=function () {
            $state.go("app.piano-studi");
        };

        $scope.Attivita = function () {
            $state.go("app.attivita");
        };

    })


    .controller('UpdateProfileCtrl', function($scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$filter) {
        // $ionicHistory.clearHistory();
        // $ionicHistory.clearCache();
        $scope.edit = false;


        $scope.editFields = function () {
            $scope.edit = true;

        };


        $scope.ind= $localStorage.user_profile.indirizzo.split(";");
        console.log($localStorage.user_profile.indirizzo);
        $scope.cap=parseInt($scope.ind[1],10);
        console.log(typeof $scope.cap);
        console.log($scope.cap);

        $scope.prof =

            {
                "mail":                     $localStorage.user_profile.mail,
                "nome":                     $localStorage.user_profile.nome,
                "cognome":                  $localStorage.user_profile.cognome,
                "data_di_nascita":          new Date($localStorage.user_profile.data_di_nascita),
                "sesso":                    $localStorage.user_profile.sesso,
                "telefono":                 $localStorage.user_profile.telefono,
                "nome_uni":                 $localStorage.user_profile.nome_uni,
                "id_uni":                   $localStorage.user_profile.id_uni,
                "corso_laurea":             $localStorage.user_profile.corso_laurea,
                "indirizzo":                $localStorage.user_profile.indirizzo,
                "borsa":                    $localStorage.user_profile.borsa,
                "tipologia_borsa":          $localStorage.user_profile.tipologia_borsa

            };


        $scope.university = {};

        //  The user has selected a Customer from our Drop Down List.  Let's load this Customer's records.
        // $http.get('https://arctic-window-132923.appspot.com/list_universities')
        //     .success(function (data) {
        //         $scope.university = data;
        //         console.log("here");
        //     })
        //     .error(function (data, status, headers, config) {
        //         $scope.errorMessage = "Couldn't load the list of University, error # " + status;
        //     });

        $http({
            method :'GET',
            url:'https://arctic-window-132923.appspot.com/list_universities',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .success(function (data, status) {
                $scope.university = data;
                $scope.selectedValue = $localStorage.user_profile.nome_uni;

            })
            .error(function (data, status) {
                console.log("Error storing device token." + data + " " + status);

                $scope.title = "Qualcosa non è andato a buon fine!";
                $scope.template = "Contattare il nostro team tecnico";

                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });
            });


        console.log($localStorage);

        $scope.doUpdateProfile = function(){

            console.log($scope.prof);

            var updated_data = JSON.stringify({

                "mail":                     $scope.prof.mail,
                "nome":                     $scope.prof.nome,
                "cognome":                  $scope.prof.cognome,
                "sex":                      $scope.prof.sesso,
                "data_di_nascita":          $filter('date')(new Date($scope.prof.data_di_nascita), 'yyyy-MM-dd'),
                "telefono":                 $scope.prof.telefono,
                "id_uni":                   $scope.prof.id_uni,
                "corso_laurea":             $scope.prof.corso_laurea,
                "indirizzo":                $scope.ind[0]+';'+$scope.ind[1]+';'+$scope.ind[2]+';'+$scope.ind[3]
            });

            console.log(updated_data);


            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/update_profile',
                data: updated_data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj = angular.fromJson(data);

                    // $localStorage.user_profile.nome = $scope.prof.nome;
                    // $localStorage.user_profile.cognome = $scope.prof.cognome;
                    // $localStorage.user_profile.sesso = $scope.prof.sesso;
                    // $localStorage.user_profile.telefono = $scope.prof.telefono;
                    // $localStorage.user_profile.nome_uni = $scope.prof.nome_uni;
                    // $localStorage.user_profile.id_uni = $scope.prof.id_uni;
                    // $localStorage.user_profile.corso_laurea = $scope.prof.corso_laurea;
                    // $localStorage.user_profile.indirizzo = $scope.prof.indirizzo;

                    console.log($localStorage.user_profile);

                    console.log("Dati aggiornati con successo");
                    $scope.title="Profilo aggiornato";
                    $scope.template="Il tuo profilo è stato aggiornato con successo!";
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    // the user is redirected to login page after sign up
                    $state.go('app.profile');


                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {
                    console.log("Error." + data + " " + status);


                    console.log("Something went wrong!");
                    $scope.title="Something went wrong!";
                    $scope.template="Contattare il nostro team tecnico";

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                });
        };
    })


    .controller('MentorCtrl', function($scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage) {

        //TODO: You must install the cordova plugin whitelist:
        //cordova plugin add cordova-plugin-whitelist
        //or if you want to save the reference to your config.xml file:

        //  cordova plugin add cordova-plugin-whitelist --save
        //and that you have to add the intent to your config.xml file:

        //  <allow-intent href="mailto:*" />
        //<allow-intent href="tel:*" />

        console.log("HERE");

        $scope.mentor_data =

            {
                "nome":              $localStorage.user_profile.nome_mentore,
                "cognome":           $localStorage.user_profile.cognome_mentore,
                "sesso":             $localStorage.user_profile.sesso_mentore,
                "mail":              $localStorage.user_profile.mail_mentore,
                "telefono":          $localStorage.user_profile.telefono_mentore
            };

        console.log($scope.mentor_data);

    })




    //LOGIN
    .controller('LoginCtrl', function($window, $location,$rootScope,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicLoading,$timeout,ProfileService) {



        $scope.$on('menuData', function (event) {
            //refresh menu items data

            // if ($localStorage.mentore === false) {

            if ($localStorage.loggedIn === true) {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Profilo",
                            icon: "ion-person",
                            level: 0,
                            state: 'app.profile'
                        },
                        // {
                        //     //to remove, jus for testing
                        //     id: 4,
                        //     name: "Aziende",
                        //     icon: "ion-briefcase",
                        //     level: 0,
                        //     state: 'app.map'
                        //     //to remove, jus for testing
                        // },
                        // {
                        //   id: 4,
                        //   name: "Layout",
                        //   icon: "ion-wand",
                        //   level: 0,
                        //   state: 'app.layouts'
                        // },
                        // {
                        //   id: 5,
                        //   name: "Forms",
                        //   icon: "ion-document",
                        //   level: 0,
                        //   state: 'app.miscellaneous'
                        // },
                        // {
                        //   id: 6,
                        //   name: "Miscellaneous",
                        //   icon: "ion-asterisk",
                        //   level: 0,
                        //   state: 'app.forms'
                        // },
                        // {
                        //   id: 7,
                        //   name: "Settings",
                        //   icon: "ion-gear-a",
                        //   level: 0,
                        //   state: 'app.settings'
                        // },
                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 10,
                            level: 0,
                            name: 'Student Help Student',
                            icon: "ion-chatbubbles",
                            items: [{
                                id: 101,
                                level: 1,
                                name: 'Inserisci annuncio',
                                icon: "ion-compose",
                                state: 'app.post_announcement'
                            }, {
                                id: 102,
                                level: 1,
                                name: 'I miei annunci',
                                icon: "ion-ios-book",
                                state: 'app.my_announcements'
                            }, {
                                id: 103,
                                level: 1,
                                name: 'Ricerca annuncio',
                                icon: "ion-ios-search-strong",
                                state: 'app.search_announcement'
                            }]
                        },
                        {
                            id: 11,
                            name: "Logout",
                            icon: "ion-android-exit",
                            level: 0,

                            onclick: "doLogOut()"

                        }
                    ];
            }
            else {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Aziende",
                            icon: "ion-briefcase",
                            level: 0,
                            state: 'app.map'
                        },

                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 10,
                            name: "Test",
                            icon: "Test",
                            level: 0,
                            state: 'app.shs.post_announcement'
                        }

                    ];
            }

            //clear the state
            if(!$scope.$$phase) {
                $scope.$apply();
            }
            console.log("go_to_profile");
            $state.go('app.profile');
            // }
        });


        $scope.doLogIn = function() {

            var obj;
            var params = JSON.stringify( {'mail': $scope.user.email,'password': $scope.user.password} );

            $scope.profile={};

            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/login',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {
                    console.log("Token stored, device is successfully subscribed to receive push notifications.");
                    obj=angular.fromJson(data);

                    // console.log(obj.result);
                    /*UserService.setUser({

                     mail: $scope.user.email,
                     password: $scope.user.password
                     });

                     $localStorage.loggedIn=true;
                     console.log($localStorage.loggedIn);
                     $scope.Menu();
                     console.log($rootScope.tree);
                     $ionicHistory.nextViewOptions({
                     disableAnimate: true,
                     disableBack: true
                     });*/
                    //$state.go('app.profile');


                    // //TODO: call API get_user_info
                    // $http({
                    //     method :'POST',
                    //     url:'https://arctic-window-132923.appspot.com/get_user_info',
                    //     data: params,
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     }
                    // })
                    //     .success(function (data, status) {
                    //         var obj=angular.fromJson(data);
                    //
                    //         $localStorage.mentore = true;
                    //
                    //         // if ($localStorage.mentore===true) {
                    //         //     $window.location.href = 'http://polar-winter-149323.appspot.com/loginm';
                    //         // }
                    //         // else {
                    //
                    //         $scope.profile = data.result;
                    //
                    //         console.log($scope.profile.nome_studente);
                    //         console.log("STEP_1");
                    //
                    //         //useless
                    //         ProfileService.setProfile({
                    //             nome: $scope.profile.nome_studente,
                    //             sex: $scope.profile.sesso_studente
                    //         });
                    //
                    //
                    //         // SESSION DATA FOR STUDENT W/0 SCHOLARSHIP
                    //         $localStorage.user_profile.mail = $scope.user.mail;
                    //         $localStorage.user_profile.nome = $scope.profile.nome_studente;
                    //         $localStorage.user_profile.cognome = $scope.profile.cognome_studente;
                    //         $localStorage.user_profile.telefono = $scope.profile.telefono_studente;
                    //         $localStorage.user_profile.indirizzo = $scope.profile.indirizzo_studente;
                    //         $localStorage.user_profile.nome_uni = $scope.profile.nome_uni;
                    //         $localStorage.user_profile.id_uni = $scope.profile.id_uni;
                    //         $localStorage.user_profile.corso_laurea = $scope.profile.studente_corso_laurea;
                    //         $localStorage.user_profile.dipartimento = $scope.profile.studente_dipartimento;
                    //         $localStorage.user_profile.sesso = $scope.profile.sesso_studente;
                    //         $localStorage.user_profile.borsa = $scope.profile.borsa;
                    //
                    //
                    //         // OTHER SESSION DATA FOR STUDENT W/ SCHOLARSHIP
                    //         if ($localStorage.user_profile.borsa == 'true') {
                    //             $localStorage.user_profile.tipologia_borsa = $scope.profile.tipologia_borsa;
                    //             $localStorage.user_profile.data_inizio_borsa = $scope.profile.data_inizio_borsa;
                    //             $localStorage.user_profile.nome_mentore = $scope.profile.nome_mentore;
                    //             $localStorage.user_profile.cognome_mentore = $scope.profile.cognome_mentore;
                    //             $localStorage.user_profile.sesso_mentore = $scope.profile.sesso_mentore;
                    //             $localStorage.user_profile.mail_mentore = $scope.profile.mail_mentore;
                    //             $localStorage.user_profile.telefono_mentore = $scope.profile.telefono_mentore;
                    //         }
                    //
                    //         console.log("STEP_2");
                    //         console.log($localStorage.user_profile);
                    //         // }
                    //
                    //     })
                    //     .error(function (data, status) {
                    //         console.log("Error." + data + " " + status);
                    //
                    //     });


                    $ionicLoading.show({
                        template: 'Logging in....'
                    });

                    $timeout(function () {

                        UserService.setUser({
                            mail: $scope.user.email,
                            password: $scope.user.password
                        });

                        $localStorage.user_profile = ProfileService.getProfile();
                        $ionicLoading.hide();
                        $ionicHistory.clearCache();
                        $ionicHistory.clearHistory();
                        $ionicHistory.nextViewOptions({
                            disableBack: true,
                            historyRoot: true
                        });

                        $localStorage.loggedIn=true;
                        console.log($localStorage.loggedIn);

                        $scope.Menu();
                        console.log($rootScope.tree);

                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });

                        console.log("go_to_menuData");
                        $scope.$emit('menuData');
                        // $state.go('app.profile');
                    }, 100);

                })
                .error(function (data, status) {
                    console.log("Error." + data + " " + status);

                    obj=angular.fromJson(data);
                    if(obj.result==='402')
                    {
                        $scope.title="Login Fallita";
                        $scope.template="Password or Username wrong!";
                    }
                    else
                    {
                        $scope.title="Login fallita";
                        $scope.template="Contattare il nostro team tecnico";
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                });


        };

        $scope.user = {};


        // We need this for the form validation
        $scope.selected_tab = "";

        $scope.$on('my-tabs-changed', function (event, data) {
            $scope.selected_tab = data.title;
        });

        $scope.Menu=function () {
            // if ($scope.mentore===true) {
            if ($localStorage.loggedIn) {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Profilo",
                            icon: "ion-person",
                            level: 0,
                            state: 'app.profile'
                        },
                        // {
                        //     //to remove, jus for testing
                        //     id: 4,
                        //     name: "Aziende",
                        //     icon: "ion-briefcase",
                        //     level: 0,
                        //     state: 'app.map'
                        //     //to remove, jus for testing
                        // },
                        // {
                        //   id: 4,
                        //   name: "Layout",
                        //   icon: "ion-wand",
                        //   level: 0,
                        //   state: 'app.layouts'
                        // },
                        // {
                        //   id: 5,
                        //   name: "Forms",
                        //   icon: "ion-document",
                        //   level: 0,
                        //   state: 'app.miscellaneous'
                        // },
                        // {
                        //   id: 6,
                        //   name: "Miscellaneous",
                        //   icon: "ion-asterisk",
                        //   level: 0,
                        //   state: 'app.forms'
                        // },
                        // {
                        //   id: 7,
                        //   name: "Settings",
                        //   icon: "ion-gear-a",
                        //   level: 0,
                        //   state: 'app.settings'
                        // },
                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 10,
                            level: 0,
                            name: 'Student Help Student',
                            icon: "ion-chatbubbles",
                            items: [{
                                id: 101,
                                level: 1,
                                name: 'Inserisci annuncio',
                                icon: "ion-compose",
                                state: 'app.post_announcement'
                            }, {
                                id: 102,
                                level: 1,
                                name: 'I miei annunci',
                                icon: "ion-ios-book",
                                state: 'app.my_announcements'
                            }, {
                                id: 103,
                                level: 1,
                                name: 'Ricerca annuncio',
                                icon: "ion-ios-search-strong",
                                state: 'app.search_announcement'
                            }]
                        },
                        {
                            id: 11,
                            name: "Logout",
                            icon: "ion-android-exit",
                            level: 0,

                            onclick: "doLogOut()"

                        }
                    ];
            }
            else {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Aziende",
                            icon: "ion-briefcase",
                            level: 0,
                            state: 'app.map'
                        },
                        {
                            id: 9,
                            name: "Test",
                            icon: "Test",
                            level: 0,
                            state: 'app.shs.post_announcement'
                        },
                        // {
                        //   id: 4,
                        //   name: "Layout",
                        //   icon: "ion-wand",
                        //   level: 0,
                        //   state: 'app.layouts'
                        // },
                        // {
                        //   id: 5,
                        //   name: "Forms",
                        //   icon: "ion-document",
                        //   level: 0,
                        //   state: 'app.miscellaneous'
                        // },
                        // {
                        //   id: 6,
                        //   name: "Miscellaneous",
                        //   icon: "ion-asterisk",
                        //   level: 0,
                        //   state: 'app.forms'
                        // },
                        // {
                        //   id: 7,
                        //   name: "Settings",
                        //   icon: "ion-gear-a",
                        //   level: 0,
                        //   state: 'app.settings'
                        // },
                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        }
                        /*,
                         {
                         id: 11,
                         name: "Logout",
                         icon: "ion-android-exit",
                         level: 0,
                         onclick: "doLogOut()"
                         //state: 'walkthrough'
                         }*/
                    ];
            }
        };


    })



    .controller('ForgotPasswordCtrl', function($scope,$ionicPopup, $state,$http,$ionicHistory) {
        $scope.recoverPassword = function() {

            var params = JSON.stringify({'mail': $scope.user.email});

            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/pwresetrequest',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                .success(function (data, status) {
                    var obj = angular.fromJson(data);

                    console.log(obj.result);

                    console.log("Correct retrieve password.");

                    $scope.title = 'Password dimenticata';
                    $scope.template = 'Un\'email è stata inviata al tuo indirizzo email. Per reimpostare la password, segui le istruzioni riportate nell\'email';


                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    $state.go('auth.login');

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                })
                .error(function (data, status) {
                    console.log("Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Password dimenticata!',
                        template: 'Un\'email è stata inviata al tuo indirizzo email. Per reimpostare la password, segui le istruzioni riportate nell\'email'
                    });
                });
        }
    })


    .controller('SignupCtrl', function($rootScope,$scope, $state,$cordovaOauth,$window,$ionicLoading,UserService,$localStorage,$ionicHistory) {
        console.log($localStorage.loggedIn);

        if($localStorage.loggedIn===true)
        {

            $state.go('app.profile');
        }
        else{
            $window.localStorage.clear();
            $localStorage.loggedIn=false;
        }

        $scope.$on('menuD', function (event) {
            //refresh menu items data

            if ($localStorage.loggedIn === true) {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Profilo",
                            icon: "ion-person",
                            level: 0,
                            state: 'app.profile'
                        },
                        {
                            //to remove, jus for testing
                            id: 4,
                            name: "Aziende",
                            icon: "ion-briefcase",
                            level: 0,
                            state: 'app.map'
                            //to remove, jus for testing
                        },
                        // {
                        //   id: 4,
                        //   name: "Layout",
                        //   icon: "ion-wand",
                        //   level: 0,
                        //   state: 'app.layouts'
                        // },
                        // {
                        //   id: 5,
                        //   name: "Forms",
                        //   icon: "ion-document",
                        //   level: 0,
                        //   state: 'app.miscellaneous'
                        // },
                        // {
                        //   id: 6,
                        //   name: "Miscellaneous",
                        //   icon: "ion-asterisk",
                        //   level: 0,
                        //   state: 'app.forms'
                        // },
                        // {
                        //   id: 7,
                        //   name: "Settings",
                        //   icon: "ion-gear-a",
                        //   level: 0,
                        //   state: 'app.settings'
                        // },
                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 10,
                            level: 0,
                            name: 'Student Help Student',
                            icon: "ion-chatbubbles",
                            items: [{
                                id: 101,
                                level: 1,
                                name: 'Inserisci annuncio',
                                icon: "ion-compose",
                                state: 'app.post_announcement'
                            }, {
                                id: 102,
                                level: 1,
                                name: 'I miei annunci',
                                icon: "ion-ios-book",
                                state: 'app.my_announcements'
                            }, {
                                id: 103,
                                level: 1,
                                name: 'Ricerca annuncio',
                                icon: "ion-ios-search-strong",
                                state: 'app.search_announcement'
                            }]
                        },
                        {
                            id: 11,
                            name: "Logout",
                            icon: "ion-android-exit",
                            level: 0,

                            onclick: "doLogOut()"

                        }
                    ];
            }
            else {
                $rootScope.tree =
                    [
                        {
                            id: 1,
                            name: "Prometeo",
                            icon: "ion-android-bulb",
                            level: 0,
                            state: 'app.prometeo'
                        },
                        {
                            id: 2,
                            name: "News",
                            icon: "ion-ios-paper-outline",
                            level: 0,
                            state: 'app.feeds-categories'
                        },
                        {
                            id: 3,
                            name: "Aziende",
                            icon: "ion-briefcase",
                            level: 0,
                            state: 'app.map'
                        },

                        {
                            id: 8,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 9,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 10,
                            name: "Test",
                            icon: "Test",
                            level: 0,
                            state: 'app.shs.post_announcement'
                        }
                    ];
            }
            //clear the state
            if(!$scope.$$phase) {
                $scope.$apply();
            }
            $state.go('app.feeds-categories', {}, { reload: true });

        });

        $scope.Ospite = function() {

            /*$scope.Menu=function () {
             if ($localStorage.loggedIn === true) {
             $rootScope.tree =
             [
             {
             id: 1,
             name: "Prometeo",
             icon: "ion-bookmark",
             level: 0,
             state: 'app.prometeo'
             },
             {
             id: 2,
             name: "News",
             icon: "ion-ios-paper-outline",
             level: 0,
             state: 'app.feeds-categories'
             },
             {
             id: 3,
             name: "Profilo",
             icon: "ion-person",
             level: 0,
             state: 'app.profile'
             },
             {
             //to remove, jus for testing
             id: 4,
             name: "Aziende",
             icon: "ion-briefcase",
             level: 0,
             state: 'app.map'
             //to remove, jus for testing
             },

             {
             id: 8,
             name: "Questionario Prometeo",
             icon: "ion-android-clipboard",
             level: 0,
             state: 'app.codice'
             },
             {
             id: 9,
             name: "Quiz affinità",
             icon: "ion-university",
             level: 0,
             state: 'app.hobby'
             },
             {
             id: 10,
             level: 0,
             name: 'Student Help Student',
             icon: "ion-chatbubbles",
             items: [{
             id: 101,
             level: 1,
             name: 'Inserisci annuncio',
             icon: "ion-compose",
             state: 'app.post_announcement'
             }, {
             id: 102,
             level: 1,
             name: 'I miei annunci',
             icon: "ion-ios-book",
             state: 'app.my_announcements'
             }, {
             id: 103,
             level: 1,
             name: 'Ricerca annuncio',
             icon: "ion-ios-search-strong",
             state: 'app.search_announcement'
             }]
             },
             {
             id: 11,
             name: "Logout",
             icon: "ion-android-exit",
             level: 0,

             onclick: "doLogOut()"

             }
             ];
             }
             else {
             $rootScope.tree =
             [
             {
             id: 1,
             name: "Prometeo",
             icon: "ion-bookmark",
             level: 0,
             state: 'app.prometeo'
             },
             {
             id: 2,
             name: "News",
             icon: "ion-ios-paper-outline",
             level: 0,
             state: 'app.feeds-categories'
             },
             {
             id: 3,
             name: "Aziende",
             icon: "ion-briefcase",
             level: 0,
             state: 'app.map'
             },

             {
             id: 8,
             name: "Questionario Prometeo",
             icon: "ion-android-clipboard",
             level: 0,
             state: 'app.codice'
             },
             {
             id: 9,
             name: "Quiz affinità",
             icon: "ion-university",
             level: 0,
             state: 'app.hobby'
             }
             ];
             }
             };*/
            //$scope.Menu();
            $scope.$emit('menuD');
            // $state.go('app.feeds-categories');
        };


        $scope.doSignUp = function() {
            $ionicLoading.show({
                template: 'Logging in...'
            });

            window.plugins.googleplus.login(
                {},
                function (user_data) {
                    cosole.log(user_data);

                    UserService.setUser({
                        userID: user_data.userId,
                        name: user_data.displayName,
                        email: user_data.email,
                        picture: user_data.imageUrl,
                        accessToken: user_data.accessToken,
                        idToken: user_data.idToken
                    });
                    $ionicLoading.hide();
                    state.go('app.profile');
                },
                function (msg) {
                    $ionicLoading.hide();
                    console.log(msg);
                    /*	$cordovaOauth.google("309598013941-pngj3mfb49ql02q60gohp8mbvcb3rf3d.apps.googleusercontent.com", ["email", "profile"]).then(function (result)
                     {
                     $scope.details = result.access_token;
                     console.log("Auth Succes..!!"+result);

                     }, function (error) {
                     console.log("Auth failed..!!"+error);
                     });
                     */
                }
            );
        };
    })


    .controller('safeCtrl', function ($scope,$http,$ionicHistory,$ionicPopup,UserService,$localStorage,$ionicLoading,$state,$ionicModal) {


        $scope.show = function() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };
        $scope.user = UserService.getUser();
        console.log($scope.user);

        $scope.piano=[];
        $scope.checkPs={};

        var params = JSON.stringify( {'mail': $scope.user.mail,'password':$scope.user.password} );
        $scope.show($ionicLoading);
        $http({
            method :'POST',
            url:'https://arctic-window-132923.appspot.com/list_ps',
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .success(function (data, status) {

                $scope.piano=angular.fromJson(data);
                console.log($scope.piano);

                if(status === '200')
                {

                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    // the user is redirected to login page after sign up

                }

            })
            .error(function (data, status) {

                console.log("Error." + data + " " + status);

                console.log("Errore lista piano studi.");
                $scope.title = "Errore connessione";
                $scope.template = "Contattare il nostro team tecnico";


                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });

            })
            .finally(function ($ionicLoading) {
                $scope.hide($ionicLoading);
            });

        /*$http.get('attivita.json').success(function(response) {
         $scope.piano = response;
         console.log($scope.piano);
         });*/


        $scope.Confirm=function () {
            /*for (var i in $scope.checkPs) {

             if ($scope.checkPs[i])
             console.log(i);

             }*/
            console.log($scope.radioAttivita.text);

            var params = JSON.stringify( {'mail': $scope.user.mail,'password':$scope.user.password,'id_att':$scope.radioAttivita.text.toString()} );
            console.log(params);
            $scope.show($ionicLoading);
            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/complete_PS',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    $scope.piano=angular.fromJson(data);
                    console.log($scope.piano);


                    $ionicHistory.clearHistory();
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    console.log("tutto ok frat'm");
                    // the user is redirected to login page after sign up
                    $scope.title = "Conferma inviata";
                    $scope.template = "L'attività è in attesa di conferma da parte del mentor";

                    $scope.hide($ionicLoading);
                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                    console.log("prima di go");
                    $state.go('app.profile');



                })
                .error(function (data, status) {
                    $scope.hide($ionicLoading);
                    console.log("Error." + data + " " + status);

                    console.log("Errore lista piano studi.");
                    $scope.title = "Errore connessione";
                    $scope.template = "Contattare il nostro team tecnico";


                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                });




        };


        $scope.isThisDisabledAttivita=function() {

            for (var i in $scope.checkPs) {

                if ($scope.checkPs[i])
                    return true;

            }
            return false;
        };


        $scope.radioAttivita={text:'1'};


        $scope.isThisDisabled2Attivita=function() {


            if($scope.radioAttivita.text==1)
                return true;
            else
                return false;

        };


        $scope.modal= $ionicModal.fromTemplate('<ion-modal-view > <ion-header-bar class="bar bar-header bar-positive"> <h1 class="title">Nuova attività</h1> <button class="button button-clear button-primary" ng-click="close()">Annulla</button> </ion-header-bar> <ion-content class="padding"> <form name="form_attivita" class="" novalidate ng-cloak> <div class="list"> <label class="item item-input"> <span class="input-label">Nome</span> <input ng-model="attivita.nome" type="text" required></label> <label class="item item-input"><span class="input-label">CFU</span> <input ng-model="attivita.cfu" type="number" required></label> <label class="item item-input"> <span class="input-label">Tipo <select style="width: 100%; margin-left: 5px; font-size: 15px" ng-model="attivita.tipo" required> <option value="Univ">Universita</option> <option  value="Extra">Extra</option> </select> </span> </label> <button class="button button-full button-positive" ng-click="addAttivita(attivita)" ng-disabled="!form_attivita.$valid">Aggiungi</button> </div> </form> </ion-content> </ion-modal-view>',
            {scope:$scope});




        $scope.close=function () {
            $scope.modal.hide();
        };

        $scope.openModal=function () {
            $scope.modal.show();
        };
        $scope.addAttivita=function (object) {
            $scope.attivita=object;

            console.log($scope.attivita);

            var params = JSON.stringify( {
                'mail': $scope.user.mail,
                'password': $scope.user.password,
                'attiv_nome': $scope.attivita.nome,
                'attiv_cfu': $scope.attivita.cfu,
                'attiv_tipo': $scope.attivita.tipo

            });
            console.log(params);
            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/insert_ps',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj=angular.fromJson(data);
                    console.log(obj.result);

                    if(obj.result === 200)
                    {
                        console.log("Insert attività ok.");
                        $scope.title="Attivita";
                        $scope.template="Attivita inserita corettamente!";
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        // the user is redirected to login page after sign up
                        //$state.go('app.piano-studi', {}, {location: "replace", reload: true});
                        $scope.close();
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {
                    console.log("Error." + data + " " + status);

                    if (obj.result === '404')
                    {
                        console.log("Insert ko");
                        $scope.title="Attività";
                        $scope.template="Inserimento attività non riuscito!";
                        //resettare i parametri focus email
                    }
                    else
                    {
                        console.log("Insert ko");
                        $scope.title="Attività";
                        $scope.template="Inserimento attività non riuscito!";
                    }


                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                });

        };


    })


    .controller('AttivitaCtrl', function ($scope,$state,$stateParams, $ionicModal,$http,$ionicPopup,UserService)
    {

        $scope.doRefresh = function() {

            $scope.user = UserService.getUser();
            $scope.attivita = [];

            var params = JSON.stringify({'mail': $scope.user.mail, 'password': $scope.user.password});
            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/list_ps_incomplete',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    $scope.attivita = angular.fromJson(data);
                    $scope.$broadcast('scroll.refreshComplete');
                    console.log($scope.attivita);
                    console.log(status);

                })
                .error(function (data, status) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore!',
                        template: 'Non è possibile caericare la lista delle attività !'
                    });
                });
        };

        $scope.doRefresh();



        $scope.gotoPost = function(attivitaId) {
            $state.go('app.note', {'attivitaId': +attivitaId});
        };
    })




    .controller('NoteCtrl', function ($scope,$http,$ionicLoading,NoteService,$ionicModal,$ionicHistory,$ionicPopup,$stateParams) {


        //$scope.note = [];

        var paramsToPost  = $stateParams.attivitaId;
        console.log($stateParams);

        $scope.doRefresh = function() {

            $ionicLoading.show({
                template: '<p>Loading note...</p><ion-spinner icon="spiral"></ion-spinner>'

            });

            var  params = JSON.stringify( {'id_att': paramsToPost} );

            return $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/list_notes',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .success(function (data, status) {
                    //var obj=angular.fromJson(data);
                    $scope.note=data;
                    $ionicLoading.hide();
                    // console.log($scope.note);
                })
                .error(function (data, status) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Note!',
                        template: 'Non ci sono note per la seguente attività!'
                    });
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });


        };

        $scope.doRefresh();




        $scope.modal= $ionicModal.fromTemplate('<ion-modal-view > <ion-header-bar class="bar bar-header bar-positive"> <h1 class="title">Nuova Nota </h1> <button class="button button-clear button-primary" ng-click="close()">Annulla</button> </ion-header-bar> <ion-content class="padding"> <form name="form_nota"  class="" novalidate ng-cloak> <div class="list"> <label class="item item-input"> <input ng-model="nota.titolo" type="text" placeholder="Titolo" required> </label>  <label class="item item-input"> <textarea style="resize: none;width: 100%;" ng-model="nota.testo" placeholder="Nota (Max) 250 chars." ng-minlength="1" ng-maxlength="250" maxlength="250" rows="10" required></textarea>   </label> <button class="button button-full button-positive" ng-click="addNota(nota)" ng-disabled="!form_nota.$valid">Aggiungi</button> </div> </form> </ion-content> </ion-modal-view>',
            {scope:$scope});


        $scope.close=function () {
            $scope.modal.hide();
        };

        $scope.openModalNote=function () {
            $scope.modal.show();
        };


        $scope.addNota=function (object) {
            $scope.nota=object;

            console.log($scope.nota);

            var params = JSON.stringify( {
                "id_att":paramsToPost,
                "titolo_nota":$scope.nota.titolo,
                "note":$scope.nota.testo

            });
            console.log(params);
            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/insert_note',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj=angular.fromJson(data);
                    console.log(obj.result);

                    if(obj.result === 200)
                    {
                        console.log("Insert note ok.");
                        $scope.title="Nota";
                        $scope.template="Nota inserita corettamente!";
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $scope.nota.titolo="";
                        $scope.nota.testo="";
                        $scope.close();
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {
                    console.log("Error." + data + " " + status);

                    if (obj.result === '404')
                    {
                        console.log("Insert ko");
                        $scope.title="Nota";
                        $scope.template="Inserimento Nota non riuscito!";
                        //resettare i parametri focus email
                    }
                    else
                    {
                        console.log("Insert ko");
                        $scope.title="Nota";
                        $scope.template="Inserimento Nota non riuscito!";
                    }


                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                });
        };
    })




    //STUDENT HELP STUDENT SECTION
    .controller('InsertAnnouncementCtrl', function($filter,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicLoading) {


        $scope.current_date = $filter('date')(new Date(), 'yyyy-MM-dd');

        // $scope.min_date = new Date();

        // {
        //     "mail_post_stud": "davide.nardone@live.it",
        //     "title": "titolo1",
        //     "description": "desc1",
        //     "category": "categoria1",
        //     "expiring_date": "2017-01-30"
        // }

        $scope.proj = {};

        $scope.user = UserService.getUser();

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Inserimento Annuncio...</p><ion-spinner icon="spiral"></ion-spinner>',
                duration: 3000
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };


        $scope.doInsertAnnouncement = function () {

            var params = JSON.stringify(
                {
                    "mail_post_stud":   $scope.user.mail,
                    "title":            $scope.proj.title,
                    "description":      $scope.proj.description,
                    "category":         $scope.proj.category,
                    "expiring_date":    $filter('date')(new Date($scope.proj.expiring_date), 'yyyy-MM-dd')
                });


            // console.log($scope.proj.title);
            console.log(params);
            $scope.show($ionicLoading);

            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/insert_announcement',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    console.log("Annuncio Inserito con successo!");
                    $scope.title = "Annuncio Inserito";
                    $scope.template = "Traccia i tuo annunci nella sezione: 'I miei Annunci'";

                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    // the user is redirected to login page after sign up
                    $state.go('app.my_announcements');


                })
                .error(function (data, status) {
                    console.log("Error." + data + " " + status);

                    console.log("Errore nell'inserimento dell'annuncio.");
                    $scope.title = "Errore connessione";
                    $scope.template = "Contattare il nostro team tecnico";

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                }).finally(function ($ionicLoading) {
                $scope.hide($ionicLoading);

                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });
            });
        };

    })




    .controller('RateApp', function($scope) {
        $scope.rateApp = function(){
            if(ionic.Platform.isIOS()){
                //you need to set your own ios app id
                AppRate.preferences.storeAppURL.ios = '1234555553>';
                AppRate.promptForRating(true);
            }else if(ionic.Platform.isAndroid()){
                //you need to set your own android app id
                AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
                AppRate.promptForRating(true);
            }
        };
    })

    .controller('SendMailCtrl', function($scope) {
        $scope.sendMail = function(){
            cordova.plugins.email.isAvailable(
                function (isAvailable) {
                    // alert('Service is not available') unless isAvailable;
                    cordova.plugins.email.open({
                        to:      'envato@startapplabs.com',
                        cc:      'hello@startapplabs.com',
                        // bcc:     ['john@doe.com', 'jane@doe.com'],
                        subject: 'Greetings',
                        body:    'How are you? Nice greetings from IonFullApp'
                    });
                }
            );
        };
    })


    //
    // $scope.university = null;
    //
    // //  The user has selected a Customer from our Drop Down List.  Let's load this Customer's records.
    // $http.get('https://arctic-window-132923.appspot.com/list_universities')
    //     .success(function (data) {
    //         $scope.university = data;
    //     })
    //     .error(function (data, status, headers, config) {
    //         $scope.errorMessage = "Couldn't load the list of University, error # " + status;
    //     });
    //
    //
    //     var params = JSON.stringify( {'nome': $scope.reg.nome,
    //         'cognome': $scope.reg.cognome,
    //         'mail': $scope.reg.email,
    //         'password': $scope.reg.password,
    //         'dn': $scope.reg.date,
    //         'sex': $scope.reg.sex,
    //         'universita_id':$scope.reg.universita,
    //         'phone': $scope.reg.phone
    //     });


    // add the following plug in: ionic plugin add cordova-plugin-googlemaps
    .controller('MapCtrl', function($scope,$state,$http,$ionicPopup,$ionicLoading) {

        //TODO: insert background image into ionicLoading
        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
                // templateUrl: '../views/test.html'
            });
            // content: 'Loading',
            //     animation: 'fade-in',
            //     showBackdrop: true,
            //     maxWidth: 200,
            //     showDelay: 0
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show($ionicLoading);
        $http({
            method :'GET',
            url:'https://arctic-window-132923.appspot.com/get_companies_info',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .success(function (data, status) {
                var cities = angular.fromJson(data);
                // console.log(obj[0].lon);

                // // 1. Google Map //
                // var cities = [
                //     {
                //         city : 'Vomero',
                //         desc : 'Test',
                //         lat : 40.843002,
                //         long : 14.231061
                //     },
                //     {
                //         city : 'Arenella',
                //         desc : 'Test',
                //         lat : 40.852773,
                //         long : 14.230678
                //     },
                //     {
                //         city : 'Rione Alto',
                //         desc : 'Test',
                //         lat : 40.859662,
                //         long : 14.221276
                //     },
                //     {
                //         city : 'Caserta',
                //         desc : 'Test',
                //         lat : 41.071687,
                //         long : 14.329664
                //     },
                //     {
                //         city : 'Pozzuoli',
                //         desc : 'Test',
                //         lat : 40.846243,
                //         long : 14.082984
                //     }
                // ];

                var options = {timeout: 10000, enableHighAccuracy: true};


                //TODO: insert ionicLoagin with image

                // $ionicLoading.show({
                //     template: 'Loading....',
                //     duration: 3000
                // });
                //
                //
                // $ionicLoading.hide();

                // Map Settings //
                $scope.initialise = function() {

                    // Center of Italy
                    var latLng = new google.maps.LatLng(42.988358, 12.623107);

                    var mapOptions = {
                        center: latLng,
                        zoom: 5,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };


                    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                    // Geo Location
                    // navigator.geolocation.getCurrentPosition(function(pos) {
                    //     map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                    //     var myLocation = new google.maps.Marker({
                    //         position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    //         map: map,
                    //         animation: google.maps.Animation.DROP,
                    //         title: "My Location"
                    //     });
                    // });

                    $scope.map = map;
                    // Additional Markers //
                    $scope.markers = [];

                    var infoWindow = new google.maps.InfoWindow();

                    var createMarker = function (info){
                        // console.log(info);
                        //Wait until the map is loaded
                        google.maps.event.addListenerOnce($scope.map, 'idle', function(){

                            var marker = new google.maps.Marker({
                                map: $scope.map,
                                animation: google.maps.Animation.DROP,
                                position: new google.maps.LatLng(info.lat, info.lon),
                                title: info.nome
                            });


                            marker.content = '<div>' +
                                '<p><b>Indirizzo: </b>' + info.indirizzo + '</p>' +
                                '<p><b>E-mail: </b>' + info.info_mail + '</p>';


                            if (info.phone != '-'){
                                marker.content +=  '<p><b>Telefono: </b>' + info.phone + '</p>';
                            }
                            //TODO: do inner opening browser with href
                            if (info.link_sito != '-'){
                                marker.content += '<p><b>Sito web: </b><a href=' + info.link_sito + '>' + info.link_sito + '</a> </p>';
                            }

                            marker.content += '</div>';


                            google.maps.event.addListener(marker, 'click', function(){
                                infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
                                infoWindow.open($scope.map, marker);
                            });
                            $scope.markers.push(marker);

                        });

                    };


                    for (i = 0; i < cities.length; i++){
                        createMarker(cities[i]);
                    }

                };

                google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());

            })
            .error(function (data, status) {
                console.log("Error storing device token." + data + " " + status);

                $scope.title = "Qualcosa non è andato a buon fine!";
                $scope.template = "Contattare il nostro team tecnico";

                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });
            })
            .finally(function ($ionicLoading) {
                $scope.hide($ionicLoading);
            });


        //My position
        // $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        //
        //     //Wait until the map is loaded
        //     google.maps.event.addListenerOnce($scope.map, 'idle', function(){
        //
        //         $scope.centerOnMe= function(){
        //
        //             var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //             var mapOptions = {
        //                 center: myLatLng,
        //                 zoom: 15,
        //                 mapTypeId: google.maps.MapTypeId.ROADMAP
        //             };
        //
        //             $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //
        //             $scope.map.setCenter(myLatLng);
        //
        //             var marker = new google.maps.Marker({
        //                 map: $scope.map,
        //                 animation: google.maps.Animation.DROP,
        //                 position: myLatLng
        //             });
        //
        //             var infoWindow = new google.maps.InfoWindow({
        //                 content: "Here I am!"
        //             });
        //
        //             google.maps.event.addListener(marker, 'click', function () {
        //                 infoWindow.open($scope.map, marker);
        //             });
        //         };
        //
        //     });
        //
        // }, function(error){
        //     console.log("Could not get location");
        // });
    })

    .controller('PrometeoCtrl', function($scope,$state,$http,$ionicPopup) {


    })


    // .controller('MapsCtrl', function($scope, $ionicLoading) {
    //
    // 	$scope.info_position = {
    // 		lat: 43.07493,
    // 		lng: -89.381388
    // 	};
    //
    // 	$scope.center_position = {
    // 		lat: 43.07493,
    // 		lng: -89.381388
    // 	};
    //
    // 	$scope.my_location = "";
    //
    // 	$scope.$on('mapInitialized', function(event, map) {
    // 		$scope.map = map;
    // 	});
    //
    // 	$scope.centerOnMe= function(){
    //
    // 		$scope.positions = [];
    //
    // 		$ionicLoading.show({
    // 			template: 'Loading...'
    // 		});
    //
    // 		// with this function you can get the user’s current position
    // 		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
    // 		navigator.geolocation.getCurrentPosition(function(position) {
    // 			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // 			$scope.current_position = {lat: pos.G,lng: pos.K};
    // 			$scope.my_location = pos.G+", "+pos.K;
    // 			$scope.map.setCenter(pos);
    // 			$ionicLoading.hide();
    // 		});
    // 	};
    // })

    .controller('AdsCtrl', function($scope, $ionicActionSheet, AdMob, iAd) {

        $scope.manageAdMob = function() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                buttons: [
                    { text: 'Show Banner' },
                    { text: 'Show Interstitial' }
                ],
                destructiveText: 'Remove Ads',
                titleText: 'Choose the ad to show',
                cancelText: 'Cancel',
                cancel: function() {
                    // add cancel code..
                },
                destructiveButtonClicked: function() {
                    console.log("removing ads");
                    AdMob.removeAds();
                    return true;
                },
                buttonClicked: function(index, button) {
                    if(button.text == 'Show Banner')
                    {
                        console.log("show banner");
                        AdMob.showBanner();
                    }

                    if(button.text == 'Show Interstitial')
                    {
                        console.log("show interstitial");
                        AdMob.showInterstitial();
                    }

                    return true;
                }
            });
        };

        $scope.manageiAd = function() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                buttons: [
                    { text: 'Show iAd Banner' },
                    { text: 'Show iAd Interstitial' }
                ],
                destructiveText: 'Remove Ads',
                titleText: 'Choose the ad to show - Interstitial only works in iPad',
                cancelText: 'Cancel',
                cancel: function() {
                    // add cancel code..
                },
                destructiveButtonClicked: function() {
                    console.log("removing ads");
                    iAd.removeAds();
                    return true;
                },
                buttonClicked: function(index, button) {
                    if(button.text == 'Show iAd Banner')
                    {
                        console.log("show iAd banner");
                        iAd.showBanner();
                    }
                    if(button.text == 'Show iAd Interstitial')
                    {
                        console.log("show iAd interstitial");
                        iAd.showInterstitial();
                    }
                    return true;
                }
            });
        };
    })

    // FEED
    //brings all feed categories
    .controller('FeedsCategoriesCtrl', function($scope, $http,$ionicNavBarDelegate) {
        $scope.feeds_categories = [];

        //fix the problem of removing the "back" buttone after taking the quiz
        // $ionicNavBarDelegate.showBackButton(false);

        $http.get('news.json').success(function(response) {
            $scope.feeds_categories = response;
        });
    })

    //bring specific category providers
    .controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
        $scope.category_sources = [];

        $scope.categoryId = $stateParams.categoryId;

        $http.get('news.json').success(function(response) {
            var category = _.find(response, {id: $scope.categoryId});
            $scope.categoryTitle = category.title;
            $scope.category_sources = category.feed_sources;
        });
    })

    //this method brings posts for a source provider
    .controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
        $scope.feed = [];

        var categoryId = $stateParams.categoryId,
            sourceId = $stateParams.sourceId;

        $scope.doRefresh = function() {

            $http.get('feeds-categories.json').success(function(response) {

                $ionicLoading.show({
                    template: 'Loading entries...'
                });

                var category = _.find(response, {id: categoryId }),
                    source = _.find(category.feed_sources, {id: sourceId });

                $scope.sourceTitle = source.title;

                FeedList.get(source.url)
                    .then(function (result) {
                        $scope.feed = result.feed;
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.refreshComplete');
                    }, function (reason) {
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            });
        };

        $scope.doRefresh();

        $scope.bookmarkPost = function(post){
            $ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
            BookMarkService.bookmarkFeedPost(post);
        };
    })

    // SETTINGS
    .controller('SettingsCtrl', function($scope, $ionicActionSheet, $state) {
        $scope.airplaneMode = true;
        $scope.wifi = false;
        $scope.bluetooth = true;
        $scope.personalHotspot = true;

        $scope.checkOpt1 = true;
        $scope.checkOpt2 = true;
        $scope.checkOpt3 = false;

        $scope.radioChoice = 'B';

        // Triggered on a the logOut button click
        $scope.showLogOutMenu = function() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                // buttons: [
                // { text: '<b>Share</b> This' },
                // { text: 'Move' }
                // ],
                destructiveText: 'Logout',
                titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
                cancelText: 'Cancel',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    //Called when one of the non-destructive buttons is clicked,
                    //with the index of the button that was clicked and the button object.
                    //Return true to close the action sheet, or false to keep it opened.
                    return true;
                },
                destructiveButtonClicked: function(){
                    //Called when the destructive button is clicked.
                    //Return true to close the action sheet, or false to keep it opened.
                    $state.go('walkthrough');
                }
            });

        };
    })

    // TINDER CARDS
    .controller('TinderCardsCtrl', function($scope, $http) {

        $scope.cards = [];


        $scope.addCard = function(img, name) {
            var newCard = {image: img, name: name};
            newCard.id = Math.random();
            $scope.cards.unshift(angular.extend({}, newCard));
        };

        $scope.addCards = function(count) {
            $http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
                angular.forEach(value.data.results, function (v) {
                    $scope.addCard(v.user.picture.large, v.user.name.first + " " + v.user.name.last);
                });
            });
        };

        $scope.addFirstCards = function() {
            $scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/left.png","Nope");
            $scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/right.png", "Yes");
        };

        $scope.addFirstCards();
        $scope.addCards(5);

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
            $scope.addCards(1);
        };

        $scope.transitionOut = function(card) {
            console.log('card transition out');
        };

        $scope.transitionRight = function(card) {
            console.log('card removed to the right');
            console.log(card);
        };

        $scope.transitionLeft = function(card) {
            console.log('card removed to the left');
            console.log(card);
        };
    })


    // BOOKMARKS
    .controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

        $scope.bookmarks = BookMarkService.getBookmarks();

        // When a new post is bookmarked, we should update bookmarks list
        $rootScope.$on("new-bookmark", function(event){
            $scope.bookmarks = BookMarkService.getBookmarks();
        });

        $scope.goToFeedPost = function(link){
            window.open(link, '_blank', 'location=yes');
        };
        $scope.goToWordpressPost = function(postId){
            $state.go('app.post', {postId: postId});
        };
    })

    // WORDPRESS
    .controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
        $scope.posts = [];
        $scope.page = 1;
        $scope.totalPages = 1;

        $scope.doRefresh = function() {
            $ionicLoading.show({
                template: 'Loading posts...'
            });

            //Always bring me the latest posts => page=1
            PostService.getRecentPosts(1)
                .then(function(data){
                    $scope.totalPages = data.pages;
                    $scope.posts = PostService.shortenPosts(data.posts);

                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.loadMoreData = function(){
            $scope.page += 1;

            PostService.getRecentPosts($scope.page)
                .then(function(data){
                    //We will update this value in every request because new posts can be created
                    $scope.totalPages = data.pages;
                    var new_posts = PostService.shortenPosts(data.posts);
                    $scope.posts = $scope.posts.concat(new_posts);

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        };

        $scope.moreDataCanBeLoaded = function(){
            return $scope.totalPages > $scope.page;
        };

        $scope.bookmarkPost = function(post){
            $ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
            BookMarkService.bookmarkWordpressPost(post);
        };

        $scope.doRefresh();
    })

    // WORDPRESS POST
    .controller('WordpressPostCtrl', function($scope, post_data, $ionicLoading) {

        $scope.post = post_data.post;
        $ionicLoading.hide();

        $scope.sharePost = function(link){
            window.plugins.socialsharing.share('Check this post here: ', null, null, link);
        };
    })



    .controller('ImagePickerCtrl', function($scope, $rootScope, $cordovaCamera) {

        $scope.images = [];

        $scope.selImages = function() {

            window.imagePicker.getPictures(
                function(results) {
                    for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                        $scope.images.push(results[i]);
                    }
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }
                }, function (error) {
                    console.log('Error: ' + error);
                }
            );
        };

        $scope.removeImage = function(image) {
            $scope.images = _.without($scope.images, image);
        };

        $scope.shareImage = function(image) {
            window.plugins.socialsharing.share(null, null, image);
        };

        $scope.shareAll = function() {
            window.plugins.socialsharing.share(null, null, $scope.images);
        };
    })

;
