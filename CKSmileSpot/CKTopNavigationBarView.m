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
    
    }
    return self;
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
