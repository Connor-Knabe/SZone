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

        [self addSubviews];
        [self makeLabels];
        
        [self addMasonry];
        
        [self setBackgroundColor:[UIColor blackColor]];

    }
    return self;
}
-(void)addMasonry{
    
    
    
    [self.welcome setText:@"Welcome:"];
    
    [self.welcome mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.mas_top);
        make.height.equalTo(@30);
        make.width.equalTo(self.mas_width);
        make.leading.equalTo(self.mas_left);
    }];
    
}


-(void)makeLabels{


    

}

-(void)addSubviews{
    
    [self addSubview:self.welcome];

}


@end
