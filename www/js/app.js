// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});





// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
  'ionic',
  'ionic-sidemenu',
  'angularMoment',
  'your_app_name.controllers',
  'your_app_name.directives',
  'your_app_name.filters',
  'your_app_name.services',
  'your_app_name.factories',
  'your_app_name.config',
  'your_app_name.views',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCordova',
  'slugifier',
  'ionic.contrib.ui.tinderCards',
  'youtube-embed',
  'ngCordovaOauth',
    'ui.router'
])

.run(function($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $timeout, $ionicPopup) {

  $ionicPlatform.on("deviceready", function(){

      //Test connection
      if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
              $ionicPopup.confirm({
                  title: "Internet disconnesso",
                  content: "Controlla la connessione a Internet sul tuo dispositivo."
              })
                  .then(function(result) {
                      if(!result) {
                          ionic.Platform.exitApp();
                      }
                  });
          }
      }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PushNotificationsService.register();
  });

  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function(){
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      	console.log("setting transition to android and disabling swipe back");
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('app.feeds-categories') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
    }
  });

  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });

})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('walkthrough', {
    url: '/walkthrough',
    templateUrl: "views/walkthrough.html",
    controller: 'SignupCtrl'
  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })

  .state('auth.signup', {
    url: '/signup',
    templateUrl: "views/auth/signup.html",
    controller: 'SignupCtrl'
  })

  .state('auth.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/auth/forgot-password.html",
    controller: 'ForgotPasswordCtrl'
  })

  .state('auth.form-reg', {
    url: "/form-reg",
    templateUrl: "views/auth/form-reg.html",
    controller: 'RegistrationCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
      cache: false,
    templateUrl: "views/app/side-menu.html",
    controller: 'SideMenuCtrl'
  })

  //MISCELLANEOUS
  .state('app.miscellaneous', {
    url: "/miscellaneous",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/miscellaneous.html"
      }
    }
  })

  .state('app.image-picker', {
    url: "/miscellaneous/image-picker",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/image-picker.html",
        controller: 'ImagePickerCtrl'
      }
    }
  })

  //LAYOUTS
  .state('app.layouts', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/layouts.html"
      }
    }
  })

  .state('app.tinder-cards', {
    url: "/layouts/tinder-cards",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/tinder-cards.html",
        controller: 'TinderCardsCtrl'
      }
    }
  })

  .state('app.slider', {
    url: "/layouts/slider",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/slider.html"
      }
    }
  })

  //FEEDS
  .state('app.feeds-categories', {
    url: "/feeds-categories",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feeds-categories.html",
        controller: 'FeedsCategoriesCtrl'
      }
    }
  })

  .state('app.category-feeds', {
    url: "/category-feeds/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/category-feeds.html",
        controller: 'CategoryFeedsCtrl'
      }
    }
  })

  .state('app.feed-entries', {
    url: "/feed-entries/:categoryId/:sourceId",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feed-entries.html",
        controller: 'FeedEntriesCtrl'
      }
    }
  })

  //WORDPRESS
  .state('app.wordpress', {
    url: "/wordpress",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress.html",
        controller: 'WordpressCtrl'
      }
    }
  })

  .state('app.post', {
    url: "/wordpress/:postId",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress_post.html",
        controller: 'WordpressPostCtrl'
      }
    },
    resolve: {
      post_data: function(PostService, $ionicLoading, $stateParams) {
        $ionicLoading.show({
      		template: 'Loading post ...'
      	});

        var postId = $stateParams.postId;
        return PostService.getPost(postId);
      }
    }
  })

  //OTHERS
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "views/app/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })

      .state('app.questionario', {
          url: "/questionario",
          views: {
              'menuContent': {
                  templateUrl: "views/app/questionario.html",
                  controller: 'QuizCtrl'

              }
          }
      })

      .state('app.codice', {
          url: "/codice",
          views: {
              'menuContent': {
                  templateUrl: "views/app/codice.html",
                  controller: 'QuestCtrl'
              }
          }
      })

      .state('app.hobby', {
          url: "/hobby",
          views: {
              'menuContent': {
                  templateUrl: "views/app/hobby.html",
                  controller: 'QuizCtrl'
              }
          }
      })

      .state('app.answer', {
          url: "/answer",
          views: {
              'menuContent': {
                  templateUrl: "views/app/answer.html",
                  controller: 'QuizCtrl'
              }
          }
      })

      .state('app.lavoro', {
          url: "/lavoro",
          views: {
              'menuContent': {
                  templateUrl: "views/app/lavoro.html",
                  controller: 'QuizCtrl'
              }
          }
      })

      .state('app.competenze', {
          url: "/competenze",
          views: {
              'menuContent': {
                  templateUrl: "views/app/competenze.html",
                  controller: 'QuizCtrl'
              }
          }
      })

      .state('app.materie', {
          url: "/materie",
          views: {
              'menuContent': {
                  templateUrl: "views/app/materie.html",
                  controller: 'QuizCtrl'
              }
          }
      })


      .state('app.student', {
          url: "/student",
          views: {
              'menuContent': {
                  templateUrl: "views/app/student.html",
                  controller: ''
              }
          }
      })      

      .state('app.libreria', {
          url: "/libreria",
          views: {
              'menuContent': {
                  templateUrl: "views/app/libreria.html",
                  controller: 'QuizCtrl'
              }
          }
      })

      .state('app.orientamento', {
          url: "/orientamento",
          views: {
              'menuContent': {
                  templateUrl: "views/app/orientamento.html",
                  controller: 'QuizCtrl'
              }
          }
      })

  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "views/app/forms.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
      cache: false,
    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html",
          controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "views/app/bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    }
  })

   .state('app.post_announcement', {
       url: "/post_announcement",
       views: {
           'menuContent': {
               templateUrl: "views/app/shs/post_announcement.html",
               controller: 'InsertAnnouncementCtrl'
           }
       }
   })

      .state('app.my_announcements', {
          url: "/my_announcements",
          cache: false,
          views: {
              'menuContent': {
                  templateUrl: "views/app/shs/my_announcements.html",
                  controller: 'AnnouncementsCtrl'
              }
          }
      })

      .state('app.search_announcement', {
          url: "/search_announcement",
          views: {
              'menuContent': {
                  templateUrl: "views/app/shs/search_announcement.html",
                  controller: ''
              }
          }
      })


      .state('app.update_announcement', {
          url: "/update_announcement",
          views: {
              'menuContent': {
                  templateUrl: "views/app/shs/update_announcement.html",
                  controller: 'MyAnnouncementsCtrl'
              }
          }
      })


      .state('app.map', {
          url: '/map',
          views: {
              'menuContent': {
                  templateUrl: 'views/app/map.html',
                  controller: 'MapCtrl'
              }
          },
          parent:""
      })


      .state('app.prometeo', {
          url: '/prometeo',
          views: {
              'menuContent': {
                  templateUrl: 'views/app/prometeo.html',
                  controller: 'PrometeoCtrl'
              }
          },
          parent:""
      })
      .state('app.piano-studi', {
          url: '/piano-studi',
          cache: false,
          views: {
              'menuContent': {
                  templateUrl: "views/app/piano-studi.html",
                  controller: 'safeCtrl'
              }
          }

      })


      .state('app.update_profile', {
          url: '/update_profile',
          views: {
              'menuContent': {
                  templateUrl: 'views/app/update_profile.html',
                  controller: 'UpdateProfileCtrl'
              }
          }
      })


      .state('app.mentor', {
          url: '/mentor',
          views: {
              'menuContent': {
                  templateUrl: 'views/app/mentor.html',
                  controller: 'MentorCtrl'
              }
          }
      })


        .state('app.my_announcements.page1', {
            url: "/page1",
            views: {
                'menuContent': {
                    templateUrl: "templates.about-page1.html"
                }
            },
            parent:"app.my_announcements"
        })

        .state('app.my_announcements.page2', {
            url: "/page2",
            views: {
                'menuContent': {
                    templateUrl: "templates.about-page2.html"
                }
            },
            parent:"app.my_announcements"
        })


      // .state('app.maps', {
      //     url: "/miscellaneous/maps",
      //     views: {
      //         'menuContent': {
      //             templateUrl: "views/app/miscellaneous/maps.html",
      //             controller: 'MapsCtrl'
      //         }
      //     }
      // })


;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/walkthrough');
});
