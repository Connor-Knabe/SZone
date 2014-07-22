#import <UIKit/UIKit.h>

@protocol CKViewControllerDelegate <NSObject>

- (void) showSettings;

@end


@interface CKViewController : UIViewController <CKViewControllerDelegate>

@end
