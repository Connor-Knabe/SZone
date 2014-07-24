//
//  CKSmileSpotTests.m
//  CKSmileSpotTests
//
//  Created by Administrator on 7/12/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "CKUserModel.h"

#import <stubble/Stubble.h>
@interface CKSmileSpotTests : XCTestCase

@property (nonatomic) CKUserModel* userModel;
@property (nonatomic) NSArray* userArray;

@end

@implementation CKSmileSpotTests

-(void)setUp{
    [super setUp];
    self.userModel = [[CKUserModel alloc]init];
    

    //self.userArray = [self.userModel fillArray];

}

-(void)tearDown{
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}


-(void)testThatUsernameCanBeAddedToArray{
    XCTAssertNotNil(self.userArray);
}



@end
