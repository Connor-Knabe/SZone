//
//  CKViewController.m
//  CKSmileSpot
//
//  Created by Administrator on 7/12/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import "CKViewController.h"
#import "CKMainView.h"
@interface CKViewController ()

@property (nonatomic) CKMainView * mainView;
@property (nonatomic) UIView *mainWindow;
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
    
    CGRect viewRect = CGRectMake(100, 0, 100, 100);
    
    self.mainWindow = [[UIView alloc]initWithFrame:viewRect];
    
    [self.mainWindow setBackgroundColor:[UIColor redColor]];
    
    
    self.mainView = [[CKMainView alloc]initWithFrame:self.view.bounds];
    
    
    [self.view addSubview:self.mainWindow];
    [self.view addSubview:self.mainView];


}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
