#import "CKNavigationBarView.h"
#import "Masonry.h"

@interface CKNavigationBarView()

@property (nonatomic) UIButton* settingsButton;
@property (nonatomic) UIView* navBar;


@end

@implementation CKNavigationBarView

- (id)init {
    self = [super init];
    if (self) {
        
        [self initViews];
        
        [self addSubviews];
        [self addMasonryConstraints];
        
    
    }
    return self;
}

- (void)initViews {
    
    self.navBar = [[UIView alloc]init];
    self.settingsButton = [[UIButton alloc]init];

    [self.settingsButton addTarget:self action:@selector(openSettings) forControlEvents:UIControlEventTouchUpInside];
    
}

- (void)addMasonryConstraints {
    
    [self.navBar makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.mas_top);
        make.left.equalTo(self.mas_left);
        make.height.equalTo(@50);
        make.width.equalTo(self.mas_width);
    }];
    
    [self.settingsButton mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.navBar.mas_top).with.offset(10);
        make.left.equalTo(self.navBar.mas_left).with.offset(10);
        make.height.equalTo(@30);
        
    }];
    
    [self.settingsButton setBackgroundColor:[UIColor blackColor]];
    [self.navBar setBackgroundColor:[UIColor greenColor]];
    
    
}

- (void)addSubviews{
    [self addSubview:self.navBar];
    [self addSubview:self.settingsButton];
}

- (void)openSettings {
    
    
    [self.rvcDelegate showSettings];
    
    NSLog(@"SDF");
    
}


@end
