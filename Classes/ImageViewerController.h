//
//  ImageViewerController.h
//  JSBridge
//
//  Created by Dante Torres on 10-09-09.
//  Copyright Dante Torres 2010. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface ImageViewerController : UIViewController {

	IBOutlet UIImageView* imageView;
	
	UIImage* mask;
	UIImage* pic;
}

-(IBAction) doBack;

- (UIImage*) maskImage:(UIImage *)image withMask:(UIImage *)maskImage;

@property (retain) UIImage* mask;
@property (retain) UIImage* pic;

@end
