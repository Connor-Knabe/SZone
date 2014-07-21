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
@property (nonatomic) UILabel *welcomeLabel;

@property (nonatomic) UIView *box;

@end

@implementation CKViewController
- (id)init
{
    self = [super init];
    if (self) {
        self.topNavBar = [[CKTopNavigationBarView alloc]initWithFrame:self.view.bounds];
        self.mainView = [[CKMainView alloc]initWithFrame:self.view.bounds];
        self.welcomeLabel = [[UILabel alloc]init];
        self.box = [[UIView alloc]init];


    }
    return self;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    
    

    
}


-(void)viewWillLayoutSubviews{
    //[self.view setBackgroundColor:[UIColor redColor]];
    
    [self.welcomeLabel setTextColor:[UIColor redColor]];
    
    [self addSubviews];
    [self addMasonry];
    
}


-(void)addMasonry{
    
    
    
    [self.mainView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.height.equalTo(@100);
        make.top.equalTo(self.view.mas_top);
        make.centerX.equalTo(self.view.mas_centerX);
        make.width.equalTo(self.view.mas_width);
    }];
   
    [self.mainView setBackgroundColor:[UIColor grayColor]];
    
    [self.welcomeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerY.equalTo(self.view.mas_centerY);
        make.centerX.equalTo(self.view.mas_centerX);
        make.height.equalTo(@100);
        make.width.equalTo(@100);
    }];
    
    
    [self.box mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.welcomeLabel.mas_bottom);
        make.height.equalTo(@100);
        make.width.equalTo(self.welcomeLabel.mas_width);
        make.centerX.equalTo(self.welcomeLabel.mas_centerX);
    }];
    
    [self.box setBackgroundColor:[UIColor blueColor]];

    
    
    [self.welcomeLabel setBackgroundColor:[UIColor blackColor]];
    
    [self.welcomeLabel setText:@"Welcome"];
    
}


-(void)addSubviews{
    
    [self.view addSubview:self.topNavBar];
    [self.view addSubview:self.mainView];
    [self.view addSubview:self.welcomeLabel];
    [self.view addSubview:self.box];

}




- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
