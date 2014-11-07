#import "CKScoreModel.h"

@interface CKScoreModel()

@property (nonatomic) const NSInteger smilePoint;
@property (nonatomic) const NSInteger hiPoint;
@property (nonatomic) const NSInteger nodPoint;


@end



@implementation CKScoreModel

-(instancetype)init{
    self = [super init];
    if (self) {
        self.smilePoint = 15;
        self.hiPoint = 10;
        self.nodPoint = 5;
    }
    return self;
}



@end