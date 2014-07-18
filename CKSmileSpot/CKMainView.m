//
//  CKMainView.m
//  CKSmileSpot
//
//  Created by Administrator on 7/12/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import "CKMainView.h"

@interface CKMainView()

@property (nonatomic) UIView* box;
@property (nonatomic) UILabel* welcome;

@end

@implementation CKMainView

- (id)init
{
    self = [super init];
    if (self) {
        
        CGRect viewRect = CGRectMake(100, 100, 100, 100);

        self.box = [[UIView alloc]initWithFrame:viewRect];

        [self.box setBackgroundColor:[UIColor greenColor]];
        
        [self makeLabels];
        [self addSubviews];
    }
    return self;
}


-(void)makeLabels{
    self.welcome = [[UILabel alloc]initWithFrame:CGRectMake(40, 40, 40, 40)];
    
    
    
    
    
}

-(void)addSubviews{
    
    [self addSubview:self.welcome];
    [self addSubview:self.box];

}


@end
