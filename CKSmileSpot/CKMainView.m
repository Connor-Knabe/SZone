//
//  CKMainView.m
//  CKSmileSpot
//
//  Created by Administrator on 7/12/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import "CKMainView.h"
#import "Masonry.h"

@interface CKMainView()

@property (nonatomic) UIView* box;
@property (nonatomic) UIView* header1;
@property (nonatomic) UILabel* welcome;
@property (nonatomic) CGRect viewRect;

@end

@implementation CKMainView

- (id)init{
    self = [super init];
    if (self) {
        
        self.welcome = [[UILabel alloc]init];

        [self addSubviews];
        [self makeLabels];
        
        [self addMasonry];
        
        
    }
    return self;
}
-(void)addMasonry{
    
    
    
    
    [self.welcome setText:@"Welcome:"];
    
    [self.welcome mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.mas_top);
        make.height.equalTo(@30);
        make.centerX.equalTo(self.mas_centerX);

    }];
    
}


-(void)makeLabels{


    

}

-(void)addSubviews{
    
    [self addSubview:self.welcome];

}


@end
