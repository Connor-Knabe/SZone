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
    self.welcomeLabel = [[UILabel alloc]init];
    [self.welcomeLabel setTextColor:[UIColor redColor]];

    [self addSubviews];
    [self addMasonry];

    
}


-(void)addMasonry{
   
    [self.welcomeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.topNavBar.mas_bottom);
        make.height.equalTo(@100);
    }];
    
    [self.welcomeLabel setText:@"HI"];
    
}


-(void)addSubviews{
    
    [self.view addSubview:self.topNavBar];
    [self.view addSubview:self.mainView];
    [self.view addSubview:self.welcomeLabel];

}




- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
