//
//  CKUserModel.m
//  CKSmileZone
//
//  Created by Administrator on 7/16/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import "CKUserModel.h"

@interface CKUserModel()


@end


@implementation CKUserModel

-(instancetype)init{
    self = [super init];
    if (self) {
        
        self.userArray = [[NSArray alloc]init];
        
        self.userArray = @[@"Connor", @"Brian", @"Kevin", @"Fillipe", @"Josh", @"Marty"];

        
    }
    return self;
}




@end
