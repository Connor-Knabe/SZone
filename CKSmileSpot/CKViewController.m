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
    
    [self.view setBackgroundColor:[UIColor redColor]];
    
    self.topNavBar = [[CKTopNavigationBarView alloc]initWithFrame:self.view.bounds];
    
    [self.view addSubview:self.topNavBar];
    
    [self addMasonry];

    
}


-(void)addMasonry{
    
}






- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
