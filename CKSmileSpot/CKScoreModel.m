#import "CKScoreModel.h"

@interface CKScoreModel()

@property (nonatomic) NSDictionary* scoreArray;

@end



@implementation CKScoreModel

-(instancetype)init{
    self = [super init];
    if (self) {
        self.scoreArray = [[NSDictionary alloc]init];
        
    }
    return self;
}

- (void)fillArray {
    
    self.scoreArray = @{@"Smile": @5, @"Hi": @2, @"Nod": @3};
    
}

@end
