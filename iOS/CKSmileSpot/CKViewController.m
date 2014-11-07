//
//  CKViewController.m
//  CKSmileSpot
//
//  Created by Administrator on 7/12/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import "CKViewController.h"
#import "CKMainView.h"
#import "CKNavigationBarViewController.h"
#import "Masonry.h"
#import "CKUserModel.h"
@interface CKViewController ()

@property (nonatomic) CKMainView* mainView;
@property (nonatomic) UIView* mainWindow;
@property (nonatomic) CKNavigationBarViewController* topNavBar;
@property (nonatomic) CKUserModel* userModel;


@end

@implementation CKViewController
- (id)init {
    self = [super init];
    if (self) {
        self.topNavBar = [[CKNavigationBarViewController alloc]init];
        self.userModel = [[CKUserModel alloc]init];
        self.mainView = [[CKMainView alloc]initWithModel:self.userModel];
        self.topNavBar.rvcDelegate = self;
        
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
}


- (void)viewWillLayoutSubviews {

    [self addSubviews];
    [self addMasonry];
    
}


- (void)addMasonry {
    
    [self.topNavBar.view makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view.top).with.offset(20);
        make.centerX.equalTo(self.view.centerX);
        make.width.equalTo(self.view.width);
        make.height.equalTo(self.topNavBar.navBar.height);
    }];

    
    [self.mainView makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.topNavBar.view.bottom);
        make.height.equalTo(@200);
        make.left.equalTo(self.view.left);
        make.width.equalTo(self.view.width);
    }];
   
    [self.mainView setBackgroundColor:[UIColor grayColor]];
    
}


- (void)addSubviews {
    [self.view addSubview:self.topNavBar.view];
    [self.view addSubview:self.mainView];
}

- (void) showSettings {
    
    NSLog(@"Settings opened from View Controller");
}

@end
