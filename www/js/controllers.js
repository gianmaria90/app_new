angular.module('your_app_name.controllers', ["ngStorage",'chart.js'])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})


.controller('SideMenuCtrl', function($scope) {
  $scope.theme = 'ionic-sidemenu-dark';
  $scope.tree =
    [
    // {
    //   id: 1,
    //   name: "Saved for later",
    //   icon: "ion-bookmark",
    //   level: 0,
    //   state: 'app.bookmarks'
    // },
    {
      id: 2,
      name: "News",
      icon: "ion-social-rss",
      level: 0,
      state: 'app.feeds-categories'
    },
    // {
    //   id: 3,
    //   name: "Wordpress",
    //   icon: "ion-social-wordpress",
    //   level: 0,
    //   state: 'app.wordpress'
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
      icon: "ion-ios-list",
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
      icon: "icon ion-bookmark",
      items: [{
        id: 101,
        level: 1,
        name: 'Inserisci annuncio',
        icon: "ion-compose",
        state: 'app.post_announcement'
        },{
        id: 102,
        level: 1,
        name: 'I miei annunci',
        icon: "ion-ios-book",
        state: 'app.my_announcements'
        },{
        id: 103,
        level: 1,
        name: 'Ricerca annuncio',
        icon: "ion-ios-search-strong",
        state: 'app.search_announcement'
        }]
    }
    ];
})


// APP
.controller('AppCtrl', function($scope, $ionicConfig,userService) {

    $scope.user=userService;

})

    .controller('QuestCtrl', function($scope,$state,$ionicPopup,$http) {

        $scope.goQuest=function(){
            console.log($scope.user.password);
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
                    console.log($scope.user.password + " scope");
                    //console.log($scope.uuu.codice + " object");
                    if($scope.user.password===$scope.cod)
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
                        template: 'Si prega di la connessione ad internet!'
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

    .controller('QuizCtrl', function($scope, $ionicConfig,$http,$localStorage,$state,$ionicPopup) {

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
                'phone': $scope.reg.phone
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
                    else if (obj.result === '404')
                    {
                        console.log("Email already exist.");
                        $scope.title="Email già esistente";
                        $scope.template="Si prega di fare clic su Password dimenticata se necessario";
                        //resettare i parametri focus email
                    }
                    else
                    {
                        console.log("Registrazione fallita.");
                        $scope.title="Errore";
                        $scope.template="Registrazione fallita";
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });
                })
                .error(function (data, status) {
                    console.log("Error storing device token." + data + " " + status);
                    $scope.title="Registrazione fallita";
                    $scope.template="Contattare il nostro team tecnico";

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




//LOGIN
    .controller('LoginCtrl', function($scope, $state, $http,$ionicPopup,$ionicHistory) {

        $scope.doLogIn = function(){

            var params = JSON.stringify( {'mail': $scope.user.email,'password': $scope.user.password} );

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
                    var obj=angular.fromJson(data);
                    console.log(obj.result);
                    if(obj.result=== '200')
                    {
                        console.log("Correct login.");
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $state.go('app.feeds-categories');
                    }
                })
                .error(function (data, status) {
                    console.log("Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login fallita!',
                        template: 'Si prega di verificare le credenziali!'
                    });
                });

        };

        $scope.user = {};

        //$scope.user.email = "kekko.battistone@gmail.com";


        // We need this for the form validation
        $scope.selected_tab = "";

        $scope.$on('my-tabs-changed', function (event, data) {
            $scope.selected_tab = data.title;
        });

    })



.controller('SignupCtrl', function($scope, $state,$cordovaOauth,$ionicLoading,UserService,$window) {

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
                    console.log(obj.result);
                    if(obj.result=== '200')
                    {
                        console.log("Correct retrieve password.");


                        $scope.title =  'Password dimenticata';
                        $scope.template = 'Un\'email è stata inviata al tuo indirizzo email. Per reimpostare la password, segui le istruzioni riportate nell\'email';


                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $state.go('auth.login');
                    }
                    else if(obj.result==='404')
                    {
                        $scope.title = 'Password dimenticata';
                        $scope.template = 'Un\'email è stata inviata al tuo indirizzo email. Per reimpostare la password, segui le istruzioni riportate nell\'email';
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.template
                    });

                })
                .error(function (data, status) {
                    console.log("Error storing device token." + data + " " + status);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login fallita!',
                        template: 'Si prega di verificare le credenziali!'
                    });
                });

        };

        $scope.user = {};
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

.controller('MapsCtrl', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.center_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.G,lng: pos.K};
			$scope.my_location = pos.G+", "+pos.K;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
})

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

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
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
				$state.go('auth.walkthrough');
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
