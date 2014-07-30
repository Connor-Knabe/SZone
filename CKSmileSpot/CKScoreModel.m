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
        self.smilePoint = 6;
        self.hiPoint = 4;
        self.nodPoint = 2;
    }
    return self;
}



@end