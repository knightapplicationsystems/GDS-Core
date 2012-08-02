/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"5dmRVc6HHFIDaqzig9Nv1pfJRwhiuFa4"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"kDCK8HbZWZqLpqnjaj3wAAh8FXw5a9iX"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"jrM0Kkc2U6b6VgeJnTF6TPT8RoxGVZl0"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"C4W3Go0wgXzwOgGk4Hod9PA3oT2JSWXZ"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"TFqpdraSJXMswYedY08cSX5PvHU7JeP4"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"4ecEhwiq81LvmfHL01bYodPHcRZTnQXW"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
