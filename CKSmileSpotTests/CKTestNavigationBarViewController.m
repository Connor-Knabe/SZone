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
    
//    self.mockViewController = mock(@protocol(CKViewControllerDelegate));

//    id<CKViewControllerDelegate> mock = mock(@protocol(CKViewControllerDelegate));

    self.mock = mock(@protocol(CKViewControllerDelegate));

    self.testObject = [[CKNavigationBarViewController alloc]init];
 
    [self.testObject setRvcDelegate:self.mock];
    
//    self.testObject.rvcDelegate = self.mock;
    
}

- (void)testThatNavigationBarControllerButtonCallsShowSettingsFromViewController {
    
    
//    id<CKViewControllerDelegate> mock = mock(@protocol(CKViewControllerDelegate));

    
    [self.testObject openSettings];
    verifyCalled([self.mock showSettings]);

}

@end
