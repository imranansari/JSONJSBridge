//
//  ImageViewerController.m
//  JSBridge
//
//  Created by Dante Torres on 10-09-09.
//  Copyright Dante Torres 2010. All rights reserved.
//

#import "ImageViewerController.h"

#import "JSBridgeAppDelegate.h"


@implementation ImageViewerController

@synthesize mask, pic;


-(void) viewWillAppear:(BOOL)animated
{
	imageView.image = [self maskImage:pic withMask:mask];
}

-(IBAction) doBack
{
	[(mainAppDelegate.viewController) loadMaskPage];
	[self.view removeFromSuperview];
}

- (UIImage*) maskImage:(UIImage *)image withMask:(UIImage *)maskImage {
	
	CGImageRef maskRef = maskImage.CGImage; 
	
	CGImageRef actualMask = CGImageMaskCreate(CGImageGetWidth(maskRef),
										CGImageGetHeight(maskRef),
										CGImageGetBitsPerComponent(maskRef),
										CGImageGetBitsPerPixel(maskRef),
										CGImageGetBytesPerRow(maskRef),
										CGImageGetDataProvider(maskRef), NULL, false);
	
	CGImageRef masked = CGImageCreateWithMask([image CGImage], actualMask);
	return [UIImage imageWithCGImage:masked];
	
}


- (void)dealloc {
    [super dealloc];
}


@end
