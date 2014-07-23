//
//  CKTopNavigationBarView.h
//  CKSmileZone
//
//  Created by Administrator on 7/20/14.
//  Copyright (c) 2014 Connor. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CKViewController.h"

@interface CKNavigationBarView : UIView
@property (nonatomic) UIView* navBar;

@property(nonatomic, weak) id <CKViewControllerDelegate> rvcDelegate;

@end
