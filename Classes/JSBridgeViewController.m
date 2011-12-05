//
//  JSBridgeViewController.m
//  JSBridge
//
//  Created by Dante Torres on 10-09-03.
//  Copyright Dante Torres 2010. All rights reserved.
//

#import "JSBridgeViewController.h"

#import "JSBridgeAppDelegate.h"

#import "JSBridgeWebView.h"

#import "SBJson.h"

@implementation JSBridgeViewController


// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
        // Custom initialization

    }
    return self;
}


// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
	imageViewerController = [[ImageViewerController alloc] initWithNibName:@"ImageViewerController" bundle:nil];
	
	NSLog(@"View Did Load!");
	
		
	webView = [[JSBridgeWebView alloc] initWithFrame:CGRectMake(0, 0, 320, 480)];
	webView.delegate = self;
	
	[self loadMaskPage];
}

-(void) loadMaskPage
{	
	//NSURL* url = [[NSBundle mainBundle] URLForResource:@"masks" withExtension:@"html"];
    //[webView loadRequest:[NSURLRequest requestWithURL:@"http://www.google.com"]];
    
    NSString *urlAddress = @"http://localhost:4567/form";
    NSURL *url = [NSURL URLWithString:urlAddress];
    NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
    [webView loadRequest:requestObj];
    
}

- (void) viewWillAppear:(BOOL)animated
{
	[self.view addSubview:webView];
}

- (BOOL)webView:(UIWebView *)p_WebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
	NSLog(@"Should page load?. %@", [request URL]);
	return TRUE;
}

- (void)webViewDidFinishLoad:(UIWebView *)p_WebView
{
	NSLog(@"Page did finish load. %@", [[p_WebView request] URL]);
}

- (void)webViewDidStartLoad:(UIWebView *)p_WebView
{
	NSLog(@"Page did start load. %@", [[p_WebView request] URL]);
}

- (void)webView:(UIWebView *)p_WebView didFailLoadWithError:(NSError *)error
{
	NSLog(@"Page did fail with error. %@", [[p_WebView request] URL]);
}

- (void)webView:(UIWebView*) webview didReceiveJSNotificationWithDictionary:(NSString*) jsonString
{
    //describeDictionary(dictionary);

	
        
         //NSLog(@"message: %@", "message", [dictionary objectForKey:"message"]);
               
    UIAlertView *alert =  [[UIAlertView alloc] initWithTitle:@"JSON passed from WebView" 
                                                        message: jsonString 
                                                       delegate:nil 
                                              cancelButtonTitle:@"OK"
                                              otherButtonTitles:nil];
     
    //[alert show];
    [alert release];
    
    
    //SBJsonParser* jsonParser = [[[SBJsonParser alloc] init] autorelease]; 
    
    //NSDictionary* jsonDic = [jsonParser objectWithString:myJsonStr];
    
    
    
    NSRange openBracket = [jsonString rangeOfString:@"value\":"];
    int loc1 = openBracket.location + 7;
    NSRange closeBracket = [jsonString rangeOfString:@"}"];
    NSRange numberRange = NSMakeRange(loc1, closeBracket.location - loc1 + 1);
    NSString *jsonObj = [jsonString substringWithRange:numberRange];
    NSLog(@"val = %@", jsonObj);
    
    SBJsonParser *jsonParser = [[SBJsonParser alloc] init];
    NSDictionary* jsonDic = [jsonParser objectWithString:jsonObj];
    NSLog ( @"firstName = %@", [jsonDic objectForKey: @"firstName"]);
    
    
    //NSError *error = nil;
    //NSArray *jsonObjects = [jsonParser objectWithString:jsonString error:&error];
    //[jsonParser release], jsonParser = nil;
    
    //NSDictionary* jsonDic = [jsonObj objectWithString:jsonStr];
    //NSDictionary* dicTranslated = [self translateDictionary:jsonDic];
    
    
}

- (void)dealloc {
	
	[imageViewerController release];
	
    [super dealloc];
}

@end
