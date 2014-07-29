#import "CKUserModel.h"

@interface CKUserModel()

@property (nonatomic) NSArray *totalScore;

@end

@implementation CKUserModel

-(instancetype)init{
    self = [super init];
    if (self) {
        
        self.totalScore = [[NSArray alloc]init];
        
        self.userArray = [[NSArray alloc]init];
        self.userArray = @[@"Connor", @"Brian", @"Kevin", @"Fillipe", @"Josh", @"Marty"];
    }
    return self;
}

@end
