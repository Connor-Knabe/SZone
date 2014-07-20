//
//  CKViewController.m
//  CKSmileSpot
//
//  Created by Administrator on 7/12/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import "CKViewController.h"
#import "CKMainView.h"
#import "CKTopNavigationBarView.h"
#import "Masonry.h"

@interface CKViewController ()

@property (nonatomic) CKMainView * mainView;
@property (nonatomic) UIView *mainWindow;
@property (nonatomic) CKTopNavigationBarView *topNavBar;

@end

@implementation CKViewController
- (id)init
{
    self = [super init];
    if (self) {


        
    }
    return self;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    
    //[self.view setBackgroundColor:[UIColor redColor]];
    
    self.topNavBar = [[CKTopNavigationBarView alloc]initWithFrame:self.view.bounds];
    self.mainView = [[CKMainView alloc]initWithFrame:self.view.bounds];
    
    
    [self addSubviews];
    [self addMasonry];

    
}


-(void)addMasonry{
    
    [self.mainView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.topNavBar.mas_bottom);
        make.height.equalTo(@100);
        make.left.equalTo(self.view.mas_left);
        make.width.equalTo(self.view.mas_width);
    }];
    
    [self.mainView setBackgroundColor:[UIColor blueColor]];
    
}


-(void)addSubviews{
    
    [self.view addSubview:self.topNavBar];
    [self.view addSubview:self.mainView];
    
}




- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
