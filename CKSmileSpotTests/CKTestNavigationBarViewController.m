#import <XCTest/XCTest.h>
#import "CKNavigationBarViewController.h"
#import "CKViewController.h"
#import <stubble/Stubble.h>


@interface CKTestNavigationBarViewController : XCTestCase

@property (nonatomic) CKViewController *mockViewController;
@property (nonatomic) CKNavigationBarViewController *testObject;
@property (nonatomic) id<CKViewControllerDelegate> mock;

@end

@implementation CKTestNavigationBarViewController

- (void)setUp {
    [super setUp];
    
    self.mock = mock(@protocol(CKViewControllerDelegate));

    self.testObject = [[CKNavigationBarViewController alloc]init];
 
    [self.testObject setRvcDelegate:self.mock];
    
    
}

- (void)testThatNavigationBarControllerButtonCallsShowSettingsFromViewController {
    
    [self.testObject openSettings];
    verifyCalled([self.mock showSettings]);

}

@end
