#import <UIKit/UIKit.h>
#import "CKViewController.h"

@interface CKNavigationBarViewController : UINavigationController

@property(nonatomic, weak) id <CKViewControllerDelegate> rvcDelegate;

@property (nonatomic) UIView* navBar;

@end
