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
        //self.mainView = [[CKMainView alloc]init];
        //[self.mainView setBackgroundColor:[UIColor blackColor]];
    }
    return self;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    
    CGRect viewRect = CGRectMake(0, 0, 100, 100);
    
    self.mainWindow = [[UIView alloc]initWithFrame:viewRect];
    
    [self.mainWindow setBackgroundColor:[UIColor redColor]];
    
    viewRect = CGRectMake(0, 200, 100, 100);
    
    self.mainView = [[CKMainView alloc]init];
    
    
    [self.view addSubview:self.mainWindow];
    [self.view addSubview:self.mainView];


}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
