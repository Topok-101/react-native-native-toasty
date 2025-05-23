#import "NativeToasty.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>

@implementation NativeToasty

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSDictionary *)options) {
    RCTLogInfo(@"NativeToasty show called with options: %@", options);
    dispatch_async(dispatch_get_main_queue(), ^{
        [self showToastWithOptions:options type:@"custom"];
    });
}

RCT_EXPORT_METHOD(normal:(NSDictionary *)options) {
    RCTLogInfo(@"NativeToasty normal called with options: %@", options);
    dispatch_async(dispatch_get_main_queue(), ^{
        [self showToastWithOptions:options type:@"normal"];
    });
}

RCT_EXPORT_METHOD(info:(NSDictionary *)options) {
    RCTLogInfo(@"NativeToasty info called with options: %@", options);
    dispatch_async(dispatch_get_main_queue(), ^{
        [self showToastWithOptions:options type:@"info"];
    });
}

RCT_EXPORT_METHOD(success:(NSDictionary *)options) {
    RCTLogInfo(@"NativeToasty success called with options: %@", options);
    dispatch_async(dispatch_get_main_queue(), ^{
        [self showToastWithOptions:options type:@"success"];
    });
}

RCT_EXPORT_METHOD(warn:(NSDictionary *)options) {
    RCTLogInfo(@"NativeToasty warn called with options: %@", options);
    dispatch_async(dispatch_get_main_queue(), ^{
        [self showToastWithOptions:options type:@"warn"];
    });
}

RCT_EXPORT_METHOD(error:(NSDictionary *)options) {
    RCTLogInfo(@"NativeToasty error called with options: %@", options);
    dispatch_async(dispatch_get_main_queue(), ^{
        [self showToastWithOptions:options type:@"error"];
    });
}

- (void)showToastWithOptions:(NSDictionary *)options type:(NSString *)type {
    NSString *title = options[@"title"] ?: @"Toast";
    NSString *position = options[@"position"] ?: @"bottom";
    NSTimeInterval duration = [options[@"duration"] doubleValue] / 1000.0; // Convert milliseconds to seconds
    BOOL withIcon = options[@"withIcon"] ? [options[@"withIcon"] boolValue] : YES;
    NSString *tintColor = options[@"tintColor"];
    NSString *textColor = options[@"textColor"];
    NSString *fontFamily = options[@"fontFamily"];
    
    RCTLogInfo(@"Showing toast: %@ at position: %@ for duration: %f seconds", title, position, duration);
    
    [self presentToastWithTitle:title position:position duration:duration type:type withIcon:withIcon tintColor:tintColor textColor:textColor fontFamily:fontFamily];
}

- (void)presentToastWithTitle:(NSString *)title position:(NSString *)position duration:(NSTimeInterval)duration type:(NSString *)type withIcon:(BOOL)withIcon tintColor:(NSString *)tintColor textColor:(NSString *)textColor fontFamily:(NSString *)fontFamily {
    UIWindow *keyWindow = nil;
    for (UIScene *scene in [UIApplication sharedApplication].connectedScenes) {
        if ([scene isKindOfClass:[UIWindowScene class]]) {
            UIWindowScene *windowScene = (UIWindowScene *)scene;
            for (UIWindow *window in windowScene.windows) {
                if (window.isKeyWindow) {
                    keyWindow = window;
                    break;
                }
            }
            if (keyWindow) break;
        }
    }
    
    if (!keyWindow) {
        RCTLogError(@"Could not find key window");
        return;
    }
    
    UIView *toastContainer = [[UIView alloc] init];
    UIColor *backgroundColor = tintColor ? [self colorFromHexString:tintColor] : [self backgroundColorForType:type];
    toastContainer.backgroundColor = backgroundColor;
    
    toastContainer.layer.cornerRadius = 12;
    toastContainer.layer.shadowColor = [UIColor blackColor].CGColor;
    toastContainer.layer.shadowOffset = CGSizeMake(0, 4);
    toastContainer.layer.shadowOpacity = 0.2;
    toastContainer.layer.shadowRadius = 8;
    toastContainer.alpha = 0;
    toastContainer.transform = CGAffineTransformMakeScale(0.9, 0.9);
    
    UIStackView *stackView = [[UIStackView alloc] init];
    stackView.axis = UILayoutConstraintAxisHorizontal;
    stackView.spacing = 12;
    stackView.alignment = UIStackViewAlignmentCenter;
    stackView.translatesAutoresizingMaskIntoConstraints = NO;
    
    if (withIcon) {
        UIImageView *iconView = [[UIImageView alloc] init];
        UIImage *icon = [self iconForType:type];
        if (icon) {
            iconView.image = icon;
            iconView.tintColor = [UIColor whiteColor];
            iconView.contentMode = UIViewContentModeScaleAspectFit;
            [iconView.widthAnchor constraintEqualToConstant:20].active = YES;
            [iconView.heightAnchor constraintEqualToConstant:20].active = YES;
            [stackView addArrangedSubview:iconView];
        }
    }
    
    UILabel *label = [[UILabel alloc] init];
    label.text = title;
    UIColor *labelTextColor = textColor ? [self colorFromHexString:textColor] : [UIColor whiteColor];
    label.textColor = labelTextColor;
    UIFont *labelFont;
    if (fontFamily && ![fontFamily isEqualToString:@""]) {
        labelFont = [UIFont fontWithName:fontFamily size:16];
        if (!labelFont) {
            labelFont = [UIFont systemFontOfSize:16 weight:UIFontWeightMedium];
        }
    } else {
        labelFont = [UIFont systemFontOfSize:16 weight:UIFontWeightMedium];
    }
    label.font = labelFont;
    
    label.numberOfLines = 3;
    label.textAlignment = NSTextAlignmentLeft;
    [stackView addArrangedSubview:label];
    [toastContainer addSubview:stackView];

    [stackView.topAnchor constraintEqualToAnchor:toastContainer.topAnchor constant:16].active = YES;
    [stackView.bottomAnchor constraintEqualToAnchor:toastContainer.bottomAnchor constant:-16].active = YES;
    [stackView.leadingAnchor constraintEqualToAnchor:toastContainer.leadingAnchor constant:20].active = YES;
    [stackView.trailingAnchor constraintEqualToAnchor:toastContainer.trailingAnchor constant:-20].active = YES;
    
    [keyWindow addSubview:toastContainer];
    
    toastContainer.translatesAutoresizingMaskIntoConstraints = NO;
    [toastContainer.leadingAnchor constraintGreaterThanOrEqualToAnchor:keyWindow.leadingAnchor constant:20].active = YES;
    [toastContainer.trailingAnchor constraintLessThanOrEqualToAnchor:keyWindow.trailingAnchor constant:-20].active = YES;
    [toastContainer.centerXAnchor constraintEqualToAnchor:keyWindow.centerXAnchor].active = YES;
    
    if ([position isEqualToString:@"top"]) {
        [toastContainer.topAnchor constraintEqualToAnchor:keyWindow.safeAreaLayoutGuide.topAnchor constant:20].active = YES;
    } else if ([position isEqualToString:@"center"]) {
        [toastContainer.centerYAnchor constraintEqualToAnchor:keyWindow.centerYAnchor].active = YES;
    } else {
        [toastContainer.bottomAnchor constraintEqualToAnchor:keyWindow.safeAreaLayoutGuide.bottomAnchor constant:-20].active = YES;
    }
    
    [UIView animateWithDuration:0.3 delay:0 options:UIViewAnimationOptionCurveEaseOut animations:^{
        toastContainer.alpha = 1.0;
        toastContainer.transform = CGAffineTransformIdentity;
    } completion:^(BOOL finished) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(duration * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [UIView animateWithDuration:0.3 animations:^{
                toastContainer.alpha = 0.0;
                toastContainer.transform = CGAffineTransformMakeScale(0.9, 0.9);
            } completion:^(BOOL finished) {
                [toastContainer removeFromSuperview];
            }];
        });
    }];
    
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(dismissToast:)];
    [toastContainer addGestureRecognizer:tap];
}

- (void)dismissToast:(UITapGestureRecognizer *)gesture {
    UIView *toastContainer = gesture.view;
    [UIView animateWithDuration:0.3 animations:^{
        toastContainer.alpha = 0.0;
        toastContainer.transform = CGAffineTransformMakeScale(0.9, 0.9);
    } completion:^(BOOL finished) {
        [toastContainer removeFromSuperview];
    }];
}

- (UIColor *)backgroundColorForType:(NSString *)type {
    if ([type isEqualToString:@"success"]) {
        return [UIColor colorWithRed:0.13 green:0.59 blue:0.29 alpha:0.9]; // Green
    } else if ([type isEqualToString:@"error"]) {
        return [UIColor colorWithRed:0.86 green:0.24 blue:0.24 alpha:0.9]; // Red
    } else if ([type isEqualToString:@"warn"]) {
        return [UIColor colorWithRed:0.96 green:0.60 blue:0.07 alpha:0.9]; // Orange
    } else if ([type isEqualToString:@"info"]) {
        return [UIColor colorWithRed:0.20 green:0.51 blue:0.96 alpha:0.9]; // Blue
    } else {
        return [UIColor colorWithRed:0.33 green:0.33 blue:0.33 alpha:0.9]; // Gray
    }
}

- (UIImage *)iconForType:(NSString *)type {
    UIImageSymbolConfiguration *config = [UIImageSymbolConfiguration configurationWithPointSize:20 weight:UIImageSymbolWeightSemibold];
    
    if ([type isEqualToString:@"success"]) {
        return [UIImage systemImageNamed:@"checkmark.circle.fill" withConfiguration:config];
    } else if ([type isEqualToString:@"error"]) {
        return [UIImage systemImageNamed:@"xmark.circle.fill" withConfiguration:config];
    } else if ([type isEqualToString:@"warn"]) {
        return [UIImage systemImageNamed:@"exclamationmark.triangle.fill" withConfiguration:config];
    } else if ([type isEqualToString:@"info"]) {
        return [UIImage systemImageNamed:@"info.circle.fill" withConfiguration:config];
    } else {
        return [UIImage systemImageNamed:@"info.circle" withConfiguration:config];
    }
}

- (UIColor *)colorFromHexString:(NSString *)hexString {
    if (!hexString || [hexString isEqualToString:@""]) {
        return nil;
    }
    
    NSString *cleanString = [hexString stringByReplacingOccurrencesOfString:@"#" withString:@""];
    if ([cleanString length] != 6) {
        return nil;
    }
    
    unsigned int rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:cleanString];
    [scanner scanHexInt:&rgbValue];
    
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0
                           green:((rgbValue & 0xFF00) >> 8)/255.0
                            blue:(rgbValue & 0xFF)/255.0
                           alpha:1.0];
}

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

@end