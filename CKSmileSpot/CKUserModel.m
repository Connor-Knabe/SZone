//
//  CKUserModel.m
//  CKSmileZone
//
//  Created by Administrator on 7/16/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import "CKUserModel.h"

@interface CKUserModel()

@property (nonatomic) NSArray *userArray;

@end


@implementation CKUserModel

-(instancetype)init{
    self = [super init];
    if (self) {
        
    }
    return self;
}

-(NSArray*)fillArray{
    
    self.userArray = [[NSArray alloc]init];
    
    self.userArray = @[@"Connor", @"Brian", @"Kevin", @"Fillipe", @"Josh", @"Marty"];
    
    
    return self.userArray;
}



@end
