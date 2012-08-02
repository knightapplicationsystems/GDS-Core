//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"production";
NSString * const TI_APPLICATION_ID = @"com.gds.com";
NSString * const TI_APPLICATION_PUBLISHER = @"Knight Application Systems";
NSString * const TI_APPLICATION_URL = @"http://www.globaldancesession.com/";
NSString * const TI_APPLICATION_NAME = @"GDS";
NSString * const TI_APPLICATION_VERSION = @"1.0.1";
NSString * const TI_APPLICATION_DESCRIPTION = @"Global Dance Sessions";
NSString * const TI_APPLICATION_COPYRIGHT = @"2012 by Knight Application Systems";
NSString * const TI_APPLICATION_GUID = @"777f3535-c306-4a63-8087-0b4f7927c7da";
BOOL const TI_APPLICATION_ANALYTICS = true;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
