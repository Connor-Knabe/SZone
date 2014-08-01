#import "CKUserModel.h"

@interface CKUserModel()

@property (nonatomic) NSArray *totalScore;

@end

@implementation CKUserModel

-(instancetype)init{
    self = [super init];
    if (self) {
        self.totalScore = [[NSArray alloc]init];
        self.userArray = [[NSMutableArray alloc]init];
        [self.userArray addObject:@"Connor"];
    }
    return self;
}

@end
