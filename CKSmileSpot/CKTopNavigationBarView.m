#import "CKTopNavigationBarView.h"
#import "Masonry.h"

@interface CKTopNavigationBarView()

@property (nonatomic) UIView* navBar;

@end

@implementation CKTopNavigationBarView

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
        self.navBar = [[UIView alloc]init];
        
        [self addSubview:self.navBar];
        
        [self addMasonryConstraints];
        
    
    }
    return self;
}


-(void)addMasonryConstraints{
    
    [self.navBar mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.mas_top).with.offset(20);
        make.height.equalTo(@90);
        make.width.equalTo(self.mas_width);
    }];
    
    [self.navBar setBackgroundColor:[UIColor greenColor]];
    
    
}




@end
