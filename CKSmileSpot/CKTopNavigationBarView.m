#import "CKTopNavigationBarView.h"
#import "Masonry.h"

@interface CKTopNavigationBarView()

@property (nonatomic) UIButton* settingsButton;


@end

@implementation CKTopNavigationBarView

- (id)init
{
    self = [super init];
    if (self) {
        
        self.navBar = [[UIView alloc]init];
        self.settingsButton = [[UIButton alloc]init];

        
        [self addSubviews];
        [self addMasonryConstraints];
        
    
    }
    return self;
}


-(void)addMasonryConstraints{
    
    [self.navBar mas_makeConstraints:^(MASConstraintMaker *make) {
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

-(void)addSubviews{
    [self addSubview:self.navBar];
    [self addSubview:self.settingsButton];
}




@end
