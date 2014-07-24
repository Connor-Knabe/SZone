#import <XCTest/XCTest.h>
#import "CKNavigationBarViewController.h"
#import "CKViewController.h"
#import <stubble/Stubble.h>


@interface CKTestNavigationBarViewController : XCTestCase

@property (nonatomic) CKViewController *mockViewController;
@property (nonatomic) CKNavigationBarViewController *testObject;

@end

@implementation CKTestNavigationBarViewController

- (void)setUp{
    [super setUp];
    
    self.mockViewController = mock([CKViewController class]);
    self.testObject = [[CKNavigationBarViewController alloc]init];
    
}

@end
