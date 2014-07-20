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

- (id)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if (self) {
        
        self.welcome = [[UILabel alloc]init];
        self.box = [[UIView alloc]init];
        self.header1 = [[UIView alloc]init];

        
        self.viewRect = CGRectMake(100, 100, 100, 100);

        [self addSubviews];
        [self makeLabels];

    }
    return self;
}


-(void)makeLabels{

    [self.box setBackgroundColor:[UIColor greenColor]];
    [self.header1 setBackgroundColor:[UIColor blackColor]];

    [self.box mas_makeConstraints:^(MASConstraintMaker *make) {
        make.height.equalTo(@100);
        make.width.equalTo(@100);
    }];
    
    
    [self.header1 mas_makeConstraints:^(MASConstraintMaker *make) {
        make.height.equalTo(@300);
        make.width.equalTo(@200);
        make.top.equalTo(self.box.mas_bottom);
    }];
    
    //[self.box setBackgroundColor:[UIColor blackColor]];
    
    [self.welcome setText:@"Welcome:"];

    

}

-(void)addSubviews{
    
    [self addSubview:self.welcome];
    [self addSubview:self.box];
    [self addSubview:self.header1];

}


@end
