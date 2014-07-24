#import <UIKit/UIKit.h>
#import "CKViewController.h"

@interface CKNavigationBarView : UINavigationController

@property(nonatomic, weak) id <CKViewControllerDelegate> rvcDelegate;
@property (nonatomic) UIView* navBar;


@end
