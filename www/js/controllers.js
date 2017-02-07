angular.module('your_app_name.controllers', ["ngStorage",'chart.js'])

    .controller('AuthCtrl', function($scope, $ionicConfig) {

    })

    .controller('SideMenuCtrl', function($rootScope,$scope,UserService,ProfileService,$localStorage,$window,$state,$ionicHistory,$ionicLoading,$timeout) {

        $localStorage.user_profile = ProfileService.getProfile();

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
                            name: "Privacy",
                            icon: "ion-ios-locked",
                            level: 0,
                            state: 'app.inner_termini'
                        },
                        {
                            id: 12,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
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
                            name: "Privacy",
                            icon: "ion-ios-locked",
                            level: 0,
                            state: 'app.inner_termini'
                        },
                        {
                            id: 11,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
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

            $ionicLoading.show({
                template: 'Disconnessione....'
            });

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
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                UserService.resetUser();
                $scope.Menu();
                $scope.$emit('menuDataChange');
            }, 100);

        };


        if ($localStorage.user_profile.sesso===undefined)
        {
            $localStorage.user_profile.sesso='N';
            $localStorage.user_profile.nome='Ospite';
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
                            name: "Privacy",
                            icon: "ion-ios-locked",
                            level: 0,
                            state: 'app.inner_termini'
                        },
                        {
                            id: 12,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
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
                            name: "Privacy",
                            icon: "ion-ios-locked",
                            level: 0,
                            state: 'app.inner_termini'
                        },
                        {
                            id: 11,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
                        }
                    ];
            }
        };

        $scope.Menu();
    })

    .controller('AnnouncementsCtrl', function($timeout,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$ionicLoading,$localStorage,$ionicTabsDelegate,$rootScope) {


        $scope.user = UserService.getUser();

        $timeout( function() {
            $ionicTabsDelegate .select(0);
        },400);

        $rootScope.$on("CallParentGetInfoMyAnnouncements", function(){
            $scope.getInfoMyAnnouncements(1);
        });

        $rootScope.$on("CallParentGetInfoMyAppliedAnnouncements", function(){
            $scope.getInfoMyAppliedAnnouncements(1);
        });

        $rootScope.$on("CallParentgetGetInfoArchivedAnnouncements", function(){
            $scope.getInfoArchivedAnnouncements(1);
        });


        $scope.getInfoMyAnnouncements = function(par) {

            $ionicTabsDelegate.select(0);

            $scope.info_my_ann = {};

            if(par==1) {
                $scope.show = function () {
                    $ionicLoading.show({
                        template: '<p>Caricamento...</p><ion-spinner icon="spiral"></ion-spinner>'
                    });
                };

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            }

            var params = JSON.stringify({'mail_student': $scope.user.mail});
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

                    if(typeof $scope.info_my_ann[0]==='undefined' || $scope.info_my_ann[0]===null)
                        $scope.my_empty=true;
                })
                .error(function (data, status) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                })
                .finally(function ($ionicLoading) {
                    if(par==1)
                        $scope.hide($ionicLoading);
                });
        };

        $scope.getInfoMyAppliedAnnouncements = function(par) {

            $ionicTabsDelegate.select(1);

            $scope.info_my_app_ann = {};

            if(par===1) {
                $scope.show = function () {
                    $ionicLoading.show({
                        template: '<p>Caricamento...</p><ion-spinner icon="spiral"></ion-spinner>'
                    });
                };

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            }

            var params = JSON.stringify({'mail_student': $scope.user.mail});

            if(par===1)
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

                    if(typeof $scope.info_my_app_ann[0]==='undefined' || $scope.info_my_app_ann[0]===null)
                        $scope.app_empty=true;

                })
                .error(function (data, status) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                })
                .finally(function ($ionicLoading) {
                    if(par===1)
                        $scope.hide($ionicLoading);
                });

        };

        $scope.getInfoArchivedAnnouncements = function(par) {

            $ionicTabsDelegate .select(2);

            $scope.info_my_app_ann = {};

            if(par==1) {
                $scope.show = function () {
                    $ionicLoading.show({
                        template: '<p>Caricamento...</p><ion-spinner icon="spiral"></ion-spinner>'
                    });
                };

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            }

            var params = JSON.stringify({'mail_student': $scope.user.mail});
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
                })
                .error(function (data, status) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                })
                .finally(function ($ionicLoading) {
                    if(par==1)
                        $scope.hide($ionicLoading);
                });
        };

        $scope.getInfoMyAnnouncements(1);

        $scope.doRefresh = function(par) {

            // $ionicLoading.show({
            //     template: 'Caricamento note...'
            // });

            if(par===0)
                $scope.getInfoMyAnnouncements(1);
            else if(par===1)
                $scope.getInfoMyAppliedAnnouncements(0);

            // $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        };

    })

    .controller('MyAnnouncementsCtrl', function($filter,$window,$timeout,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicLoading,$ionicTabsDelegate,$ionicActionSheet,$ionicModal,$rootScope) {

        $scope.user = UserService.getUser();

        $scope.to_update = $localStorage.info_ann;

        $scope.my_ann_bool = false;

        // Triggered on a the item click
        $scope.showMenu = function(obj) {

            obj.data_scadenza = $filter('limitTo')(obj.data_scadenza,10,0);
            obj.data_scadenza = new Date($filter('date')(obj.data_scadenza.toString(),'yyyy-MM-dd'));

            $localStorage.info_ann = obj;

            var menu_buttons = [];

            menu_buttons.push({text: 'Info'});
            menu_buttons.push({text: 'Modifica'});

            if(obj.num_cand > 0)
                menu_buttons.push({text: '<b>Stop</b>'});

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

                    //code for 'Modifica' function
                    if(index===0) {

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

                                $scope.modal = $ionicModal.fromTemplateUrl('../www/views/modals/info_announcement.html', {
                                    scope: $scope,
                                    animation: 'slide-in-up'
                                }).then(function(modal) {
                                    modal.info_candidates = data;
                                    modal.info_announcement = obj;

                                    // modal.info_announcement.data_scadenza = $filter('limitTo')(modal.info_announcement.data_scadenza.toString(),10,0);
                                    modal.info_announcement.data_scadenza = $filter('date')(modal.info_announcement.data_scadenza,'dd-MM-yyyy');

                                    $scope.modal = modal;

                                    $scope.modal.show();
                                });

                                $scope.close=function () {
                                    $scope.modal.hide();
                                };


                            })
                            .error(function (data, status) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Errore connessione!',
                                    template: 'Si prega di controllare la connessione ad internet!'
                                });
                            })
                            .finally(function ($ionicLoading) {
                                $scope.hide($ionicLoading);
                            });
                    }
                    else if (index===1)
                        $state.go('app.update_announcement');

                    else if(index===2) {

                        $scope.show = function () {
                            $ionicLoading.show({
                                template: '<p>Caricamento...</p><ion-spinner icon="spiral"></ion-spinner>'
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

                                $scope.title="Annuncio Stoppato";
                                $scope.template="Controlla la mail per visualizzare i candidati alla risoluzione dell'annuncio da te selezionato.";


                                $ionicHistory.currentTitle( {
                                    disableAnimate: true,
                                    disableBack: true
                                });

                                var alertPopup = $ionicPopup.alert({
                                    title: $scope.title,
                                    template: $scope.template
                                });
                                alertPopup.then(function(res) {
                                    $rootScope.$emit("CallParentGetInfoMyAnnouncements", {});
                                });
                            })
                            .error(function (data, status) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Errore connessione!',
                                    template: 'Si prega di controllare la connessione ad internet!'
                                });
                            })
                            .finally(function ($ionicLoading) {
                                $scope.hide($ionicLoading);
                            });

                    }


                    return true;
                },
                destructiveButtonClicked: function(){

                    $scope.show = function () {
                        $ionicLoading.show({
                            template: '<p>Eliminazione annuncio...</p><ion-spinner icon="spiral"></ion-spinner>'
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

                            var alertPopup = $ionicPopup.alert({
                                title: 'Annuncio cancellato!',
                                template: 'L\'annuncio selezionato è stato cancellato!'
                            });
                            alertPopup.then(function (res) {
                                $rootScope.$emit("CallParentGetInfoMyAnnouncements", {});

                            });


                        })
                        .error(function (data, status) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Errore connessione!',
                                template: 'Si prega di controllare la connessione ad internet!'
                            });
                        })
                        .finally(function ($ionicLoading) {
                            $scope.hide($ionicLoading);
                        });

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

                    $scope.title="Annuncio aggiornato";
                    $scope.template="L'annuncio selezionato è stato aggiornato con successo!";
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                    $state.go('app.my_announcements');

                })
                .error(function (data, status) {

                    if (obj.result === '500') {
                        $scope.title="Qualcosa è andato storto";
                        $scope.template="Contattare il nostro team tecnico";
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
                    template: '<p>Caricamento...</p><ion-spinner icon="spiral"></ion-spinner>'
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


                })
                .error(function (data, status) {
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

    .controller('MyAppliedAnnouncementsCtrl', function($filter,$window,$timeout,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicTabsDelegate,$ionicActionSheet,$ionicLoading,$ionicModal,$rootScope) {

        $scope.user = UserService.getUser();

        $scope.to_update = $localStorage.info_my_app_ann;

        $scope.my_ann_bool = true;

        $scope.showMenu = function(obj) {

            obj.data_scadenza = $filter('limitTo')(obj.data_scadenza,10,0);
            obj.data_scadenza = new Date($filter('date')(obj.data_scadenza.toString(),'yyyy-MM-dd'));

            $localStorage.info_my_ann = obj;

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
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

                    if(index===0) { //code for 'Stop' function

                        var params = JSON.stringify({'id': obj.id, 'mail_student': $scope.user.mail});

                        $http({
                            method: 'POST',
                            url: 'https://arctic-window-132923.appspot.com/get_applied_announcements_byID',
                            data: params,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data, status) {

                                $scope.modal = $ionicModal.fromTemplateUrl('../www/views/modals/info_announcement.html', {
                                    scope: $scope,
                                    animation: 'slide-in-up'
                                }).then(function(modal) {
                                    modal.info_candidates = data;
                                    modal.info_announcement = obj;

                                    modal.info_announcement.data_scadenza = $filter('date')(modal.info_announcement.data_scadenza,'dd-MM-yyyy');
                                    $scope.modal = modal;

                                    $scope.modal.show();
                                });

                                $scope.close=function () {
                                    $scope.modal.hide();
                                };

                            })
                            .error(function (data, status) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Errore connessione!',
                                    template: 'Si prega di controllare la connessione ad internet!'
                                });
                            })
                            .finally(function ($ionicLoading) {
                                $scope.hide($ionicLoading);
                            });
                    }

                    return true;
                },
                destructiveButtonClicked: function(){

                    $scope.show = function () {
                        $ionicLoading.show({
                            template: '<p>Caricamento...</p><ion-spinner icon="spiral"></ion-spinner>'
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

                            var alertPopup = $ionicPopup.alert({
                                title: 'Candidatura cancellata!',
                                template: 'La candidatura è stata cancellata!'
                            });
                            alertPopup.then(function (res) {
                                $rootScope.$emit("CallParentGetInfoMyAppliedAnnouncements", {});
                            });

                        })
                        .error(function (data, status) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Errore connessione!',
                                template: 'Si prega di controllare la connessione ad internet!'
                            });
                        })
                        .finally(function ($ionicLoading) {
                            $scope.hide($ionicLoading);
                        });

                    return true;

                }
            });

        };


    })

    .controller('QuestCtrl', function($scope,$state,$ionicPopup,$http) {

        $scope.goQuest=function(cod){
            $http({
                method :'GET',
                url:'https://arctic-window-132923.appspot.com/latest_code',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj=angular.fromJson(data);

                    $scope.cod=obj.result.codice;

                    if(cod.codice===$scope.cod)
                        $state.go('app.questionario');
                    else
                    {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Codice errato!',
                            template: 'Si prega di verificare il codice d\'accesso!'
                        });
                    }

                })
                .error(function (data, status) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
                });

        };

        $scope.check=function(object){

            if($scope.codice === '' || $scope.isUnd(object)=="UNDEFINED")
                return true;
            else
                return false;
        };

        $scope.isUnd = function (thing) {
            if (typeof thing == "undefined")
                return "UNDEFINED";
            else
                return "OK";
        };

    })

    .controller('QuizCtrl', function($scope, $ionicConfig,$http,$localStorage,$state,$ionicPopup,$ionicHistory) {

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

            $state.go('app.answer');
        };


        $scope.goToLavoro=function(object){

            $localStorage.quest2=object.Q2;
            $localStorage.quest3=object.Q3;
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
            if (typeof thing == "undefined")
                return "UNDEFINED";
            else
                return "OK";
        };


        $scope.submit = function (object) {

            var params= {};
            if ($scope.radioTematica.text=='Altro')
                params= {"q1": $localStorage.quest1,"q2": $localStorage.quest2,"q3": $localStorage.quest3,"q4": $localStorage.quest4,"q5": $localStorage.quest5,"q6": $localStorage.quest6,"q7": object.txtTematica};
            else
                params= {"q1": $localStorage.quest1,"q2": $localStorage.quest2,"q3": $localStorage.quest3,"q4": $localStorage.quest4,"q5": $localStorage.quest5,"q6": $localStorage.quest6,"q7": $scope.radioTematica.text};

            $http({
                method :'POST',
                url:'https://bubbly-polygon-149222.appspot.com',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    var obj=angular.fromJson(data);
                    $localStorage.labelsLS=obj.classes.cls[0];
                    $localStorage.datiLS=obj.classes.probs[0];

                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });

                    $state.go('app.orientamento');
                })
                .error(function (data, status) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore connessione!',
                        template: 'Si prega di controllare la connessione ad internet!'
                    });
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

    .controller('RegistrationCtrl', function($scope, $ionicConfig,$http,$state,$ionicHistory,$ionicPopup,$filter) {

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
                'dn': $filter('date')(new Date($scope.reg.date), 'yyyy-MM-dd'),
                'sex': $scope.reg.sex,
                'universita_id':$scope.reg.universita,
                'phone': $scope.reg.phone,
                'indirizzo' : $scope.reg.indirizzo+';'+$scope.reg.cap.toString()+';'+$scope.reg.citta+';'+$scope.reg.prov
            });


            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/signin',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                        $scope.title="Account Creato";
                        $scope.template="Verifica la tua email per confermare la registrazione!";
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        // the user is redirected to login page after sign up
                        $state.go('auth.login', {}, {location: "replace", reload: true});

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {

                    if (data.result === '404')
                    {

                        $scope.title="Email già esistente";
                        $scope.template="Si prega di fare clic su Password dimenticata se necessario!";
                        //resettare i parametri focus email
                    }
                    else
                    {

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
            $scope.reg.date = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

            $scope.reg.date = new Date($filter('date')($scope.reg.date,'yyyy-MM-dd'));

        };

    })

    .controller('ProfileCtrl',function($scope, $state,$http,$ionicLoading,UserService,ProfileService,$localStorage,$filter,$ionicHistory,$ionicPopup) {

        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();

        $scope.profile={};
        $scope.user = UserService.getUser();


        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="spiral"></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };


        var params = JSON.stringify( {'mail': $scope.user.mail,'password':$scope.user.password} );

        $scope.show($ionicLoading);
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

                $scope.profile.data_di_nascita = $filter('limitTo')($scope.profile.data_di_nascita,10,0);
                $scope.profile.data_di_nascita = $filter('date')(new Date($scope.profile.data_di_nascita), 'yyyy-MM-dd');

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
                    $localStorage.user_profile.bio_mentore = $scope.profile.bio_mentore;
                    $localStorage.user_profile.cognome_mentore = $scope.profile.cognome_mentore;
                    $localStorage.user_profile.sesso_mentore = $scope.profile.sesso_mentore;
                    $localStorage.user_profile.mail_mentore = $scope.profile.mail_mentore;
                    $localStorage.user_profile.telefono_mentore = $scope.profile.telefono_mentore;
                }


            })
            .error(function (data, status) {

                    $scope.title="Errore";
                    $scope.template="Si è verificato un errore";


                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });


            }).finally(function ($ionicLoading) {
                $scope.hide($ionicLoading);
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

        $scope.edit = false;


        $scope.editFields = function () {
            $scope.edit = true;

        };


        $scope.ind= $localStorage.user_profile.indirizzo.split(";");

        $scope.cap=parseInt($scope.ind[1],10);


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

                $scope.title = "Qualcosa non è andato a buon fine!";
                $scope.template = "Contattare il nostro team tecnico";

                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });
            });



        $scope.doUpdateProfile = function(){

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

                    $scope.title="Profilo aggiornato";
                    $scope.template="Il tuo profilo è stato aggiornato con successo!";
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });

                    $state.go('app.profile');


                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {

                    $scope.title="Something went wrong!";
                    $scope.template="Contattare il nostro team tecnico";

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                });
        };
    })

    .controller('MentorCtrl', function($scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicModal) {



        $scope.showPopup = function() {
            $scope.data = {};

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="list"> <div class="item item-divider"> <b>{{mentor_data.cognome}} {{mentor_data.nome}}</b><div><a class="item item-text-wrap"> <div style="padding: 0px 0px 5px 0px;"> <h2 >{{mentor_data.info}}</h2><br> </div></a></div>',
                title: 'Info mentore',
                scope: $scope,
                buttons: [

                    {
                        text: '<b>Chiudi</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                        }
                    }
                ]
            });
        };

        $scope.mentor_data =

            {
                "nome":              $localStorage.user_profile.nome_mentore,
                "cognome":           $localStorage.user_profile.cognome_mentore,
                "sesso":             $localStorage.user_profile.sesso_mentore,
                "mail":              $localStorage.user_profile.mail_mentore,
                "telefono":          $localStorage.user_profile.telefono_mentore,
                "info":              $localStorage.user_profile.bio_mentore
            };



    })

    .controller('LoginCtrl', function($window, $location,$rootScope,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicLoading,$timeout,ProfileService) {


        $scope.$on('menuData', function (event) {


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
                            name: "Privacy",
                            icon: "ion-ios-locked",
                            level: 0,
                            state: 'app.inner_termini'
                        },
                        {
                            id: 11,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
                        }
                    ];
            }

            //clear the state
            if(!$scope.$$phase) {
                $scope.$apply();
            }

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

                    obj=angular.fromJson(data);

                    $ionicLoading.show({
                        template: 'Autenticazione in corso....'
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


                        $scope.Menu();


                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });


                        $scope.$emit('menuData');

                    }, 100);

                })
                .error(function (data, status) {

                    obj=angular.fromJson(data);
                    if(obj.result==='402')
                    {
                        $scope.title="Login Fallita";
                        $scope.template="Password o Utente errati!";
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
                            id: 4,
                            name: "Questionario Prometeo",
                            icon: "ion-android-clipboard",
                            level: 0,
                            state: 'app.codice'
                        },
                        {
                            id: 5,
                            name: "Quiz affinità",
                            icon: "ion-university",
                            level: 0,
                            state: 'app.hobby'
                        },
                        {
                            id: 6,
                            name: "Privacy",
                            icon: "ion-ios-locked",
                            level: 0,
                            state: 'app.inner_termini'
                        },
                        {
                            id: 7,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
                        }

                    ];
            }
        };


    })

    .controller('ForgotPasswordCtrl', function($scope,$ionicPopup, $state,$http,$ionicHistory) {
        $scope.recoverPassword = function(){

            var params = JSON.stringify( {'mail': $scope.user.email} );

            $http({
                method :'POST',
                url:'https://arctic-window-132923.appspot.com/pwresetrequest',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                .success(function (data, status) {
                    var obj=angular.fromJson(data);

                    $scope.title =  'Password dimenticata';
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

                    var alertPopup = $ionicPopup.alert({
                        title: 'Password dimenticata!',
                        template: 'Un\'email è stata inviata al tuo indirizzo email. Per reimpostare la password, segui le istruzioni riportate nell\'email'
                    });
                });

        };

        $scope.user = {};
    })

    .controller('SignupCtrl', function($rootScope,$scope, $state,$cordovaOauth,$window,$ionicLoading,UserService,$localStorage,$ionicHistory) {

        if($localStorage.loggedIn===true)
        {

            $state.go('app.profile');
        }
        else{
            $window.localStorage.clear();
            $localStorage.loggedIn=false;
        }

        $scope.$on('menuD', function (event) {

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

                        },
                        {
                            id: 12,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
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
                            name: "Privacy",
                            icon: "ion-ios-locked",
                            level: 0,
                            state: 'app.inner_termini'
                        },
                        {
                            id: 11,
                            name: "Crediti",
                            icon: "ion-ionic",
                            level: 0,
                            state: 'app.credits'
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

            $scope.$emit('menuD');

        };


        $scope.doSignUp = function() {
            $ionicLoading.show({
                template: 'Autenticazione in corso...'
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

                }
            );
        };
    })

    .controller('safeCtrl', function ($scope,$http,$ionicHistory,$ionicPopup,UserService,$localStorage,$ionicLoading,$state,$ionicModal) {


        $scope.show = function() {
            $ionicLoading.show({
                template: '<p>Caricamento...</p><ion-spinner icon="spiral"></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };
        $scope.user = UserService.getUser();
        $scope.piano=[];
        $scope.checkPs={};

        $scope.doRef=function () {

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

                    if(status === '200')
                    {

                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });

                    }

                })
                .error(function (data, status) {

                    $scope.title = "Errore connessione";
                    $scope.template = "Contattare il nostro team tecnico";


                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                })
                .finally(function ($ionicLoading) {
                    $scope.hide($ionicLoading);
                    $scope.$broadcast('scroll.refreshComplete');
                });

        };

        $scope.doRef();



        $scope.Confirm=function () {

            var params = JSON.stringify( {'mail': $scope.user.mail,'password':$scope.user.password,'id_att':$scope.radioAttivita.nome.toString()} );

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
                    $ionicHistory.clearHistory();
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });

                    // the user is redirected to login page after sign up
                    $scope.title = "Conferma inviata";
                    $scope.template = "L'attività è in attesa di conferma da parte del mentor";

                    $scope.hide($ionicLoading);
                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                    $state.go('app.profile');



                })
                .error(function (data, status) {
                    $scope.hide($ionicLoading);

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


        $scope.radioAttivita={nome:'1'};


        $scope.isThisDisabled2Attivita=function() {


            if($scope.radioAttivita.nome==1)
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



            var params = JSON.stringify( {
                'mail': $scope.user.mail,
                'password': $scope.user.password,
                'attiv_nome': $scope.attivita.nome,
                'attiv_cfu': $scope.attivita.cfu,
                'attiv_tipo': $scope.attivita.tipo

            });

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

                    if(obj.result === 200)
                    {
                        $scope.title="Attivita";
                        $scope.template="Attivita inserita corettamente!";
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });

                        $scope.close();
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {

                    if (obj.result === '404')
                    {

                        $scope.title="Attività";
                        $scope.template="Inserimento attività non riuscito!";
                        //resettare i parametri focus email
                    }
                    else
                    {

                        $scope.title="Attività";
                        $scope.template="Inserimento attività non riuscito!";
                    }


                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .finally(function () {
                    $scope.doRef();
                });

        };


    })

    .controller('AttivitaCtrl', function ($scope,$state,$stateParams, $ionicModal,$http,$ionicPopup,UserService) {

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

    .controller('SearchCtrl',function ($scope,$state) {

        $scope.view=function (category) {

            $state.go('app.view_announcement',{'category': category});

        };

    })

    .controller('ViewAnnCtrl',function ($scope,$state,$http,$ionicLoading,$window,UserService,$ionicModal,$ionicHistory,$ionicPopup,$timeout,$stateParams,$ionicActionSheet) {


        $scope.ann_cat = $stateParams.category;

        $scope.my_ann_bool = true;

        $scope.user = UserService.getUser();

        $scope.ann = {};


        var params = JSON.stringify(
            {
                'category':     $stateParams.category,
                'mail_student': $scope.user.mail
            });

        $scope.doRefresh=function(par) {

            $scope.show = function () {
                $ionicLoading.show({
                    template: '<p>Caricamento Annunci...</p><ion-spinner icon="spiral"></ion-spinner>',
                    duration: 3000
                });
            };

            $scope.hide = function () {
                $ionicLoading.hide();
            };

            if(par===1)
                $scope.show($ionicLoading);

            $http({
                method: 'POST',
                url: 'https://arctic-window-132923.appspot.com/get_announcements_by_category',
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data, status) {

                    $scope.ann = data;

                    if(typeof $scope.ann[0]==='undefined' || $scope.ann[0]===null)
                    {

                        $scope.my_empty=true;
                    }


                })
                .error(function (data, status) {

                    $scope.title = "Errore connessione";
                    $scope.template = "Contattare il nostro team tecnico";

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                }).finally(function ($ionicLoading) {
                    // Stop the ion-refresher from spinning
                    if(par===1)
                        $scope.hide($ionicLoading);

                    $scope.$broadcast('scroll.refreshComplete');

            });
        };

        $scope.doRefresh(1);


        $scope.showMenu = function(obj) {


            var menu_buttons = [];

            menu_buttons.push({text: 'Info'});
            menu_buttons.push({text: '<b>Candidati</b>'});

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                buttons: menu_buttons,

                cancelText: 'Annulla',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    //Called when one of the non-destructive buttons is clicked,
                    //with the index of the button that was clicked and the button object.
                    //Return true to close the action sheet, or false to keep it opened.

                    //code for 'Modifica' function
                    if(index===0) {

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


                                $scope.info_data = data;


                                $scope.modal = $ionicModal.fromTemplateUrl('../www/views/modals/info_announcement.html', {
                                    scope: $scope,
                                    animation: 'slide-in-up'
                                }).then(function(modal) {

                                    modal.info_candidates = data;
                                    modal.info_announcement = obj;
                                    $scope.modal = modal;
                                    $scope.modal.show();
                                });

                                $scope.close=function () {
                                    $scope.modal.hide();
                                };


                            })
                            .error(function (data, status) {

                                var alertPopup = $ionicPopup.alert({
                                    title: 'Errore connessione!',
                                    template: 'Si prega di controllare la connessione ad internet!'
                                });
                            });

                    }
                    else if (index===1){


                        $scope.show = function () {
                            $ionicLoading.show({
                                template: '<p>Inserimento candidatura...</p><ion-spinner icon="spiral"></ion-spinner>',
                                duration: 3000
                            });
                        };

                        $scope.hide = function () {
                            $ionicLoading.hide();
                        };

                            $scope.data = {};


                            var myPopup = $ionicPopup.show({

                                template: '<input type="number" ng-model="data.stima" autofocus>',
                                title: 'Stima Annuncio',
                                subTitle: 'Inserisci il numero di giorni per la risoluzione dell\' annuncio',
                                scope: $scope,
                                buttons: [
                                    { text: 'Cancella' },
                                    {
                                        text: '<b>Candidati</b>',
                                        type: 'button-positive',
                                        onTap: function(e) {
                                            if (!$scope.data.stima) {

                                                e.preventDefault();
                                            } else {

                                                var params = JSON.stringify(
                                                    {
                                                        'ann_id': obj.id,
                                                        'student_mail': $scope.user.mail,
                                                        "stima": $scope.data.stima
                                                    });

                                                $scope.show($ionicLoading);

                                                $http({
                                                    method: 'POST',
                                                    url: 'https://arctic-window-132923.appspot.com/apply_for_announcement',
                                                    data: params,
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    }
                                                })
                                                    .success(function (data, status) {

                                                        $scope.title = "Candidatura effettuata";
                                                        $scope.template = "La Candidatura è stata effettuata";

                                                        var alertPopup = $ionicPopup.alert({
                                                            title: $scope.title,
                                                            template: $scope.template
                                                        });

                                                        alertPopup.then(function(res) {
                                                            // $window.location.reload(true);
                                                            $scope.doRefresh(1);
                                                        });


                                                    })
                                                    .error(function (data, status) {

                                                        $scope.title = "Errore nell'inserimento dell'annuncio.";
                                                        $scope.template = "Candidatura già esistente per l\'annuncio selezionato";

                                                        var alertPopup = $ionicPopup.alert({
                                                            title: $scope.title,
                                                            template: $scope.template
                                                        });

                                                    }).finally(function ($ionicLoading) {
                                                        $scope.hide($ionicLoading);

                                                });

                                            }
                                        }
                                    }
                                ]
                            });

                            myPopup.then(function(res) {

                            });

                    }



                    return true;
                }
            });

        };


    })

    .controller('NoteCtrl', function ($scope,$http,$ionicLoading,NoteService,$ionicModal,$ionicHistory,$ionicPopup,$stateParams) {

        $scope.search = {};

        var paramsToPost  = $stateParams.attivitaId;

        $scope.doRefresh = function() {

            $ionicLoading.show({
                template: '<p>Caricamento note...</p><ion-spinner icon="spiral"></ion-spinner>'

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

                    $scope.empty_note = false;
                    $scope.note=data;
                    $ionicLoading.hide();

                    if (data.length===0)
                    {
                        $scope.empty_note=true;
                    }

                })
                .error(function (data, status) {
                    $ionicLoading.hide();

                    var alertPopup = $ionicPopup.alert({
                        title: 'Errore!',
                        template: 'Non è possibile caericare le note !'
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



            var params = JSON.stringify( {
                "id_att":paramsToPost,
                "titolo_nota":$scope.nota.titolo,
                "note":$scope.nota.testo

            });

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


                    if(obj.result === 200)
                    {
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


                    if (obj.result === '404')
                    {

                        $scope.title="Nota";
                        $scope.template="Inserimento Nota non riuscito!";
                        //resettare i parametri focus email
                    }
                    else
                    {
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

    .controller('InsertAnnouncementCtrl', function($filter,$scope, $state, $http,$ionicPopup,$ionicHistory,UserService,$localStorage,$ionicLoading) {


        $scope.current_date = $filter('date')(new Date(), 'yyyy-MM-dd');

        $scope.proj = {};

        $scope.proj.category = '---Seleziona Categoria---';

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


                    $scope.title = "Annuncio Inserito";
                    $scope.template = "Traccia i tuo annunci nella sezione: 'I miei Annunci'";

                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    $state.go('app.my_announcements');
                })
                .error(function (data, status) {

                    if (data.result=='406'){
                        $scope.title = "Errore Inserimento Data scadenza";
                        $scope.template = "La data di scadenza non può essere minore di quella di scadenza";
                    }
                    else {
                        $scope.title = "Errore connessione";
                        $scope.template = "Contattare il nostro team tecnico";

                    }

                }).finally(function ($ionicLoading) {
                    $scope.hide($ionicLoading);

                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });
            });
        };

    })

    .controller('CreditsCtrl', function($filter,$scope,$cordovaInAppBrowser) {

        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'yes'
        };

        $scope.openBrowser = function(link) {
            $cordovaInAppBrowser.open(link, '_blank', options)

                .then(function(event) {

                })

                .catch(function(event) {

                });
        };

    })

    .controller('MapCtrl', function($scope,$state,$http,$ionicPopup,$ionicLoading) {


        $scope.show = function () {
            $ionicLoading.show({
                templateUrl: 'views/app/load.html',
                showBackdrop: false,
                duration:   5000

            });

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

                var options = {timeout: 10000, enableHighAccuracy: true};

                $scope.initialise = function() {

                    // Center of Italy
                    var latLng = new google.maps.LatLng(42.988358, 12.623107);

                    var mapOptions = {
                        center: latLng,
                        zoom: 5,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };


                    var map = new google.maps.Map(document.getElementById("map"), mapOptions);


                    $scope.map = map;

                    $scope.markers = [];

                    var infoWindow = new google.maps.InfoWindow();

                    var createMarker = function (info){

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

                            if (info.link_sito != '-'){

                                marker.content += '<p><b>Sito web: </b><a target="_self"  href="#" onclick="window.open(\'' + info.link_sito +'\', \'_system\', \'location=yes\'); return false;" >' + info.link_sito + '</a> </p>';
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

                $scope.title = "Qualcosa non è andato a buon fine!";
                $scope.template = "Contattare il nostro team tecnico";

                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });
            })
            .finally(function ($ionicLoading) {
                //$scope.hide($ionicLoading);
            });


    })

    .controller('FeedsCategoriesCtrl', function($scope, $http,$ionicNavBarDelegate) {
        $scope.feeds_categories = [];


        $http.get('news.json').success(function(response) {
            $scope.feeds_categories = response;
        });
    })
;