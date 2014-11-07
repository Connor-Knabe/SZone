#import "CKMainView.h"
#import "Masonry.h"

@interface CKMainView()

@property (nonatomic) UIView* box;
@property (nonatomic) UIView* header1;
@property (nonatomic) UILabel* welcome;
@property (nonatomic) CGRect viewRect;
@property (nonatomic) CKUserModel *userModel;
@property (nonatomic) NSArray *userArray;

@end

@implementation CKMainView

- (id)initWithModel:(CKUserModel*)userModel {
    self = [super init];
    if (self) {
        
        self.welcome = [[UILabel alloc]init];
        self.userModel = [[CKUserModel alloc]init];
        
        [self addSubviews];
        [self makeLabels];
        [self addMasonry];
        
    }
    return self;
}

-(void)addMasonry {
    
    
    [self.welcome makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.top);
        make.height.equalTo(@30);
        make.centerX.equalTo(self.centerX);

    }];
    
}

-(void)makeLabels{
    
    [self.welcome setText:[NSString stringWithFormat:@"Welcome %@",[self.userModel.userArray objectAtIndex:0]]];

}

-(void)addSubviews{
    
    [self addSubview:self.welcome];

}


@end