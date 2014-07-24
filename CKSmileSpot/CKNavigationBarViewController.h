#import <UIKit/UIKit.h>
#import "CKViewController.h"

@interface CKNavigationBarViewController : UINavigationController

@property(nonatomic, weak) id <CKViewControllerDelegate> rvcDelegate;

@property (nonatomic) UIView* navBar;

- (void)openSettings; /* remove this . just here for testing until better solution found */

@end
