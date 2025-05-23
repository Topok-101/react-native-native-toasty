#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

@interface NativeToasty : NSObject <RCTBridgeModule>

- (void)showToastWithOptions:(NSDictionary *)options type:(NSString *)type;
- (void)presentToastWithTitle:(NSString *)title position:(NSString *)position duration:(NSTimeInterval)duration type:(NSString *)type withIcon:(BOOL)withIcon tintColor:(NSString *)tintColor textColor:(NSString *)textColor fontFamily:(NSString *)fontFamily;
- (void)dismissToast:(UITapGestureRecognizer *)gesture;
- (UIColor *)backgroundColorForType:(NSString *)type;
- (UIImage *)iconForType:(NSString *)type;
- (UIColor *)colorFromHexString:(NSString *)hexString;

@end