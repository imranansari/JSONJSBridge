//
//  JSBridgeViewController.h
//  JSBridge
//
//  Created by Dante Torres on 10-09-03.
//  Copyright Dante Torres 2010. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JSBridgeWebView.h"
#import "ImageViewerController.h"

@interface JSBridgeViewController : UIViewController <JSBridgeWebViewDelegate> {

	JSBridgeWebView* webView;
	
	ImageViewerController* imageViewerController;
}

-(void) loadMaskPage;

@end

