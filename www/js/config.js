angular.module('your_app_name.config', [])
    .config( [
        '$compileProvider',
        function( $compileProvider )
        {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|sms|tel|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        }
    ])
    .constant('WORDPRESS_API_URL', 'http://wordpress.startapplabs.com/blog/api/')
    .constant('GCM_SENDER_ID', '574597432927')

;