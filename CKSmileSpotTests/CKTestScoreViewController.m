#import <XCTest/XCTest.h>
#import "CKViewController.h"
#import "CKScoreViewController.h"
#import <stubble/Stubble.h>

@interface CKTestScoreViewController : XCTestCase

@property (nonatomic) CKViewController* mockViewController;
@property (nonatomic) CKScoreViewController* testObject;

@end


@implementation CKTestScoreViewController

- (void)setUp {
    [super setUp];
    
    self.mockViewController = mock([CKViewController class]);
    self.testObject = [[CKScoreViewController alloc]init];
    
}

- (void)testThatScoreViewControllerUpdatesScoreWhenButtonPressed{
    
    
}


@end
