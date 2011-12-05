//
//  JSBridgeAppDelegate.h
//  JSBridge
//
//  Created by Dante Torres on 10-09-03.
//  Copyright Dante Torres 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

@class JSBridgeViewController;

#define mainAppDelegate ((JSBridgeAppDelegate *)[UIApplication sharedApplication].delegate)

@interface JSBridgeAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    JSBridgeViewController *viewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet JSBridgeViewController *viewController;

@end

